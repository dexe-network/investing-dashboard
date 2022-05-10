import styled from "styled-components"
import { GradientBorder } from "theme"

export const InsuranceCardContainer = styled(GradientBorder)`
  width: fill-available;
  flex-direction: column;
  margin: 0 auto;
  border-radius: 16px;
  margin: 0 0 16px;

  &:after {
    background: #181e2c;
  }
`

export const TopSideContainer = styled.div`
  display: flex;
  width: fill-available;
  justify-content: space-between;
  padding: 13px 13px 16px;
  box-sizing: border-box;
`

export const BigTradeContainer = styled.div`
  display: flex;
`

export const BigTradeContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const BigTradeContentTitle = styled.div`
  margin-bottom: 10px;
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #e4f2ff;
`

export const BigTradeContentSubtitle = styled.div`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 10px;
  letter-spacing: 0.03em;
  color: #616d8b;
`

export const CreatedContainer = styled.div`
  display: flex;
`

export const CreatedContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const CreatedContentTitle = styled.div`
  margin-bottom: 10px;
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 14px;
  color: #e4f2ff;
`

export const CreatedContentSubtitle = styled.div`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 10px;
  letter-spacing: 0.03em;
  color: #616d8b;
`

export const CenterSideContainer = styled.div`
  width: fill-available;
  display: flex;  
  align- items: center;
  justify-content: space-between;
  padding: 16px 29px 24px 16px;
  box-sizing: border-box;
`

export const LastVoted = styled.div`
  display: flex;
  justify-content: center;
`

export const LastVotedContent = styled.div`
  display: flex;
  flex-direction: column;
`

export const Date = styled.div`
  margin-bottom: 10px;
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #e4f2ff;
`

export const LastVotedText = styled.div`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 10px;
  letter-spacing: 0.03em;
  color: #616d8b;
`

export const AllVoted = styled.div`
  display: flex;
  flex-direction: column;
`

export const NumberVoted = styled.div`
  display: flex;
  margin-bottom: 10px;
`

export const NumberOne = styled.div`
  margin-right: 1px;
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #e4f2ff;
`

export const NumberTwo = styled.div`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #5f6d8e;
`

export const AllVotedText = styled.div`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 10px;
  letter-spacing: 0.03em;
  color: #616d8b;
`

export const Status = styled.div`
  display: flex;
  flex-direction: column;
`

export const StatusVoted = styled.div`
  display: flex;
  margin-bottom: 10px;
`

export const StatusOne = styled.div`
  margin-right: 1px;
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #e4f2ff;
`

export const StatusTwo = styled.div`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #5f6d8e;
`

export const StatusText = styled.div`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 10px;
  letter-spacing: 0.03em;
  color: #616d8b;
`

export const TextSideContainer = styled.div`
  width: fill-available;
  min-height: 110px;
  padding: 0 16px 24px;
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 140%;
  letter-spacing: 0.03em;
  color: #e4f2ff;
  & > a {
    color: #0065c2;
  }
`

export const ButtonsContainer = styled.div`
  width: fill-available;
  display: flex;
  justify-content: space-between;
  padding: 0 16px 24px;
  box-sizing-border-box;
`

export const ButtonText = styled.div`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 0px;
  text-align: center;
  letter-spacing: 0.03em;
  color: #0d1320;
`

export const SecondaryButtonText = styled.div`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 0px;
  text-align: center;
  letter-spacing: 0.03em;
  color: #e4f2ff;
`

export const TransparentButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const TransparentButtonContent = styled.div`
  display: flex;
`

export const TransparentButtonText = styled.div`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 0px;
  text-align: center;
  letter-spacing: 0.03em;
  color: #e4f2ff;
  display: flex;
  align-items: center;
`
