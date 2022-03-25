import styled from "styled-components"
import { Flex, Text, GradientBorder } from "theme"

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

export const Icon = styled.img``

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
    color: #ffffff7e;
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
