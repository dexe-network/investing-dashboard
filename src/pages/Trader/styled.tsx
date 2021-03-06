import styled from "styled-components"
import { Flex, GradientBorder, Text } from "theme"
import ArrowOutlineRight from "assets/icons/ArrowOutlineRight"

export const Container = styled(Flex)`
  width: 100%;
  padding: 16px 16px 80px;
  flex-direction: column;
  justify-content: flex-start;
  max-height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  height: calc(100vh - 94px);

  @media all and (display-mode: standalone) {
    height: calc(100vh - 115px);
  }
`

export const Details = styled(GradientBorder)`
  flex-direction: column;
  padding: 0 16px 16px;
  border-radius: 10px;
  margin-top: 16px;
  width: 100%;
  position: relative;

  &:after {
    background: #181e2c;
  }
`

export const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  grid-gap: 16px;
  padding: 10px 0 16px;
  width: 100%;
`

export const AreaWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  opacity: 0.5;
`

export const Buttons = styled(Flex)`
  width: 100%;
  justify-self: flex-end;
  margin-top: auto;
`

export const Section = styled(Flex)`
  width: 100%;
  flex-direction: column;
`

export const HalfBlock = styled(Flex)`
  flex-direction: column;
  align-items: space-around;
  height: 100%;
  width: 100%;
  padding: 10px 0;
`

export const Label = styled(Text)`
  text-align: center;
  font-family: Gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  color: #5a6071;
`
export const Value = styled(Text)`
  font-family: Gilroy;
  font-style: normal;
  font-weight: bold;
  font-size: 28px;
  line-height: 41px;
  text-align: center;
  color: #f7f7f7;
`
export const Pnl = styled(Text)<{ side: "BUY" | "SELL" }>`
  font-size: 12px;
  color: ${(props) => (props.side === "BUY" ? "#7FFFD4" : "#FF7F7F")};
`

export const TextGrey = styled.div`
  font-family: Gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 130%;
  /* or 18px */

  display: flex;
  align-items: center;

  /* Text / gray */

  color: #5a6071;
`

export const TextWhiteBig = styled.div`
  font-family: Gilroy;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 130%;
  /* or 18px */

  display: flex;
  align-items: center;
  text-align: right;

  color: #c5d1dc;
`

// EMMISSION

export const LeftText = styled.div`
  font-family: Gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 130%;
  color: #c5d1dc;
`

const BarContainer = styled.div`
  background: #373e4d;
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 6px;
  border-radius: 4px;
  height: 4px;
  width: 100%;
`

const BarProgress = styled.div<{ w: string }>`
  background: linear-gradient(64.44deg, #63b49b 12.29%, #a4ebd4 76.64%);
  box-shadow: 0px 1px 4px rgba(164, 235, 212, 0.29),
    0px 2px 5px rgba(164, 235, 212, 0.14);
  border-radius: 2px;
  height: 4px;
  width: ${(props) => props.w || "0%"};
`

const EmissionContainer = styled.div`
  width: 100%;
`

const Current = ({ value }) => {
  return <TextWhiteBig>{value}</TextWhiteBig>
}

const Total = ({ value }) => {
  return <LeftText>{value}</LeftText>
}

const ProgressBar = () => {
  return (
    <BarContainer>
      <BarProgress w="60%" />
    </BarContainer>
  )
}

export const FundsUsed: React.FC<{ total: string; current: string }> = ({
  total,
  current,
}) => {
  return (
    <EmissionContainer>
      <Flex full>
        <Total value={total} />
        <Current value={current} />
      </Flex>
      <Flex p="7px 0 6px" full>
        <ProgressBar />
      </Flex>
    </EmissionContainer>
  )
}

export const DetailsEditLinkFrame = styled(Flex)`
  position: absolute;
  top: 6px;
  right: 8px;
  z-index: 2;
`

export const OwnInvesting = styled(GradientBorder)`
  padding: 16px;
  border-radius: 10px;
  width: 100%;

  &:after {
    background: #181e2c;
  }
`
export const OwnInvestingLabel = styled.div`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  line-height: 13px;
  color: #788ab4;
`
export const OwnInvestingValue = styled.div`
  margin-top: 8px;
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  color: #e4f2ff;
`
export const OwnInvestingLinkContainer = styled(Flex)`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: #e4f2ff;
`
export const OwnInvestingLinkText = styled.span`
  display: inline-block;
  margin-right: 9px;
`
export const OwnInvestingLink = (props) => (
  <OwnInvestingLinkContainer {...props}>
    <OwnInvestingLinkText>Invest in my fund</OwnInvestingLinkText>
    <ArrowOutlineRight color="#e4f2ff" width="4.7px" height="8px" />
  </OwnInvestingLinkContainer>
)
