import styled from "styled-components"
import { Flex, GradientBorder } from "theme"

export const CardContainer = styled.div`
  margin-bottom: 18px;
`
export const Card = styled(GradientBorder)`
  width: 100%;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  flex-direction: column;
  cursor: pointer;

  &::after {
    background: #181e2c;
  }
`

export const Head = styled(Flex)`
  width: 100%;
  justify-content: space-between;
  padding: 8px 16px;
  border-bottom: 1px solid #1d2635;
`

export const Body = styled.div`
  width: 100%;
  padding: 12px 16px 16px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 8px;
`

export const PositionSymbol = styled.div`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 100%;
  color: #e4f2ff;
  margin: 0 4px;
  transform: translateY(2px);
`

export const Amount = styled(PositionSymbol)`
  margin: 0 0 0 8px;
`

export const FundSymbol = styled.div`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 100%;
  margin: 0 8px;
  color: #616d8b;
  transform: translateY(2px);
`

export const Label = styled.div`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 100%;
  letter-spacing: 0.03em;
  color: #616d8b;
`

export const Value = styled.div`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 100%;
  letter-spacing: 0.01em;
  color: #e4f2ff;
  margin-right: 4px;
`

export const PNL = styled(Value)`
  font-size: 12px;
  color: #83e5ca;
`

export const StablePrice = styled.div`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 100%;
  color: #616d8b;
`

export const ActionsContainer = styled(Flex)`
  width: 100%;
  justify-content: space-between;
  margin: 8px 0 0;
`
export const Action = styled(GradientBorder)<{ active?: boolean }>`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 15px;
  padding: 8px 12px;
  border-radius: 23px;
  color: ${(props) => (props.active ? "#E4F2FF" : "#788AB4")};
  cursor: pointer;

  &:after {
    background: #08121a;
  }
`

export const ExtraContainer = styled(GradientBorder)`
  width: 100%;
  flex-direction: column;
  border-radius: 20px;
  margin-top: 8px;

  &::after {
    background: #181e2c;
  }

  & > *:not(:last-child) {
    border-bottom: 1px solid #1d2635;
  }
`

// POSITION TRADE

export const PositionTradeStyles = {
  Container: styled(Flex)`
    width: 100%;
  `,
  Content: styled.div`
    display: grid;
    grid-template-columns: 0.5fr 0.25fr 0.25fr;
    gap: 18px;
    width: 100%;
    align-items: flex-start;
    padding: 12px 15px;
  `,
  Item: styled(Flex)`
    width: 100%;
    flex: 0 1 auto;
    flex-direction: column;
    align-items: flex-start;
  `,
  Label: styled.div`
    width: 100%;
    margin-bottom: 4px;
    font-family: "Gilroy";
    font-style: normal;
    font-weight: 500;
    font-size: 11px;
    line-height: 13px;
    color: #788ab4;
  `,
  Value: styled.div`
    width: 100%;
    font-family: "Gilroy";
    font-style: normal;
    font-weight: 600;
    font-size: 13px;
    line-height: 16px;
    letter-spacing: 0.03em;
    color: #e4f2ff;
  `,
  Direction: styled.span<{ isBuy?: boolean }>`
    font-family: "Gilroy";
    font-style: normal;
    font-weight: 600;
    font-size: 13px;
    line-height: 16px;
    letter-spacing: 0.03em;
    color: ${(props) => (props.isBuy ? "#9AE2CB" : "#DB6D6D")};
  `,
}

// COMMISSION

export const CommissionCard = styled(GradientBorder)`
  width: 100%;
  flex-direction: column;
  border-radius: 20px;
  margin-top: 8px;
  padding: 8px 16px;

  &::after {
    background: #181e2c;
  }
`
