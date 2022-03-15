import styled from "styled-components"
import { Flex, To } from "theme"
import { useParams } from "react-router-dom"
import grayCheck from "assets/icons/gray-check.svg"
import facebookIcon from "assets/icons/facebook-rounded.svg"
import twitterIcon from "assets/icons/twitter-rounded.svg"
import telegramIcon from "assets/icons/telegram-rounded.svg"
import shareIcon from "assets/icons/share-rounded.svg"
import ButtonImg from "assets/template-buttons/new-positions.svg"
import Button from "components/Button"
import { shortenAddress } from "utils"
import bottomAsset from "assets/background/welcome-bottom.svg"
import rightAsset from "assets/background/welcome-right.svg"

const Container = styled(Flex)`
  position: relative;
  box-sizing: border-box;
  padding-left: 28px;
  padding-right: 22px;
  width: 100%;
  height: 100%;
  background: linear-gradient(8.35deg, #171b1f 0.79%, #1e222d 109.7%);
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;

  &:before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: url(${rightAsset});
    background-position: 100% 0;
    background-repeat: no-repeat;
  }
  &:after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: url(${bottomAsset});
    background-position: 0 100%;
    background-repeat: no-repeat;
  }
`
const Title = styled.div`
  font-family: Gilroy;
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 41px;
  color: #ffffff;
  margin-top: 12px;
`
const Subtitle = styled.div`
  font-family: Gilroy;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #5a6071;
`
const Symbol = styled.div`
  font-family: Gilroy;
  font-style: normal;
  font-weight: 600;
  font-size: 50px;
  line-height: 61px;
  letter-spacing: 0.03em;
  color: #ffffff;
`
const Adress = styled.div`
  font-family: Gilroy;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: 1px;
  text-decoration-line: underline;
  color: #3399ff;
`
const AnotherSubtitle = styled.div`
  font-family: Gilroy;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #5a6071;
  margin-bottom: 11px;
`
const IconsContainer = styled(Flex)`
  & > img:nth-child(1) {
    margin-right: 24px;
  }
  & > img:nth-child(2) {
    margin-right: 24px;
  }
  & > img:nth-child(3) {
    margin-right: 18px;
  }
  & > img:nth-child(4) {
    margin-right: 0px;
  }
`
const ContentContainer = styled(Flex)`
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`
const ButtonContainer = styled(Flex)`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  max-width: 350px;
`

const Success = () => {
  const { ticker, address } = useParams<{ ticker: string; address: string }>()
  return (
    <Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <ContentContainer>
        <img src={grayCheck} alt="gray-check" />
        <Title>Success</Title>
        <Subtitle>Your fund is created</Subtitle>
      </ContentContainer>
      <ContentContainer>
        <Symbol>{ticker}</Symbol>
        <Adress>{shortenAddress(address)}</Adress>
      </ContentContainer>
      <ContentContainer>
        <AnotherSubtitle>Share my fund</AnotherSubtitle>
        <IconsContainer>
          <img src={facebookIcon} alt="facebook-icon" />
          <img src={twitterIcon} alt="twitter-icon" />
          <img src={telegramIcon} alt="telegram-icon" />
          <img src={shareIcon} alt="share-icon" />
        </IconsContainer>
      </ContentContainer>
      <ButtonContainer>
        <Flex p="0 21px 0 0">
          <img src={ButtonImg} alt="button-img" />
        </Flex>
        <To to="/">
          <Flex>
            <Button>Go to Funds list</Button>
          </Flex>
        </To>
      </ButtonContainer>
    </Container>
  )
}

export default Success
