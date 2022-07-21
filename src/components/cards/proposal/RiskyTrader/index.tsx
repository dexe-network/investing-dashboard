import { FC, useEffect, useMemo, useState } from "react"
import { format } from "date-fns"
import { useNavigate } from "react-router-dom"
import { BigNumber } from "@ethersproject/bignumber"

import { useActiveWeb3React } from "hooks"
import { useERC20, useRiskyProposalContract } from "hooks/useContract"
import { PoolInfo, RiskyProposal } from "constants/interfaces_v2"
import { expandTimestamp, normalizeBigNumber } from "utils"

import { Flex } from "theme"
import Button, { SecondaryButton } from "components/Button"
import TokenIcon from "components/TokenIcon"
import IconButton from "components/IconButton"

import S from "./styled"
import RiskyCardSettings from "./Settings"
import SharedS, { BodyItem } from "components/cards/proposal/styled"

import settingsIcon from "assets/icons/settings.svg"
import settingsGreenIcon from "assets/icons/settings-green.svg"

interface Props {
  proposal: RiskyProposal
  poolInfo: PoolInfo
  proposalId: number
  poolAddress: string
}

const RiskyProposalTraderCard: FC<Props> = ({
  proposal,
  poolInfo,
  proposalId,
  poolAddress,
}) => {
  const navigate = useNavigate()
  const { account } = useActiveWeb3React()
  const [, proposalTokenData] = useERC20(proposal.proposalInfo.token)
  const [, baseTokenData] = useERC20(poolInfo.parameters.baseToken)
  const [proposalPool] = useRiskyProposalContract(poolAddress)

  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false)

  const [traderSizeLP, setTraderSizeLP] = useState<BigNumber>(
    BigNumber.from("0")
  )

  const proposalSymbol = useMemo(() => {
    if (!proposalTokenData || !proposalTokenData.symbol) return ""
    return proposalTokenData.symbol
  }, [proposalTokenData])

  const maxSizeLP = useMemo(() => {
    if (!proposal || !proposal?.proposalInfo.proposalLimits.investLPLimit) {
      return "0"
    }

    return normalizeBigNumber(
      proposal.proposalInfo.proposalLimits.investLPLimit,
      18,
      2
    )
  }, [proposal])

  const fullness = useMemo(() => {
    if (
      !proposal?.proposalInfo?.proposalLimits?.investLPLimit ||
      !proposal.proposalInfo.lpLocked
    ) {
      return { value: "0", completed: false }
    }

    return {
      value: normalizeBigNumber(proposal.proposalInfo.lpLocked, 18, 2),
      completed: proposal.proposalInfo.lpLocked.eq(
        proposal.proposalInfo.proposalLimits.investLPLimit
      ),
    }
  }, [
    proposal.proposalInfo.lpLocked,
    proposal.proposalInfo.proposalLimits.investLPLimit,
  ])

  const maxInvestPrice = useMemo(() => {
    if (
      !proposal ||
      !proposal?.proposalInfo.proposalLimits.maxTokenPriceLimit
    ) {
      return { value: "0", completed: false }
    }

    return {
      value: normalizeBigNumber(
        proposal.proposalInfo.proposalLimits.maxTokenPriceLimit,
        18,
        2
      ),
      completed: proposal.positionTokenPrice.gte(
        proposal.proposalInfo.proposalLimits.maxTokenPriceLimit
      ),
    }
  }, [proposal])

  const currentPrice = useMemo(() => {
    if (!proposal || !proposal?.positionTokenPrice) {
      return "0"
    }

    return normalizeBigNumber(proposal.positionTokenPrice, 18, 2)
  }, [proposal])

  const investors = useMemo(() => {
    if (!proposal || !proposal?.totalInvestors) {
      return "0"
    }

    return proposal?.totalInvestors.toString()
  }, [proposal])

  const maxInvestors = useMemo(() => {
    if (!poolInfo || !poolInfo?.totalInvestors) {
      return "0"
    }

    return poolInfo?.totalInvestors.toString()
  }, [poolInfo])

  const expirationDate = useMemo(() => {
    if (!proposal || !proposal?.proposalInfo.proposalLimits.timestampLimit)
      return { value: "0", completed: false }

    const expandedTimestampLimit = expandTimestamp(
      Number(proposal.proposalInfo.proposalLimits.timestampLimit.toString())
    )
    const currentTimestamp = new Date().valueOf()

    return {
      value: format(expandedTimestampLimit, "MMM dd, y HH:mm"),
      completed: currentTimestamp - expandedTimestampLimit >= 0,
    }
  }, [proposal])

  const positionSize = useMemo(() => {
    if (!proposal || !proposal?.proposalInfo.balancePosition) {
      return "0"
    }

    return normalizeBigNumber(proposal.proposalInfo.balancePosition, 18, 6)
  }, [proposal])

  const active = useMemo(() => {
    return !expirationDate.completed
  }, [expirationDate])

  useEffect(() => {
    if (!proposalPool) return
    ;(async () => {
      const balance = await proposalPool?.balanceOf(account, proposalId + 1)

      setTraderSizeLP(balance)
    })()
  }, [account, proposalId, proposalPool])

  const onAddMore = (e) => {
    e.stopPropagation()
    navigate(`/invest-risky-proposal/${poolAddress}/${proposalId}`)
  }
  const onInvest = () => {
    navigate(`/invest-risky-proposal/${poolAddress}/${proposalId}`)
  }

  const InvestButton = active ? (
    <Button full size="small" onClick={onInvest}>
      Terminal
    </Button>
  ) : (
    <SecondaryButton full size="small">
      Terminal
    </SecondaryButton>
  )

  return (
    <>
      <SharedS.Card>
        <SharedS.Head p="8px 8px 7px 16px">
          <Flex>
            <TokenIcon address={proposal.proposalInfo.token} m="0" size={24} />
            <SharedS.Title>
              {proposalSymbol}
              <span>/{baseTokenData?.symbol}</span>
            </SharedS.Title>
          </Flex>

          <Flex>
            <S.Status active={active}>
              {active ? "Open investing" : "Closed"}
            </S.Status>
            <Flex m="0 0 0 4px">
              <IconButton
                size={12}
                media={isSettingsOpen ? settingsGreenIcon : settingsIcon}
                onClick={() => {
                  setIsSettingsOpen(!isSettingsOpen)
                }}
              />
            </Flex>
          </Flex>
          <RiskyCardSettings
            visible={isSettingsOpen}
            setVisible={setIsSettingsOpen}
          />
        </SharedS.Head>
        <SharedS.Body>
          <BodyItem label="Max size (LP)" amount={maxSizeLP} />
          <BodyItem
            label={
              <Flex>
                <span>Your size (LP)</span>
                <S.AddButton onClick={onAddMore}>+ Add</S.AddButton>
              </Flex>
            }
            amount={normalizeBigNumber(BigNumber.from(traderSizeLP), 18, 2)}
          />
          <BodyItem
            label="Fullness (LP)"
            amount={fullness.value}
            completed={fullness.completed}
            ai="flex-end"
          />
          <BodyItem
            label={`Max. Invest Price (${proposalSymbol})`}
            amount={maxInvestPrice.value}
            completed={maxInvestPrice.completed}
          />
          <BodyItem
            label={`Current price (${proposalSymbol})`}
            amount={currentPrice}
          />
          <BodyItem
            fz={"11px"}
            label="Expiration date"
            amount={expirationDate.value}
            completed={expirationDate.completed}
            ai="flex-end"
          />
          <BodyItem
            label="Investors"
            amount={investors}
            symbol={`/ ${maxInvestors}`}
          />
          <BodyItem
            label={`Position size (${proposalSymbol})`}
            amount={positionSize}
          />
          <Flex full>{InvestButton}</Flex>
        </SharedS.Body>
      </SharedS.Card>
    </>
  )
}

export default RiskyProposalTraderCard
