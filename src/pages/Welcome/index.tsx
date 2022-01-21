import axios from "axios"
import { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { Text, To } from "theme"
import { useWeb3React } from "@web3-react/core"
import { useSwipeable } from "react-swipeable"

import { GuardSpinner } from "react-spinners-kit"

import { useConnectWalletContext } from "context/ConnectWalletContext"

import Avatar from "components/Avatar"

import icon from "assets/icons/button-plus.svg"
import swipeDown from "assets/icons/swipe-arrow-down.svg"

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
  ArrowButton,
  TraderName,
} from "./styled"
import { getSignature } from "utils"

interface Props {}

function Welcome(props: Props) {
  const {} = props

  const history = useHistory()
  const { account, library } = useWeb3React()
  const { toggleConnectWallet } = useConnectWalletContext()

  const [nickname, setNickname] = useState<string | null>(null)
  const [avatar, setAvatar] = useState<Blob | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  // EMULATE user data loading and trader data loading
  useEffect(() => {
    ;(async () => {
      const resolver = await new Promise<{
        investor: boolean
        trader: boolean
      }>((resolve) => {
        setTimeout(() => {
          resolve({ investor: false, trader: false })
        }, 50)
      })

      if (resolver.trader) {
        history.push("/me/trader/0x...")
      } else if (resolver.investor) {
        history.push("/me/investor")
      }
      setLoading(false)
    })()
  }, [history])

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

  const handleTraderNameClick = () => {
    const userInput = prompt("Your name will be attached to account address.")
    setNickname(userInput)
  }

  const handleFundRedirect = () => {
    // if (!account?.length) {
    //   toggleConnectWallet()
    // }

    history.push("/me/trader/0x...")
  }

  const handleInvestRedirect = () => {
    history.push("/")
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

  const avatarContent = (
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
  )

  if (loading) {
    return (
      <Container {...handlers}>
        <GuardSpinner size={30} loading />
      </Container>
    )
  }

  return (
    <Container {...handlers}>
      <ProfileSetup
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.5, ease: [0.29, 0.98, 0.29, 1] }}
      >
        {avatarContent}
      </ProfileSetup>
      <ButtonsContainer
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.5, ease: [0.29, 0.98, 0.29, 1] }}
      >
        <To to="/">
          <BigIconButton>
            {iconElement}
            <ButtonText color="#75DDC1">Start investing</ButtonText>
          </BigIconButton>
        </To>
        <To to="new-fund">
          <BigIconButton>
            {iconElement}
            <ButtonText color="#007FF3">Became a trader</ButtonText>
          </BigIconButton>
        </To>
      </ButtonsContainer>

      <ArrowButton
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.5, ease: [0.29, 0.98, 0.29, 1] }}
        onClick={handleInvestRedirect}
      >
        <img src={swipeDown} alt="swipe down" />
        <Text color="#C2C3C4" fz={14}>
          New fund for investment
        </Text>
      </ArrowButton>
    </Container>
  )
}

export default Welcome
