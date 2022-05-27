import axios from "axios"
import { useState, useEffect, useCallback } from "react"
import { useNavigate, useLocation, Navigate, Outlet } from "react-router-dom"
import { Text, To, Flex } from "theme"
import { useWeb3React } from "@web3-react/core"
import { useSwipeable } from "react-swipeable"
import { CubeSpinner } from "react-spinners-kit"
import { useConnectWalletContext } from "context/ConnectWalletContext"
import { getSignature } from "utils"
import Button, { SecondaryButton } from "components/Button"
import ConnectWallet from "modals/ConnectWallet"
import { getRedirectedPoolAddress } from "utils"
import { useSelector } from "react-redux"
import { selectOwnedPools } from "state/user/selectors"

import logo from "assets/icons/logo-big.svg"
import facebook from "assets/icons/facebook.svg"
import twitter from "assets/icons/twitter.svg"
import telegram from "assets/icons/telegram.svg"
import arrowOutlineRight from "assets/icons/arrow-outline-right.svg"
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
  LoginContainer,
  ArrowOutlineRight,
} from "./styled"

enum LoginPathMapper {
  trader = "/me/trader/profile",
  investor = "/me/investor",
  wallet = "/wallet",
}

const Welcome: React.FC = () => {
  const [isLoading, setLoading] = useState(true)
  const [loginPath, setLoginPath] = useState<LoginPathMapper | string | null>(
    null
  )
  const { toggleConnectWallet, isWalletOpen } = useConnectWalletContext()
  const navigate = useNavigate()
  const { account } = useWeb3React()
  const ownedPools = useSelector(selectOwnedPools)
  const redirectPath = getRedirectedPoolAddress(ownedPools)

  const activeProviderName = localStorage.getItem(
    "dexe.network/investing/web3-auth-method"
  )

  const getTraderPath = useCallback(() => {
    if (!redirectPath) return LoginPathMapper.investor
    return `${LoginPathMapper.trader}/${redirectPath[0]}/${redirectPath[1]}`
  }, [redirectPath])

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
                full
                size="big"
                m="0"
                onClick={() => {
                  toggleConnectWallet(true)
                  setLoginPath(getTraderPath())
                }}
              >
                Become a trader
              </Button>
              <SecondaryButton
                full
                size="big"
                m="0"
                onClick={() => {
                  toggleConnectWallet(true)
                  setLoginPath(LoginPathMapper.investor)
                }}
              >
                Investing
              </SecondaryButton>
            </Buttons>
            <LoginContainer
              onClick={() => {
                toggleConnectWallet(true)
                setLoginPath(LoginPathMapper.wallet)
              }}
            >
              <Flex>
                I already have account{" "}
                <ArrowOutlineRight src={arrowOutlineRight} />
              </Flex>
            </LoginContainer>
          </>
        )}
      </Container>
      <ConnectWallet
        isOpen={isWalletOpen}
        onRequestClose={() => {
          toggleConnectWallet(false)
          setLoginPath(null)
        }}
        onConnect={() => navigate(loginPath ?? "/", { replace: true })}
      />
    </>
  )
}

export default Welcome
