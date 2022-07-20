import { FC, useCallback, useEffect, useMemo, useState } from "react"
import { AnimatePresence } from "framer-motion"
import { format } from "date-fns"

import { useActiveWeb3React } from "hooks"
import { usePoolContract } from "hooks/usePool"
import { parseInvestProposalData } from "utils/ipfs"
import { InvestProposal } from "constants/interfaces_v2"
import { usePoolMetadata } from "state/ipfsMetadata/hooks"
import { expandTimestamp, normalizeBigNumber } from "utils"

import { Flex } from "theme"
import Icon from "components/Icon"
import TokenIcon from "components/TokenIcon"
import IconButton from "components/IconButton"
import ReadMore from "components/ReadMore"

import { Actions } from "components/cards/proposal/styled"
import S from "./styled"
import InvestCardSettings from "./Settings"
import BodyTrader from "./BodyTrader"
import BodyInvestor from "./BodyInvestor"

import settingsIcon from "assets/icons/settings.svg"
import settingsGreenIcon from "assets/icons/settings-green.svg"

interface Props {
  proposal: InvestProposal
  proposalId: number
  poolAddress: string
}

const InvestProposalCard: FC<Props> = ({
  proposal,
  proposalId,
  poolAddress,
}) => {
  const { account } = useActiveWeb3React()
  const [, poolInfo] = usePoolContract(poolAddress)

  const [{ poolMetadata }] = usePoolMetadata(
    poolAddress,
    poolInfo?.parameters.descriptionURL
  )

  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false)
  const [openExtra, setOpenExtra] = useState<boolean>(false)
  const toggleSettings = useCallback(
    (e) => {
      e.stopPropagation()
      setIsSettingsOpen(!isSettingsOpen)
    },
    [isSettingsOpen]
  )

  const [ticker, setTicker] = useState<string>("")
  const [description, setDescription] = useState<string>("")

  // Check that current user is pool trader or not
  const isTrader = useMemo(() => {
    if (!account || !poolInfo) return false

    return account === poolInfo?.parameters.trader
  }, [account, poolInfo])

  const supply = useMemo(() => {
    if (!proposal || !proposal.proposalInfo.investedBase) {
      return "0"
    }
    return normalizeBigNumber(proposal.proposalInfo.investedBase, 18, 6)
  }, [proposal])

  const youSizeLP = useMemo(() => {
    if (!proposal || !proposal.proposalInfo.lpLocked) {
      return "0"
    }
    return normalizeBigNumber(proposal.proposalInfo.lpLocked, 18, 6)
  }, [proposal])

  const maxSizeLP = useMemo(() => {
    if (!proposal || !proposal.proposalInfo.proposalLimits.investLPLimit) {
      return "0"
    }
    return normalizeBigNumber(
      proposal.proposalInfo.proposalLimits.investLPLimit,
      18,
      6
    )
  }, [proposal])

  const totalInvestors = useMemo(() => {
    if (!proposal || !proposal.totalInvestors) return "0"

    return normalizeBigNumber(proposal.totalInvestors, 18, 0)
  }, [proposal])

  const APR = useMemo(() => {
    if (!proposal || !proposal.proposalInfo.newInvestedBase) return "0"
    return normalizeBigNumber(proposal.proposalInfo.newInvestedBase, 18, 6)
  }, [proposal])

  const expirationDate = useMemo(() => {
    if (!proposal || !proposal.proposalInfo.proposalLimits.timestampLimit) {
      return "0"
    }

    return format(
      expandTimestamp(
        +proposal.proposalInfo.proposalLimits.timestampLimit.toString()
      ),
      "MMM dd, y HH:mm"
    )
  }, [proposal])

  // Get proposal data from IPFS
  useEffect(() => {
    if (!proposal) return
    ;(async () => {
      try {
        const ipfsMetadata = await parseInvestProposalData(
          proposal.proposalInfo.descriptionURL
        )

        if (ipfsMetadata) {
          setTicker(ipfsMetadata.ticker)
          setDescription(ipfsMetadata.description)
        }
      } catch (error) {
        console.error(error)
      }
    })()
  }, [proposal])

  // Actions
  const actions = useMemo(() => {
    if (isTrader)
      return [
        {
          label: "Withdraw",
          onClick: () => {
            console.log("Withdraw")
          },
        },
        {
          label: "Deposit",
          onClick: () => {
            console.log("Deposit")
          },
        },
        {
          label: "Claim",
          onClick: () => {
            console.log("Claim")
          },
        },
        {
          label: "Pay dividend",
          onClick: () => {
            console.log("Pay dividend")
          },
        },
      ]
    return [
      {
        label: "Stake LP",
        onClick: () => {
          console.log("Stake LP")
        },
      },
      {
        label: "Request a dividend",
        onClick: () => {
          console.log("Request a dividend")
        },
      },
      {
        label: "Withdraw",
        onClick: () => {
          console.log("Withdraw")
        },
      },
    ]
  }, [isTrader])

  return (
    <>
      <S.Container>
        <S.Card onClick={() => setOpenExtra(!openExtra)}>
          <S.Head isTrader={isTrader}>
            <Flex>
              <Icon
                size={24}
                m="0"
                source={poolMetadata?.assets[poolMetadata?.assets.length - 1]}
                address={poolAddress}
              />
              <S.Title>{ticker}</S.Title>
            </Flex>
            {isTrader ? (
              <>
                <Flex>
                  <S.Status active={!proposal.closed}>
                    {!proposal.closed ? "Open investing" : "Closed investing"}
                  </S.Status>
                  <Flex m="0 0 0 4px">
                    <IconButton
                      size={12}
                      media={isSettingsOpen ? settingsGreenIcon : settingsIcon}
                      onClick={toggleSettings}
                    />
                  </Flex>
                </Flex>
                <InvestCardSettings
                  visible={isSettingsOpen}
                  setVisible={setIsSettingsOpen}
                />
              </>
            ) : (
              <Flex>
                <S.FundSymbol>{poolInfo?.ticker}</S.FundSymbol>
                <TokenIcon
                  address={poolInfo?.parameters.baseToken}
                  m="0"
                  size={24}
                />
              </Flex>
            )}
          </S.Head>
          <S.Body>
            {isTrader ? (
              <BodyTrader
                ticker={ticker}
                supply={supply}
                youSizeLP={youSizeLP}
                maxSizeLP={maxSizeLP}
                totalInvestors={totalInvestors}
                expirationDate={expirationDate}
                apr={APR}
              />
            ) : (
              <BodyInvestor
                ticker={ticker}
                supply={supply}
                invested={false}
                apr={APR}
                expirationDate={expirationDate}
              />
            )}
          </S.Body>
          <S.ReadMoreContainer>
            <ReadMore content={description} maxLen={85} />
          </S.ReadMoreContainer>
        </S.Card>
        <AnimatePresence>
          {!proposal.closed && (
            <Actions actions={actions} visible={openExtra} />
          )}
        </AnimatePresence>
      </S.Container>
    </>
  )
}

export default InvestProposalCard
