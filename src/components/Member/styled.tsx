import { BaseButton, device, Flex, Text } from "theme"
import styled from "styled-components"

import { motion } from "framer-motion"

export const MemberCard = styled(motion.div)`
  position: relative;
  background: rgb(41, 49, 52);
  background: linear-gradient(
    204deg,
    rgba(41, 49, 52, 1) -10%,
    rgba(53, 52, 75, 1) 100%
  );
  border-radius: 10px;
  height: fit-content;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 8px 4px;
  margin: 20px 15px 0 0;
  transition: transform 0.3s;
  max-width: 100%;

  @media only screen and (${device.sm}) {
    flex-direction: column;
    padding: 10px 0 0;
  }
`

export const MemberBase = styled(Flex)`
  height: 66px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

export const StatisticsContainer = styled(Flex)`
  padding: 15px 12px 15px 20px;
  flex-direction: column;
  align-items: flex-start;
  flex: none;
`

export const StatisticsTitle = styled(Text)`
  color: #dddddd;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 15px;
`

const Label = styled(Text)`
  color: #9b9b9d;
  font-size: 14px;
`

const Value = styled(Text)`
  font-size: 16px;
  font-weight: bold;
  color: #9b9b9d;
  text-align: right;
`

const StatItemContainer = styled(Flex)`
  border-bottom: 1px solid #323c3f;
`

export const StatisticsItem = ({ label, children }) => {
  return (
    <StatItemContainer full jc="space-between" p="7px 0 6px " ai="center">
      <Label>{label}</Label>
      <Value>{children}</Value>
    </StatItemContainer>
  )
}

export const AvatarContainer = styled.div`
  height: 64px;
  width: 64px;
  position: relative;
`

export const Rank = styled.div`
  position: absolute;
  bottom: 0px;
  right: -5px;
  color: #f5f5f5;
  font-weight: bold;
  font-size: 16px;
`

export const FloatingText = styled.span`
  position: absolute;
  top: -15px;
  font-size: 14px;
  color: #999999;
`

export const Copiers = styled.span`
  font-size: 14px;
  font-weight: bold;
  color: #7fffd4;
  margin-left: 10px;
`

export const MiddleContent = styled(Flex)``

type alignType = "left" | "center" | "right"

export const TextBig = styled.div<{ color?: string; align?: alignType }>`
  font-size: 22px;
  font-weight: bold;
  height: 22px;
  line-height: 22px;
  transform: translateY(1px);

  color: ${(props) => (props.color ? props.color : "#f5f5f5")};
  text-align: ${(props) => (props.align ? props.align : "left")};
`

export const TextSmall = styled.div<{ color?: string; align?: string }>`
  font-size: 14px;
  font-weight: 300;

  color: ${(props) => (props.color ? props.color : "#f5f5f5")};
  text-align: ${(props) => (props.align ? props.align : "left")};
`

export const Row = styled.div<{ m?: number; minW?: number }>`
  display: flex;

  margin: 0 ${(props) => (props.m ? props.m : 0)}px;
  min-width: ${(props) => (props.minW ? props.minW : 0)}px;
`
export const DetailedChart = styled(Row)`
  width: 219px;
`

export const Col = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`

export const PoolInfo = styled(Col)`
  padding: 0 20px 0 15px;
`

// TODO: inherit from base button
export const Button = styled(BaseButton)<{ secondary?: boolean }>`
  width: 100%;
  margin: 1px;
  border-radius: 7px;
  color: ${(props) => (props.secondary ? "#B2B2B2" : "#000000")};
  font-size: 16px;
  font-weight: bold;
  text-align: center;

  height: 31px;
  padding: 0 22px;

  background: ${(props) =>
    props.secondary
      ? "#21272A"
      : "linear-gradient(90deg,rgba(127, 255, 212, 0.75) 0%,rgba(38, 128, 235, 0.75) 100%)"};

  &:hover {
    background: ${(props) =>
      props.secondary
        ? "#21272A"
        : "linear-gradient(90deg,rgba(127, 255, 212, 0.75) 0%,rgba(38, 128, 235, 0.75) 100%)"};
  }
  &:focus {
    background: ${(props) =>
      props.secondary
        ? "#21272A"
        : "linear-gradient(90deg,rgba(127, 255, 212, 0.75) 0%,rgba(38, 128, 235, 0.75) 100%)"};
    outline: 0px solid transparent;
  }
`

export const BarChartWrapper = styled(Row)`
  @media only screen and (${device.lg}) {
    display: none;
  }
`

export const Fee = styled(Col)`
  @media only screen and (${device.sm}) {
    display: none;
  }
`

export const ButtonGroup = styled(Col)`
  @media only screen and (${device.sm}) {
    width: 100%;
  }
`

export const FundsLimitGroup = styled(Col)`
  @media only screen and (${device.md}) {
    display: none;
  }
`

export const PnlGroup = styled(Col)`
  @media only screen and (${device.sm}) {
    display: none;
  }
`

export const ChartContainer = styled(Flex)`
  max-width: calc(100vw - 366px);
  width: 100%;
`

export const FundContainer = styled.div`
  padding-left: 10px;
  height: 15px;
`
