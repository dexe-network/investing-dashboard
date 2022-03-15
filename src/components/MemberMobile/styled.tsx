import styled from "styled-components"
import { Flex, Text, BaseButton, device, size } from "theme"

export const Card = styled(Flex)`
  width: 100%;
  background: linear-gradient(64.44deg, #1f232c 32.35%, #282f3f 100%);
  border-radius: 8px;
  padding: 0 11px;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: space-evenly;
  z-index: 5;

  @media only screen and (min-width: ${size.xs}) {
    flex-direction: row;
  }
`

export const PoolInfoContainer = styled(Flex)`
  height: 62px;
  width: 100%;
  justify-content: space-around;
`

export const PoolInfo = styled(Flex)`
  width: 55%;
  justify-content: flex-start;
  padding-left: 12px;
`

export const BaseInfo = styled(Flex)`
  width: 45%;
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
  line-height: 12px;

  color: #5a6071;
`

export const Divider = styled.div`
  background: radial-gradient(
      54.8% 53% at 50% 50%,
      #587eb7 0%,
      rgba(88, 126, 183, 0) 100%
    ),
    radial-gradient(
      60% 51.57% at 50% 50%,
      #6d99db 0%,
      rgba(109, 153, 219, 0) 100%
    ),
    radial-gradient(
      69.43% 69.43% at 50% 50%,
      rgba(5, 5, 5, 0.5) 0%,
      rgba(82, 82, 82, 0) 100%
    );
  opacity: 0.1;
  width: fill-available;
  margin-left: 63px;
  height: 1px;
`

export const PoolStatisticContainer = styled.div`
  padding: 7px 16px 0;
  height: 57px;
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
  flex: 1;
  height: 41px;
  align-items: flex-start;

  &:nth-child(1) {
    justify-self: start;
  }
  &:nth-child(2) {
    justify-self: start;
  }
  &:nth-child(3) {
    justify-self: start;
  }
  &:nth-child(4) {
    justify-self: center;
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
  font-weight: 400;
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
