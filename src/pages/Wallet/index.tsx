import { useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { useWeb3React } from "@web3-react/core"
import { useSelector } from "react-redux"
import { Insurance, UserRegistry } from "abi"

import { PulseSpinner } from "react-spinners-kit"
import Avatar from "components/Avatar"
import Header, { EHeaderTitles } from "components/Header"
import IconButton from "components/IconButton"

import {
  selectInsuranceAddress,
  selectUserRegistryAddress,
} from "state/contracts/selectors"
import useContract from "hooks/useContract"

import { addUserMetadata, parseUserData } from "utils/ipfs"
import { formatBigNumber, shortenAddress } from "utils"

import { useTransactionAdder } from "state/transactions/hooks"
import { TransactionType } from "state/transactions/types"

import pen from "assets/icons/pencil-edit.svg"
import bsc from "assets/wallets/bsc.svg"
import add from "assets/icons/add-green.svg"
import Invest from "assets/icons/Invest"
import Withdraw from "assets/icons/Withdraw"
import Swap from "assets/icons/Swap"
import Expand from "assets/icons/Expand"
import plus from "assets/icons/plus.svg"

import {
  Container,
  Cards,
  List,
  Info,
  FloatingButtons,
  TextGray,
  Name,
  User,
  UserInfo,
  AvatarWrapper,
  Card,
  Address,
  CardButtons,
  TextButton,
  Heading,
  TransactionsList,
  TransactionsPlaceholder,
  InsuranceCard,
  InsuranceInfo,
  InsuranceTitle,
  InsuranceButton,
  InsuranceIcon,
  Network,
  NetworkIcon,
  Tabs,
  NavButton,
} from "./styled"
import { BigNumber } from "ethers"

const transactions = []

const useUserSettings = (): [
  {
    isUserEditing: boolean
    isLoading: boolean
    userName: string
    userAvatar: string
  },
  {
    setUserEditing: (state: boolean) => void
    setUserName: (name: string) => void
    setUserAvatar: (avatar: string) => void
    handleUserSubmit: () => void
  }
] => {
  const { account } = useWeb3React()

  const addTransaction = useTransactionAdder()

  const [isLoading, setLoading] = useState(true)
  const [isUserEditing, setUserEditing] = useState(false)
  const [userName, setUserName] = useState("")
  const [userAvatar, setUserAvatar] = useState("")
  const [assets, setAssets] = useState<string[]>([])
  const userRegistryAddress = useSelector(selectUserRegistryAddress)
  const userRegistry = useContract(userRegistryAddress, UserRegistry)

  const handleUserSubmit = async () => {
    setLoading(true)
    const ipfsReceipt = await addUserMetadata(
      userName,
      [...assets, userAvatar],
      account
    )
    const trx = await userRegistry?.changeProfile(ipfsReceipt.path)

    addTransaction(trx, { type: TransactionType.UPDATE_USER_CREDENTIALS })

    setLoading(false)
    setUserEditing(false)
  }

  useEffect(() => {
    if (!userRegistry) return

    const getUserInfo = async () => {
      setLoading(true)
      const userData = await userRegistry.userInfos(account)
      const user = await parseUserData(userData.profileURL)

      if ("name" in user) {
        setUserName(user.name)
      }

      if ("assets" in user && user.assets.length) {
        setUserAvatar(user.assets[user.assets.length - 1])
        setAssets(user.assets)
      }

      setLoading(false)
    }

    getUserInfo().catch((error) => {
      console.error(error)
      setLoading(false)
    })
  }, [userRegistry, account])

  return [
    {
      isUserEditing,
      userName,
      userAvatar,
      isLoading,
    },
    {
      setUserEditing,
      setUserName,
      setUserAvatar,
      handleUserSubmit,
    },
  ]
}

export default function Wallet() {
  const { account, deactivate } = useWeb3React()
  const navigate = useNavigate()

  const [
    { isUserEditing, userName, userAvatar, isLoading },
    { setUserEditing, setUserName, setUserAvatar, handleUserSubmit },
  ] = useUserSettings()

  const [insuranceAmount, setInsuranceAmount] = useState(BigNumber.from("0"))

  const insuranceAddress = useSelector(selectInsuranceAddress)
  const insurance = useContract(insuranceAddress, Insurance)

  useEffect(() => {
    if (!insurance) return

    fetchInsuranceBalance().catch(console.error)
  }, [insurance])

  const fetchInsuranceBalance = async () => {
    const userInsurance = await insurance?.getInsurance(account)
    setInsuranceAmount(userInsurance[1])
  }

  const handleLogout = () => {
    deactivate()
    localStorage.removeItem("dexe.network/investing/web3-auth-method")
  }

  const handleInsuranceRedirect = () => {
    navigate("/insurance/management")
  }

  if (!account) return <Navigate to="/welcome" />

  const userIcon = isUserEditing ? (
    <IconButton size={12} filled media={plus} onClick={handleUserSubmit} />
  ) : (
    <IconButton
      size={24}
      filled
      media={pen}
      onClick={() => setUserEditing(true)}
    />
  )

  return (
    <>
      <Header title={EHeaderTitles.myWallet} />
      <Container
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.5, ease: [0.29, 0.98, 0.29, 1] }}
      >
        <Cards>
          <User>
            <Info>
              <AvatarWrapper>
                <Avatar
                  url={userAvatar}
                  onCrop={(_, value) => setUserAvatar(value)}
                  showUploader={isUserEditing}
                  size={44}
                />
              </AvatarWrapper>
              <UserInfo>
                <TextGray>Welcome!</TextGray>
                <Name
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  disabled={!isUserEditing}
                  placeholder="User Name"
                />
              </UserInfo>
            </Info>
            {isLoading ? (
              <PulseSpinner size={20} loading />
            ) : (
              <FloatingButtons>{userIcon}</FloatingButtons>
            )}
          </User>

          <InsuranceCard>
            <InsuranceInfo>
              <InsuranceTitle>
                Total Amount Insured: {formatBigNumber(insuranceAmount, 18, 2)}{" "}
                DEXE
              </InsuranceTitle>
            </InsuranceInfo>
            <InsuranceButton onClick={handleInsuranceRedirect}>
              <InsuranceIcon src={add} alt="add" /> Add insurance
            </InsuranceButton>
          </InsuranceCard>

          <Card>
            <Network>
              BSC <NetworkIcon src={bsc} />
            </Network>
            <TextGray>Current account</TextGray>
            <Address>{shortenAddress(account, 8)}</Address>
            <CardButtons>
              <TextButton color="#9AE2CB">Change</TextButton>
              <TextButton>Copy</TextButton>
              <TextButton onClick={handleLogout}>Disconnect</TextButton>
            </CardButtons>
          </Card>
        </Cards>

        <List>
          <Heading>Transactions History</Heading>

          <Tabs>
            <NavButton>
              Investing <Invest />
            </NavButton>
            <NavButton>
              Swap <Swap />
            </NavButton>
            <NavButton>
              Withdraw <Withdraw />
            </NavButton>
            <NavButton>
              <Expand />
            </NavButton>
          </Tabs>

          {transactions.length ? (
            <TransactionsList></TransactionsList>
          ) : (
            <TransactionsPlaceholder>
              Your transactions will appear here....
            </TransactionsPlaceholder>
          )}
        </List>
      </Container>
    </>
  )
}
