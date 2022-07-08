import { FC, useMemo, useState } from "react"

import { useActiveWeb3React } from "hooks"
import { useERC20 } from "hooks/useContract"
import { usePoolContract } from "hooks/usePool"
import { usePoolMetadata } from "state/ipfsMetadata/hooks"
import getExplorerLink, { ExplorerDataType } from "utils/getExplorerLink"
import { IRiskyProposal } from "constants/interfaces_v2"

import { Flex } from "theme"
import Icon from "components/Icon"
import Button from "components/Button"
import TokenIcon from "components/TokenIcon"
import IconButton from "components/IconButton"
import ExternalLink from "components/ExternalLink"

import S, { BodyItem, TraderLPSize } from "./styled"
import RiskyCardSettings from "./Settings"

import settingsIcon from "assets/icons/settings.svg"
import settingsGreenIcon from "assets/icons/settings-green.svg"

interface Props {
  proposal: IRiskyProposal
  poolAddress: string
  onInvest: () => void
}

const RiskyProposalCard: FC<Props> = ({ proposal, poolAddress, onInvest }) => {
  const { account, chainId } = useActiveWeb3React()
  const [, proposalTokenData] = useERC20(proposal.token)
  const [, poolInfo] = usePoolContract(poolAddress)

  const [{ poolMetadata }] = usePoolMetadata(
    poolAddress,
    poolInfo?.parameters.descriptionURL
  )

  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false)

  const active = true

  // Check that current user is pool trader or not
  const isTrader = useMemo(() => {
    if (!account || !poolInfo) return false
    return account === poolInfo?.parameters.trader
  }, [account, poolInfo])

  const lpPercentage = useMemo(() => {
    return 76
  }, [])

  return (
    <>
      <S.Container>
        <S.Head isTrader={isTrader}>
          <Flex>
            <TokenIcon address={proposal.token} m="0" size={24} />
            <S.Title>
              {proposalTokenData?.symbol} for 0.0013 WBNB or less
            </S.Title>
          </Flex>
          {isTrader ? (
            <>
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
            </>
          ) : (
            <Flex>
              <S.Ticker>{poolInfo?.ticker}</S.Ticker>
              <TokenIcon
                address={poolInfo?.parameters.baseToken}
                m="0 0 0 4px"
                size={24}
              />
            </Flex>
          )}
        </S.Head>
        <S.Body>
          <BodyItem
            label={isTrader ? "Max size" : "Proposal size"}
            amount={"40 LP"}
          />
          <BodyItem label="Your size" amount={"0 LP"} />
          <BodyItem label="Fullness" amount={"35 LP"} />
          <BodyItem
            label="Max. Invest Price"
            amount={"0.0013"}
            symbol={"WBNB"}
          />
          <BodyItem label="Current price" amount={"0.00129"} symbol={"WBNB"} />
          <BodyItem
            label="Expiration date"
            amount={"JUN 20,2022  20:00"}
            fz={"11px"}
            completed
          />
          <BodyItem label="Investors" amount={"299"} symbol={"/ 1000"} />
          <BodyItem label="Position size" amount={"20"} symbol={"WBNB"} />
          <Flex full>
            <Button full size="small" onClick={onInvest}>
              {isTrader ? "Terminal" : "Stake LP"}
            </Button>
          </Flex>
        </S.Body>
        {!isTrader && (
          <S.Footer>
            <Flex>
              <S.FundIconContainer>
                <Icon
                  size={24}
                  m="0"
                  source={poolMetadata?.assets[poolMetadata?.assets.length - 1]}
                  address={poolAddress}
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
        )}
      </S.Container>
    </>
  )
}

export default RiskyProposalCard
