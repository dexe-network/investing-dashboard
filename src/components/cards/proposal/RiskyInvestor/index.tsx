import { FC, useMemo, useCallback } from "react"
import { format } from "date-fns"
import { useNavigate } from "react-router-dom"
import { BigNumber, FixedNumber } from "@ethersproject/bignumber"

import { useActiveWeb3React } from "hooks"
import { useERC20 } from "hooks/useContract"
import { usePoolContract } from "hooks/usePool"
import { RiskyProposal } from "constants/interfaces_v2"
import { usePoolMetadata } from "state/ipfsMetadata/hooks"
import { expandTimestamp, normalizeBigNumber } from "utils"
import getExplorerLink, { ExplorerDataType } from "utils/getExplorerLink"

import { Flex } from "theme"
import Icon from "components/Icon"
import Tooltip from "components/Tooltip"
import TokenIcon from "components/TokenIcon"
import ExternalLink from "components/ExternalLink"
import Button, { SecondaryButton } from "components/Button"

import S, { BodyItem, TraderLPSize, TraderRating } from "./styled"

interface Props {
  proposal: any
  onInvest: () => void
}

const RiskyProposalInvestorCard: FC<Props> = ({ proposal, onInvest }) => {
  const navigate = useNavigate()
  const { chainId } = useActiveWeb3React()
  const [, proposalTokenData] = useERC20(proposal.token)
  const [, poolInfo] = usePoolContract(proposal.basicPool.id)

  // console.groupCollapsed("RiskyProposalInvestorCard")
  // console.log("proposal", proposal)
  // console.log("proposalTokenData", proposalTokenData)
  // console.log("poolInfo", poolInfo)
  // console.groupEnd()

  const [{ poolMetadata }] = usePoolMetadata(
    proposal.basicPool.id,
    poolInfo?.parameters.descriptionURL
  )

  const proposalSymbol = useMemo(() => {
    if (!proposalTokenData || !proposalTokenData.symbol) return ""
    return proposalTokenData.symbol
  }, [proposalTokenData])

  const lpPercentage = useMemo(() => {
    return 76
  }, [])

  const maxSizeLP = useMemo(() => {
    if (!proposal || !proposal.maxTokenPriceLimit) return "0"

    return normalizeBigNumber(proposal.maxTokenPriceLimit, 18, 6)
  }, [proposal])

  const youSizeLP = useMemo(() => {
    if (!proposal || !proposal.investLPLimit) return "0"

    return normalizeBigNumber(proposal.investLPLimit, 18, 6)
  }, [proposal])

  const expirationDate = useMemo(() => {
    if (!proposal || !proposal.timestampLimit)
      return { value: "0", completed: false }

    const expandedTimestampLimit = expandTimestamp(proposal.timestampLimit)
    const currentTimestamp = new Date().valueOf()

    return {
      value: format(expandedTimestampLimit, "MMM dd, y HH:mm"),
      completed:
        currentTimestamp - expandTimestamp(proposal.timestampLimit) > 0,
    }
  }, [proposal])

  const positionSize = useMemo(() => {
    if (!proposal || !proposal.positions || !proposal.positions.length)
      return "0"

    const sizeFixed = proposal.positions.reduce(
      (acc, p) =>
        acc.addUnsafe(FixedNumber.from(p.totalPositionOpenVolume, 18)),
      FixedNumber.from("0", 18)
    )

    return normalizeBigNumber(BigNumber.from(sizeFixed), 18, 6)
  }, [proposal])

  const active = useMemo(() => {
    return !expirationDate.completed
  }, [expirationDate])

  const navigateToPool = useCallback(
    (e) => {
      e.stopPropagation()
      navigate(`/pool/profile/BASIC_POOL/${proposal.basicPool.id}`)
    },
    [navigate, proposal.basicPool.id]
  )

  const InvestButton = active ? (
    <Button full size="small" onClick={onInvest}>
      Stake LP
    </Button>
  ) : (
    <SecondaryButton full size="small">
      Stake LP
    </SecondaryButton>
  )

  return (
    <>
      <S.Container>
        <S.Head>
          <Flex>
            <TokenIcon address={proposal.token} m="0" size={24} />
            <Flex ai="center">
              <S.Title>{proposalSymbol}</S.Title>
              <TraderRating rating={20} />
              <Flex m="0 0 -5px">
                <Tooltip id="risky-proposal-rating-info" size="small">
                  Risky proposal rating info
                </Tooltip>
              </Flex>
            </Flex>
          </Flex>
          <Flex onClick={navigateToPool}>
            <S.Ticker>{poolInfo?.ticker}</S.Ticker>
            <TokenIcon
              address={poolInfo?.parameters.baseToken}
              m="0 0 0 4px"
              size={24}
            />
          </Flex>
        </S.Head>
        <S.Body>
          <BodyItem label="Proposal size" amount={`${maxSizeLP} LP`} />
          <BodyItem label="Your size" amount={`${youSizeLP} LP`} />
          <BodyItem label="Fullness" amount={"35 LP"} />
          <BodyItem
            label="Max. Invest Price"
            amount={"0.0013"}
            symbol={proposalSymbol}
          />
          <BodyItem
            label="Current price"
            amount={"0.00129"}
            symbol={proposalSymbol}
          />
          <BodyItem
            fz={"11px"}
            label="Expiration date"
            amount={expirationDate.value}
            completed={expirationDate.completed}
          />
          <BodyItem label="Investors" amount={"299"} symbol={"/ 1000"} />
          <BodyItem
            label="Position size"
            amount={"20"}
            symbol={proposalSymbol}
          />
          <Flex full>{InvestButton}</Flex>
        </S.Body>
        <S.Footer>
          <Flex>
            <S.FundIconContainer>
              <Icon
                size={24}
                m="0"
                source={poolMetadata?.assets[poolMetadata?.assets.length - 1]}
                address={proposal.basicPool.id}
              />
            </S.FundIconContainer>
            <Flex dir="column" ai="flex-start" m="0 0 0 4px">
              <S.SizeTitle>Trader size: 30 LP ({lpPercentage}%)</S.SizeTitle>
              <S.LPSizeContainer>
                <TraderLPSize size={lpPercentage} />
              </S.LPSizeContainer>
            </Flex>
          </Flex>
          <div>
            {chainId && (
              <ExternalLink
                color="#2680EB"
                href={getExplorerLink(
                  chainId,
                  proposal.token,
                  ExplorerDataType.ADDRESS
                )}
              >
                Сheck token
              </ExternalLink>
            )}
          </div>
        </S.Footer>
      </S.Container>
    </>
  )
}

export default RiskyProposalInvestorCard
