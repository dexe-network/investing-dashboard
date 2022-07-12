import { FC, useMemo, useState } from "react"
import { AnimatePresence } from "framer-motion"
import { format } from "date-fns"

import { expandTimestamp, normalizeBigNumber } from "utils"
import { useActiveWeb3React } from "hooks"
import { useERC20 } from "hooks/useContract"
import { usePoolContract } from "hooks/usePool"

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
import { usePoolMetadata } from "state/ipfsMetadata/hooks"

interface Props {
  proposal: any
  poolAddress?: string
  onInvest: () => void
}

const InvestProposalCard: FC<Props> = ({ proposal, poolAddress, onInvest }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false)
  const [openExtra, setOpenExtra] = useState<boolean>(false)

  const { account } = useActiveWeb3React()
  const [, poolInfo] = usePoolContract(proposal.investPool.id)

  const [{ poolMetadata }] = usePoolMetadata(
    proposal.investPool.id,
    poolInfo?.parameters.descriptionURL
  )

  // Check that current user is pool trader or not
  const isTrader = useMemo(() => {
    if (!account || !poolInfo) return false
    return account === poolInfo?.parameters.trader
  }, [account, poolInfo])

  const maxSizeLP = useMemo(() => {
    if (!proposal.investLPLimit) return "0"
    return normalizeBigNumber(proposal.investLPLimit, 18, 6)
  }, [proposal])

  const APR = useMemo(() => {
    if (!proposal.APR) return "0"
    return normalizeBigNumber(proposal.APR, 18, 6)
  }, [proposal])

  const expirationDate = useMemo(() => {
    if (!proposal.timestampLimit) return "0"
    return format(expandTimestamp(proposal.timestampLimit), "MMM dd, y HH:mm")
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
                address={proposal.investPool.id}
              />
              <S.Title>1/JBR</S.Title>
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
                      onClick={() => {
                        if (!proposal.closed) {
                          setIsSettingsOpen(!isSettingsOpen)
                        }
                      }}
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
                <TokenIcon address={proposal.investPool.id} m="0" size={24} />
              </Flex>
            )}
          </S.Head>
          <S.Body>
            {isTrader ? (
              <BodyTrader
                maxSizeLP={maxSizeLP}
                apr={APR}
                expirationDate={expirationDate}
              />
            ) : (
              <BodyInvestor
                invested={proposal.invested ?? false}
                apr={APR}
                expirationDate={expirationDate}
              />
            )}
          </S.Body>
          <S.ReadMoreContainer>
            <ReadMore
              content="During this time, we managed to reach the key goal — the creation product the product During this time, we managed to reach the key goal — the creation product the product During this time, we managed to reach the key goal — the creation product the product During this time, we managed to reach the key goal — the creation product the product"
              maxLen={85}
            />
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
