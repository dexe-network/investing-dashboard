import axios from "axios"
import { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { Text, To } from "theme"
import { useWeb3React } from "@web3-react/core"
import { useSwipeable } from "react-swipeable"

import { GuardSpinner } from "react-spinners-kit"

import { useSelectUserData } from "state/user/hooks"

import { useCreateFundContext } from "context/CreateFundContext"
import { useConnectWalletContext } from "context/ConnectWalletContext"

import Avatar from "components/Avatar"
import { TraderName } from "components/MemberMobile/styled"

import icon from "assets/icons/button-plus.svg"
import swipeDown from "assets/icons/swipe-arrow-down.svg"
import swipeRight from "assets/icons/swipe-arrow-right.svg"

import {
  Container,
  ProfileSetup,
  BigIconButton,
  IconContainer,
  AvatarWrapper,
  Icon,
  ButtonText,
  HintText,
  ButtonsContainer,
  FloatingButton,
  ArrowButton,
} from "./styled"
import { getSignature } from "utils"

interface Props {}

function ProfileSwitcher(props: Props) {
  const {} = props

  const history = useHistory()
  const { account, library } = useWeb3React()
  const { toggleCreateFund } = useCreateFundContext()
  const { toggleConnectWallet } = useConnectWalletContext()

  const [nickname, setNickname] = useState<string | null>(null)
  const [avatar, setAvatar] = useState<Blob | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const user = useSelectUserData()

  useEffect(() => {
    if (!nickname || !avatar) return

    if (account?.length !== 42) {
      toggleConnectWallet()
      return
    }

    if (nickname.length && !!avatar) {
      setLoading(true)

      const createUser = async () => {
        try {
          // get nonce
          const {
            data: { data },
          } = await axios.get(
            `${process.env.REACT_APP_STATS_API_URL}/nonce/${account}`
          )

          // sign message
          const signature = await getSignature(
            `I am signing my one-time nonce: ${data.nonce}`,
            account,
            library
          )

          // formate create user request
          const formData = new FormData()
          formData.append("file", avatar)
          formData.append("nickname", nickname)
          formData.append("wallet", account)

          // send
          const response = await axios.post(
            `${process.env.REACT_APP_STATS_API_URL}/user/signup`,
            formData,
            {
              headers: {
                "x-morph": btoa(`${account}:${signature}`),
              },
            }
          )

          if (response.status !== 200) {
            // fire error
          } else {
            history.push("/investor")
          }
        } catch (e) {
          console.log(e)
        }
      }

      createUser()
      // TODO: signMessage
    }
  }, [nickname, avatar, account, library, history, toggleConnectWallet])

  const handleCreateFund = () => {
    if (!account) {
      toggleConnectWallet()
      return
    }

    toggleCreateFund(true)
  }

  const handleTraderNameClick = () => {
    const userInput = prompt("Your name will be attached to account address.")
    setNickname(userInput)
  }

  const handleFundRedirect = () => {
    if (!account?.length) {
      toggleConnectWallet()
    }

    history.push("/investor")
  }

  const handleInvestRedirect = () => {
    history.push("/pools")
  }

  const handlers = useSwipeable({
    onSwipedLeft: () => handleFundRedirect(),
    onSwipedDown: () => handleInvestRedirect(),
  })

  const iconElement = (
    <IconContainer>
      <Icon src={icon} />
    </IconContainer>
  )

  const avatarContent = !user ? (
    <>
      <AvatarWrapper>
        <Avatar onCrop={setAvatar} showUploader size={110} />
        <TraderName onClick={handleTraderNameClick}>
          {nickname || "Add a name"}
        </TraderName>
      </AvatarWrapper>
      <HintText>
        Enter your <Text fw={500}>name</Text> and add a
        <Text fw={500}> photo</Text>
      </HintText>
    </>
  ) : (
    <AvatarWrapper>
      <Avatar url={user.avatar} size={110} />
      <TraderName>{user.nickname}</TraderName>
    </AvatarWrapper>
  )
  return (
    <Container {...handlers}>
      <FloatingButton onClick={handleFundRedirect}>
        <img src={swipeRight} alt="swipe right" />
        <Text color="#C2C3C4" fz={14}>
          Your fund
        </Text>
      </FloatingButton>

      <ProfileSetup>
        {loading || user === null ? (
          <GuardSpinner size={30} loading />
        ) : (
          avatarContent
        )}
      </ProfileSetup>
      <ButtonsContainer>
        <To to="/pools">
          <BigIconButton>
            {iconElement}
            <ButtonText>Start investing</ButtonText>
          </BigIconButton>
        </To>
        <BigIconButton onClick={handleCreateFund}>
          {iconElement}
          <ButtonText>
            Create a new fund <br /> \ become a trader
          </ButtonText>
        </BigIconButton>
      </ButtonsContainer>

      <ArrowButton onClick={handleInvestRedirect}>
        <img src={swipeDown} alt="swipe down" />
        <Text color="#C2C3C4" fz={14}>
          New fund for investment
        </Text>
      </ArrowButton>
    </Container>
  )
}

export default ProfileSwitcher
