import axios from "axios"
import { useState, useEffect } from "react"
import { useNavigate, useLocation, Navigate, Outlet } from "react-router-dom"
import { Text, To, Flex } from "theme"
import { useWeb3React } from "@web3-react/core"
import { useSwipeable } from "react-swipeable"
import { useConnectWalletContext } from "context/ConnectWalletContext"
import { getSignature } from "utils"
import Button, { SecondaryButton } from "components/Button"
import ConnectWallet from "modals/ConnectWallet"
import { CubeSpinner } from "react-spinners-kit"
import logo from "assets/icons/logo-big.svg"
import facebook from "assets/icons/facebook.svg"
import twitter from "assets/icons/twitter.svg"
import telegram from "assets/icons/telegram.svg"
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

const Welcome: React.FC = () => {
  const [isLoading, setLoading] = useState(true)
  const { toggleConnectWallet, isWalletOpen } = useConnectWalletContext()
  const navigate = useNavigate()
  const { account } = useWeb3React()

  const activeProviderName = localStorage.getItem(
    "dexe.network/investing/web3-auth-method"
  )

  useEffect(() => {
    if (!account) return

    navigate("/", { replace: true })
  }, [account, navigate])

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1500)
  }, [])

  return (
    <>
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
                Investment <br /> social trading <br /> platform of the <br />{" "}
                new generation
              </Title>
              <Description>
                Start investing, create funds and trading at decentralized
                crypto platform
              </Description>
              <Socials>
                <SocialIcon src={facebook} />
                <SocialIcon src={twitter} />
                <SocialIcon src={telegram} />
              </Socials>
            </Content>
            <Buttons>
              <Button
                size="large"
                m="0"
                onClick={() => toggleConnectWallet(true)}
              >
                Become a trader
              </Button>
              <SecondaryButton
                size="large"
                m="0"
                onClick={() => toggleConnectWallet(true)}
              >
                Investing
              </SecondaryButton>
            </Buttons>
          </>
        )}
      </Container>
      <ConnectWallet
        isOpen={isWalletOpen}
        onRequestClose={() => toggleConnectWallet(false)}
        onConnect={() => navigate("/", { replace: true })}
      />
    </>
  )
}

export default Welcome
