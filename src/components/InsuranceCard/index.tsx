import Button, { SecondaryButton } from "components/Button"
import IpfsIcon from "components/Icon/IpfsIcon"
import TokenIcon from "components/TokenIcon"
import VoteProgress from "components/VoteProgress"
import ArrowForward from "assets/icons/arrow-forward.svg"

import {
  InsuranceCardContainer,
  TopSideContainer,
  BigTradeContainer,
  BigTradeContentContainer,
  BigTradeContentTitle,
  BigTradeContentSubtitle,
  CreatedContainer,
  CreatedContentContainer,
  CreatedContentTitle,
  CreatedContentSubtitle,
  CenterSideContainer,
  LastVoted,
  LastVotedContent,
  Date,
  LastVotedText,
  AllVoted,
  NumberVoted,
  NumberOne,
  NumberTwo,
  AllVotedText,
  Status,
  StatusVoted,
  StatusOne,
  StatusTwo,
  StatusText,
  TextSideContainer,
  ButtonsContainer,
  ButtonText,
  SecondaryButtonText,
  TransparentButton,
  TransparentButtonContent,
  TransparentButtonText,
} from "./styled"
import { FC } from "react"

interface InsuranceCardProps {
  startvoting: (direction: "up" | "down") => void
}

const InsuranceCard: FC<InsuranceCardProps> = ({ startvoting }) => {
  return (
    <InsuranceCardContainer>
      <TopSideContainer>
        <BigTradeContainer>
          <IpfsIcon size={42} />
          <BigTradeContentContainer>
            <BigTradeContentTitle>ISDX</BigTradeContentTitle>
            <BigTradeContentSubtitle>
              BIG TRADE Big Fund
            </BigTradeContentSubtitle>
          </BigTradeContentContainer>
        </BigTradeContainer>

        <CreatedContainer>
          <TokenIcon size={42} />
          <CreatedContentContainer>
            <CreatedContentTitle>12.12.2022</CreatedContentTitle>
            <CreatedContentSubtitle>Created</CreatedContentSubtitle>
          </CreatedContentContainer>
        </CreatedContainer>
      </TopSideContainer>

      <VoteProgress up={41} down={22} />

      <CenterSideContainer>
        <LastVoted>
          <IpfsIcon size={42} />
          <LastVotedContent>
            <Date>JAN 12</Date>
            <LastVotedText>Last Voted</LastVotedText>
          </LastVotedContent>
        </LastVoted>

        <AllVoted>
          <NumberVoted>
            <NumberOne>122/</NumberOne>
            <NumberTwo>200</NumberTwo>
          </NumberVoted>
          <AllVotedText>All Voted</AllVotedText>
        </AllVoted>

        <Status>
          <StatusVoted>
            <StatusOne>22%/</StatusOne>
            <StatusTwo>51%</StatusTwo>
          </StatusVoted>
          <StatusText>Status</StatusText>
        </Status>
      </CenterSideContainer>

      <TextSideContainer>
        Our team has been developing this product since 2019 using their own
        experience and industry standards of trading. During this time, we
        managed to reach the key goal — the creation of an easy-to-use product
        for decentralized copying of the best traders/wallets. the creation of
        an easy-to-use product for decentralized <a>read more</a>
      </TextSideContainer>

      <ButtonsContainer>
        <Button onClick={() => startvoting("up")} m="0" size="small">
          <ButtonText>Up Voted</ButtonText>
        </Button>
        <SecondaryButton onClick={() => startvoting("down")} m="0" size="small">
          <SecondaryButtonText>Down Voted</SecondaryButtonText>
        </SecondaryButton>
        <TransparentButton>
          <TransparentButtonContent>
            <TransparentButtonText>Discuss</TransparentButtonText>
            <img src={ArrowForward} alt="arrow-forward" />
          </TransparentButtonContent>
        </TransparentButton>
      </ButtonsContainer>
    </InsuranceCardContainer>
  )
}

export default InsuranceCard
