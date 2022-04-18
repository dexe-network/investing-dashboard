import React from "react"
import {
  SuccessContainer,
  Body,
  IconContainer,
  AddressContainer,
  Address,
  TopSideContent,
  Title,
  CenterSideContent,
  Subtitle1,
  Subtitle2,
  Subtitle3,
  ListDiv,
  Check,
  BottomSideContent,
  BottomTitle,
  ShareIcons,
  FacebookIcon,
  TwitterIcon,
  TelegramIcon,
  ButtonsContainer,
} from "./styled"
import IpfsIcon from "components/IpfsIcon"
import LinkImg from "assets/icons/link.svg"
import GreenCheck from "assets/icons/green-check.svg"
import facebook from "assets/icons/facebook.svg"
import twitter from "assets/icons/twitter.svg"
import telegram from "assets/icons/telegram.svg"
import { shortenAddress } from "utils"
import Button from "components/Button"

interface SuccessProps {}

const Success: React.FC<SuccessProps> = () => {
  const title = "Big Trade Fund"
  const subtitle1 = "Listable on Exchandges"
  const subtitle2 = "Smart Contract Ready"
  const subtitle3 = "Borderless Transactions"
  const bottomtitle = "Share my fund"
  return (
    <SuccessContainer>
      <Body>
        <IconContainer>
          <IpfsIcon size={110} />
        </IconContainer>
        <TopSideContent>
          <AddressContainer>
            <Address>
              {shortenAddress("0xd18b9615388afacf2c95282980c6b84a235a32a8")}
            </Address>
            <img src={LinkImg} alt="link" />
          </AddressContainer>
          <Title>{title}</Title>
        </TopSideContent>
        <CenterSideContent>
          <ListDiv>
            <Check>
              <img src={GreenCheck} alt="green check" />
            </Check>
            <Subtitle1>{subtitle1}</Subtitle1>
          </ListDiv>
          <ListDiv>
            <Check>
              <img src={GreenCheck} alt="green check" />
            </Check>
            <Subtitle2>{subtitle2}</Subtitle2>
          </ListDiv>
          <ListDiv>
            <Check>
              <img src={GreenCheck} alt="green check" />
            </Check>
            <Subtitle3>{subtitle3}</Subtitle3>
          </ListDiv>
        </CenterSideContent>
        <BottomSideContent>
          <BottomTitle>{bottomtitle}</BottomTitle>
          <ShareIcons>
            <FacebookIcon>
              <img src={facebook} alt="facebook" />
            </FacebookIcon>
            <TwitterIcon>
              <img src={twitter} alt="twitter" />
            </TwitterIcon>
            <TelegramIcon>
              <img src={telegram} alt="telegram" />
            </TelegramIcon>
          </ShareIcons>
        </BottomSideContent>
        <ButtonsContainer>
          <Button>Open my fund</Button>
          <Button>New Positions</Button>
        </ButtonsContainer>
      </Body>
    </SuccessContainer>
  )
}

export default Success
