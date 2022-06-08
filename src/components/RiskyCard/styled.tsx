import styled from "styled-components"
import { Flex, GradientBorder } from "theme"

export const Card = styled(GradientBorder)`
  width: 100%;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  flex-direction: column;
  margin-bottom: 18px;
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
