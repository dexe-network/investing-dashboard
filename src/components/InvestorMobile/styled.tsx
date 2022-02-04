import styled from "styled-components"
import { Flex, Text, BaseButton, device } from "theme"

export const Card = styled(Flex)`
  width: 100%;
  background: linear-gradient(64.44deg, #1f232c 32.35%, #282f3f 100%);
  border-radius: 8px;
  padding: 0 9px 20px;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: space-evenly;
`

export const PoolInfoContainer = styled(Flex)`
  position: relative;
  height: 71px;
  width: 100%;
  justify-content: flex-start;

  @media only screen and (${device.xxs}) {
    height: 59px;
  }
`

export const ShareButton = styled.img`
  position: absolute;
  right: 5px;
  top: 9px;
`

export const PoolInfo = styled(Flex)`
  width: 50%;
  justify-content: flex-start;
  padding-left: 16px;
`

export const Title = styled.div`
  font-family: Gilroy;
  font-weight: 700;
  font-weight: bold;
  font-size: 18px;
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
  font-size: 14px;
  line-height: 15px;

  color: #5a6071;
  display: flex;
  align-items: center;
`

export const Divider = styled.div`
  background: #2e3645;
  width: fill-available;
  margin-left: 14px;
  margin-right: 14px;
  height: 1px;
`

export const PoolStatisticContainer = styled.div`
  padding: 15px 16px 0;
  height: 80px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-template-areas: ". . . . .";
  align-items: center;
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
  align-items: flex-start;
  flex: 1;
  height: 41px;

  &:nth-child(1) {
    justify-self: start;
  }
  &:nth-child(2) {
    justify-self: end;
  }
  &:nth-child(3) {
    justify-self: end;
  }
  &:nth-child(4) {
    justify-self: end;
  }
`

const Label = styled.div`
  font-family: Gilroy;
  font-style: normal;
  font-family: Gilroy;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  text-align: left;

  color: #5a6071;
`

const Value = styled(Flex)`
  font-family: Gilroy;
  font-style: normal;
  font-family: Gilroy;
  font-weight: 600;
  font-size: 18px;
  line-height: 30px;
  text-align: left;
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
