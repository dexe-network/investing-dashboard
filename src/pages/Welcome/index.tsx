import axios from "axios"
import { useState, useEffect } from "react"
import { Switch, useHistory } from "react-router-dom"
import { Text, To, Flex } from "theme"
import { useWeb3React } from "@web3-react/core"
import { useSwipeable } from "react-swipeable"
import { useConnectWalletContext } from "context/ConnectWalletContext"
import { getSignature } from "utils"
import Button, { SecondaryButton } from "components/Button"
import { CubeSpinner } from "react-spinners-kit"
import logo from "assets/icons/logo-big.svg"
import facebook from "assets/icons/facebook.svg"
import twitter from "assets/icons/twitter.svg"
import telegram from "assets/icons/telegram.svg"
import investing from "assets/template-buttons/investing.svg"
import {
  Container,
  Center,
  LoadingText,
  Logo,
  Content,
  Buttons,
  Title,
  Description,
  Socials,
  SocialIcon,
} from "./styled"

interface Props {
  children: any
}

const Welcome: React.FC<Props> = (props) => {
  const { children } = props
  const [isLoading, setLoading] = useState(true)
  const { toggleConnectWallet } = useConnectWalletContext()
  const activeProviderName = localStorage.getItem(
    "dexe.network/investing/web3-auth-method"
  )

  const { account } = useWeb3React()
  const history = useHistory()

  const handleFundRedirect = () => {
    if (!account) {
      toggleConnectWallet(true)
      return
    }
    history.push("/me/trader/0x...")
  }

  const handleInvestRedirect = () => {
    if (!account) {
      toggleConnectWallet(true)
      return
    }
    history.push("/")
  }

  const handleCreateFundRedirect = () => {
    if (!account) {
      toggleConnectWallet(true)
      return
    }
    history.push("/new-fund")
  }

  const handlers = useSwipeable({
    onSwipedLeft: () => handleFundRedirect(),
    onSwipedDown: () => handleInvestRedirect(),
  })

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1500)
  }, [])

  return !isLoading && !!account ? (
    children
  ) : (
    <Container
      initial={{ y: -5 }}
      animate={{ y: 0 }}
      exit={{ y: -5 }}
      transition={{ duration: 0.1, ease: [0.29, 0.98, 0.29, 1] }}
    >
      {isLoading ? (
        <Center>
          <CubeSpinner size={45} loading />
          <LoadingText>Reading blocchain data, please wait</LoadingText>
        </Center>
      ) : (
        <>
          <Flex full>
            <Logo src={logo} />
          </Flex>
          <Content>
            <Title>
              Investment <br /> social trading <br /> platform of the <br /> new
              generation
            </Title>
            <Description>
              Start investing, create funds and trading at decentralized crypto
              platform
            </Description>
            <Socials>
              <SocialIcon src={facebook} />
              <SocialIcon src={twitter} />
              <SocialIcon src={telegram} />
            </Socials>
          </Content>
          <Buttons>
            <Button size="large" m="0" onClick={handleCreateFundRedirect}>
              Become a trader
            </Button>
            <img src={investing} onClick={handleInvestRedirect} />
          </Buttons>
        </>
      )}
    </Container>
  )
}

export default Welcome
