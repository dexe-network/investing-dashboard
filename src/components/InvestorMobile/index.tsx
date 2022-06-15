import { useState, useEffect } from "react"
import { Flex } from "theme"
import { useWeb3React } from "@web3-react/core"

import Avatar from "components/Avatar"
import Tooltip from "components/Tooltip"

import { formatNumber, shortenAddress } from "utils"

import shareIcon from "assets/icons/share.svg"

import {
  Card,
  PoolInfoContainer,
  PoolInfo,
  Title,
  Description,
  Divider,
  PoolStatisticContainer,
  Statistic,
  PNL,
  ShareButton,
} from "./styled"
import { useSelector } from "react-redux"
import useContract from "hooks/useContract"
import { selectUserRegistryAddress } from "state/contracts/selectors"
import { UserRegistry } from "abi"
import { useUserMetadata } from "state/ipfsMetadata/hooks"
import { FacebookShareButton } from "react-share"

interface Props {
  account: string | null | undefined
}

const useInvestorMobile = (): [
  { userName: string | null; userAvatar: string }
] => {
  const { account } = useWeb3React()

  const [userName, setUserName] = useState<string | null>(null)
  const [userAvatar, setUserAvatar] = useState<string>("")
  const [profileURL, setProfileURL] = useState<string | null>(null)

  const userRegistryAddress = useSelector(selectUserRegistryAddress)
  const userRegistry = useContract(userRegistryAddress, UserRegistry)

  const [{ userMetadata }] = useUserMetadata(profileURL)

  useEffect(() => {
    if (!userRegistry || !account) return
    ;(async () => {
      const userData = await userRegistry.userInfos(account)
      setProfileURL(userData.profileURL)
    })()
  }, [userRegistry, account])

  useEffect(() => {
    if (userMetadata !== null) {
      if ("name" in userMetadata) {
        setUserName(userMetadata.name)
      }

      if ("assets" in userMetadata && userMetadata.assets.length) {
        setUserAvatar(userMetadata.assets[userMetadata.assets.length - 1])
      }
    }
  }, [userMetadata])

  return [{ userName, userAvatar }]
}

const InvestorMobile: React.FC<Props> = ({ account, children }) => {
  const [{ userName, userAvatar }] = useInvestorMobile()

  return (
    <Card
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{
        duration: 0.5,
        ease: [0.29, 0.98, 0.29, 1],
      }}
    >
      <PoolInfoContainer>
        <PoolInfo>
          <Avatar size={38} url={userAvatar} address={account!} />
          <Flex p="0 0 0 10px" dir="column" ai="flex-start">
            <Title>{userName ?? shortenAddress(account)}</Title>
            <Description>Investing</Description>
          </Flex>
        </PoolInfo>
        <FacebookShareButton
          quote="DEXE"
          hashtag="dexe"
          url="https://dexe.network"
        >
          <ShareButton src={shareIcon} />
        </FacebookShareButton>
      </PoolInfoContainer>
      <Divider />
      <PoolStatisticContainer>
        <Statistic label="Invested" value={`$213k`} />
        <Statistic label="TV" value="$312k" />
        <Statistic label="P&L" value={`12.38%`} />
        <Statistic label="Pools" value={<>3</>} />
      </PoolStatisticContainer>
      {children}
    </Card>
  )
}

export default InvestorMobile
