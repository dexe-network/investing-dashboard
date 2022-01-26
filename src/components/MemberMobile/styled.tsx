import styled from "styled-components"
import { Flex, Text, BaseButton, device } from "theme"

export const Card = styled(Flex)`
  width: 100%;
  background: linear-gradient(64.44deg, #24272f 32.35%, #2c313c 100%);
  border-radius: 8px;
  margin: 16px auto;
  padding: 0 11px;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: space-evenly;

  &:nth-child(1) {
    margin-top: 18px;
  }
`

export const PoolInfoContainer = styled(Flex)`
  height: 59px;
  width: 100%;
  justify-content: space-around;
`

export const PoolInfo = styled(Flex)`
  width: 50%;
  justify-content: flex-start;
  padding-left: 16px;
`

export const BaseInfo = styled(Flex)`
  width: 50%;
  justify-content: flex-start;
`

export const Title = styled.div`
  font-family: Gilroy;
  font-weight: 700;
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
  display: flex;
  align-items: center;
  letter-spacing: 1px;

  color: #ffffff;
`

export const Description = styled.div`
  font-family: Gilroy;
  font-style: normal;
  font-family: Gilroy;
  font-weight: 400;
  font-size: 12px;
  line-height: 12px;

  color: #5a6071;
`

export const Divider = styled.div`
  background: #2e3645;
  width: fill-available;
  margin-left: 60px;
  height: 1px;
`

export const PoolStatisticContainer = styled.div`
  padding-top: 11px;
  height: 60px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-template-areas: ". . . . .";
`

export const PNL = styled.span`
  padding-left: 3px;
  font-family: Gilroy;
  font-style: normal;
  font-family: Gilroy;
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;

  color: #9ae2cb;
`

// # Statistic - UI element that represents one of statistics data inside pool card component

const ItemContainer = styled(Flex)`
  flex-direction: column;
  width: 100%;
  height: 41px;
`

const Label = styled.div`
  font-family: Gilroy;
  font-style: normal;
  font-family: Gilroy;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;

  color: #5a6071;
`

const Value = styled(Flex)`
  font-family: Gilroy;
  font-style: normal;
  font-family: Gilroy;
  font-weight: 400;
  font-size: 16px;
  line-height: 30px;

  color: #f7f7f7;
`

interface StatisticProps {
  label: string
  value: any
}

export const Statistic: React.FC<StatisticProps> = ({ label, value }) => {
  return (
    <ItemContainer>
      <Label>{label}</Label>
      <Value>{value}</Value>
    </ItemContainer>
  )
}
