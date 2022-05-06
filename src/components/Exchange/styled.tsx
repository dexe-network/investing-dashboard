import styled from "styled-components"
import { motion } from "framer-motion"
import { Flex, Text, GradientBorder, BasicCard } from "theme"

export const FromContainer = styled(GradientBorder)`
  padding: 16px 16px 16px 16px;
  border-radius: 15px;
  width: 100%;
`

export const ToContainer = styled(GradientBorder)`
  padding: 16px 16px 16px 16px;
  border-radius: 15px;
  width: 100%;
`

export const InfoContainer = styled(Flex)`
  width: 100%;
  padding-bottom: 11px;
`

export const Price = styled(Text)`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 10px;
  letter-spacing: 0.3px;
  color: #666f87;
  user-select: none;
`
export const Balance = styled(Flex)`
  display: flex;
  align-items: center;
  text-align: right;
  user-select: none;
`

export const Tokens = styled.span`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 10px;
  text-align: right;
  letter-spacing: 0.3px;
  color: #666f87;
  margin-right: 3px;
`

export const Symbol = styled.span`
  font-family: Gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  text-align: right;
  letter-spacing: 0.5px;
  color: #596073;
  padding-left: 5px;
`

export const Max = styled(Text)`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 10px;
  text-align: right;
  letter-spacing: 0.3px;
  color: #2680eb;
`

export const Input = styled.input`
  font-family: Gilroy;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  color: #e4f2ff;
  outline: none;
  background: transparent;
  border: none;
  padding: 5px 0 0;
  width: 100%;

  &::placeholder {
    color: #e4f2ff;
    font-size: 20px;
    line-height: 20px;
  }
`

export const ActiveSymbol = styled(GradientBorder)`
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
  padding: 5px 9px 5px 5px;
  min-height: 37px;
  background: linear-gradient(
    85.11deg,
    rgba(255, 255, 255, 0.005) 0.73%,
    rgba(188, 215, 255, 0.03) 101.29%
  );
  box-shadow: inset -44px 7px 11px rgba(0, 0, 0, 0.03);
  border-radius: 19px;
  margin-top: 13px;
`

export const SymbolLabel = styled.span`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 15px;
  letter-spacing: 0.3px;
  color: #e4f2ff;
  margin-right: 7px;
  white-space: nowrap;
  margin-top: 4px;
`

export const SelectToken = styled(SymbolLabel)`
  margin-left: 8px;
  transform: translateY(-2px);
`

export const Unlock = styled.div`
  background: linear-gradient(
    270deg,
    rgba(51, 62, 64, 1) 0%,
    rgba(79, 81, 85, 1) 100%
  );
  height: 46px;
  width: 46px;
  border-radius: 14px;
  box-shadow: 0px 0px 7px #ff7f7f;
  margin-left: 14px;
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Label = styled(Text)`
  font-family: Gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 100%;
  color: #5a6071;
`

export const Value = styled(Text)`
  font-family: Gilroy;
  font-style: normal;
  font-family: Gilroy;
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  color: #5a6071;
`

export const PriceText = styled(Text)`
  font-family: Gilroy;
  font-style: normal;
  font-family: Gilroy;
  font-weight: 400;
  font-size: 12px;
  line-height: 100%;
  color: #b1b7c9;
`

// DIVIDER

export const DividerContainer = styled(Flex)`
  margin-top: 3px;
  margin-bottom: 3px;
  user-select: none;
  height: 24px;
  position: relative;
`

export const PercentButton = styled.div<{ active?: boolean }>`
  flex: 1;
  max-width: 70px;
  text-align: center;
  cursor: pointer;

  font-family: "Gilroy";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.5px;

  color: ${(props) => (props.active ? "#E4F2FF" : "#666f87")};

  border-radius: 3px;

  &:first-child {
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
  }

  &:last-child {
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
  }
`

export const SwapButton = styled.div`
  cursor: pointer;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Icon = styled(motion.img)``

// FORM CARD

export const Container = styled(Flex)`
  width: 100%;
  height: calc(100vh - 104px);
  padding: 16px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

export const Card = styled(BasicCard)`
  flex-direction: column;
  padding: 20px 16px;
  position: relative;
`

export const CardHeader = styled(Flex)`
  width: 100%;
  padding: 4px 0 24px;
`

export const Title = styled.div`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 16px;
  color: #e4f2ff;

  &:nth-child(2) {
    margin-left: 19px;
  }
`

export const IconsGroup = styled(Flex)`
  width: 152px;
`
