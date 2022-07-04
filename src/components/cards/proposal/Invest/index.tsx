import { FC, useMemo, useState } from "react"

import { useActiveWeb3React } from "hooks"
import { useERC20 } from "hooks/useContract"
import { usePoolContract } from "hooks/usePool"
import { usePoolMetadata } from "state/ipfsMetadata/hooks"

import { RiskyProposal } from "constants/interfaces_v2"

import { Flex } from "theme"
import Icon from "components/Icon"
import Button from "components/Button"
import TokenIcon from "components/TokenIcon"
import IconButton from "components/IconButton"

import S, { BodyItem } from "./styled"
import RiskyCardSettings from "./Settings"

import settingsIcon from "assets/icons/settings.svg"
import settingsGreenIcon from "assets/icons/settings-green.svg"

interface Props {
  proposal: any
  poolAddress: string
  onInvest: () => void
}

const InvestProposalCard: FC<Props> = ({ proposal, poolAddress, onInvest }) => {
  const { account } = useActiveWeb3React()
  // const [, positionTokenData] = useERC20(proposal.proposalInfo.token)
  // const [, poolInfo] = usePoolContract(poolAddress)

  // const [{ poolMetadata }] = usePoolMetadata(
  //   poolAddress,
  //   poolInfo?.parameters.descriptionURL
  // )

  // const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false)

  // const active = true

  // // Check that current user is pool trader or not
  // const isTrader = useMemo(() => {
  //   if (!account || !poolInfo) return false
  //   return account === poolInfo?.parameters.trader
  // }, [account, poolInfo])

  return (
    <>
      <S.Container>
        <S.Body>
          <BodyItem label="Supply" amount={"90k"} symbol={"1/JBR"} />
          <BodyItem label="Your size" amount={"47k"} symbol={"1/JBR"} />
          <BodyItem label="Max Size" amount={"100k"} symbol={"1/JBR"} />
          <BodyItem label="APR" amount={"10.02 %"} />
          <BodyItem label="Total dividends" amount={"~999k"} symbol={"USDT"} />
          <BodyItem label="Dividends avail." amount={"~88k"} symbol={"USDT"} />
          <BodyItem label="Investors" amount={"999/"} symbol={"1000"} />
          <BodyItem label="Price OTC" amount={"-"} />
          <BodyItem
            label="Expiration date"
            amount={"JUN 20,2022  20:00"}
            fz="11px"
          />
        </S.Body>
      </S.Container>
    </>
  )

  // return (
  //   <>
  //     <S.Container>
  //       <S.Head isTrader={isTrader}>
  //         <Flex>
  //           <TokenIcon address={proposal.proposalInfo.token} m="0" size={24} />
  //           <S.Title>
  //             {positionTokenData?.symbol} for 0.0013 WBNB or less
  //           </S.Title>
  //         </Flex>
  //         {isTrader ? (
  //           <>
  //             <Flex>
  //               <S.Status active={active}>
  //                 {active ? "Open investing" : "Closed"}
  //               </S.Status>
  //               <Flex m="0 0 0 4px">
  //                 <IconButton
  //                   size={12}
  //                   media={isSettingsOpen ? settingsGreenIcon : settingsIcon}
  //                   onClick={() => {
  //                     setIsSettingsOpen(!isSettingsOpen)
  //                   }}
  //                 />
  //               </Flex>
  //             </Flex>
  //             <RiskyCardSettings
  //               visible={isSettingsOpen}
  //               setVisible={setIsSettingsOpen}
  //             />
  //           </>
  //         ) : (
  //           <Flex>
  //             <S.Ticker>{poolInfo?.ticker}</S.Ticker>
  //             <Icon
  //               size={24}
  //               m="0 0 0 4px"
  //               source={poolMetadata?.assets[poolMetadata?.assets.length - 1]}
  //               address={poolAddress}
  //             />
  //           </Flex>
  //         )}
  //       </S.Head>
  //       <S.Body>
  //         <BodyItem
  //           label={isTrader ? "Max size" : "Proposal size"}
  //           amount={"40 LP"}
  //         />
  //         <BodyItem label="Your size" amount={"0 LP"} />
  //         <BodyItem label="Fullness" amount={"35 LP"} />
  //         <BodyItem
  //           label="Max. Invest Price"
  //           amount={"0.0013"}
  //           symbol={"WBNB"}
  //         />
  //         <BodyItem label="Current price" amount={"0.00129"} symbol={"WBNB"} />
  //         <BodyItem
  //           label="Expiration date"
  //           amount={"JUN 20,2022  20:00"}
  //           fz={"11px"}
  //           completed
  //         />
  //         <BodyItem label="Investors" amount={"299"} symbol={"/ 1000"} />
  //         <BodyItem label="Position size" amount={"20"} symbol={"WBNB"} />
  //         <Flex full>
  //           <Button full size="small" onClick={onInvest}>
  //             {isTrader ? "Terminal" : "Stake LP"}
  //           </Button>
  //         </Flex>
  //       </S.Body>
  //     </S.Container>
  //   </>
  // )
}

export default InvestProposalCard
