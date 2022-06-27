import { useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { useWeb3React } from "@web3-react/core"
import { useSelector } from "react-redux"
import { Insurance, UserRegistry } from "abi"

import { PulseSpinner } from "react-spinners-kit"
import Avatar from "components/Avatar"
import { EHeaderTitles } from "components/Header"
import Header from "components/Header/Layout"
import IconButton from "components/IconButton"
import TransactionHistory from "components/TransactionHistory"

import {
  selectInsuranceAddress,
  selectUserRegistryAddress,
} from "state/contracts/selectors"
import useContract from "hooks/useContract"
import useCopyClipboard from "hooks/useCopyClipboard"

import getExplorerLink, { ExplorerDataType } from "utils/getExplorerLink"

import { addUserMetadata } from "utils/ipfs"
import { formatBigNumber, shortenAddress, isTxMined } from "utils"

import { useUserMetadata } from "state/ipfsMetadata/hooks"
import { useTransactionAdder } from "state/transactions/hooks"
import { TransactionType } from "state/transactions/types"
import { useAddToast } from "state/application/hooks"

import pen from "assets/icons/pencil-edit.svg"
import bsc from "assets/wallets/bsc.svg"
import add from "assets/icons/add-green.svg"
import plus from "assets/icons/plus.svg"
import copyIcon from "assets/icons/copy.svg"
import logoutIcon from "assets/icons/logout.svg"

import {
  Container,
  Cards,
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
  TextLink,
  TextIcon,
  InsuranceCard,
  InsuranceInfo,
  InsuranceTitle,
  InsuranceButton,
  InsuranceIcon,
  Network,
  NetworkIcon,
} from "./styled"
import { BigNumber } from "ethers"

import useTransactionHistory from "./useTransactionHistory"

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
  const [userNameInitial, setUserNameInitial] = useState("")
  const [userAvatar, setUserAvatar] = useState("")
  const [userAvatarInitial, setUserAvatarInitial] = useState("")
  const [assets, setAssets] = useState<string[]>([])
  const [profileURL, setProfileURL] = useState<string | null>(null)
  const userRegistryAddress = useSelector(selectUserRegistryAddress)
  const userRegistry = useContract(userRegistryAddress, UserRegistry)

  const [{ userMetadata }] = useUserMetadata(profileURL)

  const handleUserSubmit = async () => {
    setLoading(true)
    const isAvatarChanged = userAvatar !== userAvatarInitial
    const isNameChanged = userName !== userNameInitial

    if (!isAvatarChanged && !isNameChanged) {
      setLoading(false)
      setUserEditing(false)
      return
    }

    const actualAssets = isAvatarChanged ? [...assets, userAvatar] : assets

    const ipfsReceipt = await addUserMetadata(userName, actualAssets, account)
    const trx = await userRegistry?.changeProfile(ipfsReceipt.path)

    setProfileURL(ipfsReceipt.path)

    const receipt = await addTransaction(trx, {
      type: TransactionType.UPDATE_USER_CREDENTIALS,
    })

    if (isTxMined(receipt)) {
      if (isAvatarChanged) {
        setUserAvatarInitial(userAvatar)
        setAssets(actualAssets)
      }

      if (isNameChanged) {
        setUserNameInitial(userName)
      }

      setLoading(false)
      setUserEditing(false)
    }
  }

  useEffect(() => {
    if (!userRegistry) return

    const getUserInfo = async () => {
      setLoading(true)
      const userData = await userRegistry.userInfos(account)
      setProfileURL(userData.profileURL)

      setLoading(false)
    }

    getUserInfo().catch((error) => {
      console.error(error)
      setLoading(false)
    })
  }, [userRegistry, account])

  useEffect(() => {
    if (userMetadata !== null) {
      if ("name" in userMetadata) {
        setUserName(userMetadata.name)
        setUserNameInitial(userMetadata.name)
      }

      if ("assets" in userMetadata && userMetadata.assets.length) {
        setAssets(userMetadata.assets)
        setUserAvatar(userMetadata.assets[userMetadata.assets.length - 1])
        setUserAvatarInitial(
          userMetadata.assets[userMetadata.assets.length - 1]
        )
      }
    }
  }, [userMetadata])

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
  const { account, chainId, deactivate } = useWeb3React()
  const navigate = useNavigate()

  const [isCopied, copy] = useCopyClipboard()
  const addToast = useAddToast()

  const [
    { isUserEditing, userName, userAvatar, isLoading },
    { setUserEditing, setUserName, setUserAvatar, handleUserSubmit },
  ] = useUserSettings()

  const [insuranceAmount, setInsuranceAmount] = useState(BigNumber.from("0"))

  const insuranceAddress = useSelector(selectInsuranceAddress)
  const insurance = useContract(insuranceAddress, Insurance)

  const [
    { txList, txFilter, FilterTypes, txListExpanded },
    { setTxFiler, setTxListExpanded },
  ] = useTransactionHistory()

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

  const handleAddressCopy = () => {
    if (!account) return
    copy(account)
  }

  useEffect(() => {
    if (isCopied && account) {
      addToast(
        { type: "success", content: "Address copied to clipboard" },
        account,
        2000
      )
    }
  }, [isCopied, addToast, account])

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
      <Header>
        {txListExpanded ? "Transactions History" : EHeaderTitles.myWallet}
      </Header>
      <Container
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.5, ease: [0.29, 0.98, 0.29, 1] }}
      >
        <Cards
          animate={{
            opacity: txListExpanded ? 0 : 1,
            transition: { duration: txListExpanded ? 0.2 : 0.4 },
          }}
        >
          <User>
            <Info>
              <AvatarWrapper>
                <Avatar
                  url={userAvatar}
                  address={account}
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
            {chainId && (
              <Address
                removeIcon
                href={getExplorerLink(
                  chainId,
                  account,
                  ExplorerDataType.ADDRESS
                )}
              >
                {shortenAddress(account, 8)}
              </Address>
            )}
            <CardButtons>
              {chainId && (
                <TextLink
                  iconPosition="left"
                  iconColor="#636a77"
                  href={getExplorerLink(
                    chainId,
                    account,
                    ExplorerDataType.ADDRESS
                  )}
                >
                  Bscscan
                </TextLink>
              )}
              <TextButton onClick={handleAddressCopy}>
                <TextIcon src={copyIcon} />
                <span>Copy</span>
              </TextButton>
              <TextButton onClick={handleLogout}>
                <TextIcon src={logoutIcon} />
                <span>Disconnect</span>
              </TextButton>
            </CardButtons>
          </Card>
        </Cards>

        <TransactionHistory
          list={txList}
          filterTypes={FilterTypes}
          filter={txFilter}
          setFilter={setTxFiler}
          expanded={txListExpanded}
          setExpanded={setTxListExpanded}
        />
      </Container>
    </>
  )
}
