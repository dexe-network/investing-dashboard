import styled from "styled-components"
import { Flex, Text } from "theme"

export const Container = styled(Flex)`
  width: 100%;
  padding: 16px 16px 80px;
  flex-direction: column;
  justify-cotnent: flex-start;
  max-height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
`

export const Details = styled.div`
  padding: 0 16px 16px;
  background: linear-gradient(64.44deg, #1f232c 32.35%, #282f3f 100%);
  border-radius: 10px;
  margin-top: 16px;
  width: 100%;
`

export const ButtonContainer = styled(Flex)`
  padding: 8px 0 16px;
  justify-content: space-around;
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
