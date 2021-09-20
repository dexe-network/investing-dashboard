import styled from "styled-components"
import { Flex, Text } from "theme"

export const Container = styled(Flex)`
  padding: 15px;
  border-radius: 5px;
  background: linear-gradient(
    270deg,
    rgba(51, 62, 64, 0.75) 0%,
    rgba(128, 128, 128, 0.75) 120%
  );
  box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.2);
  width: 331px;
  /* position: relative; */
`

export const InfoContainer = styled(Flex)`
  width: 331px;
  padding-bottom: 11px;
`

export const Price = styled(Text)`
  color: #f7f7f7;
  user-select: none;
`
export const Balance = styled(Flex)`
  user-select: none;
  ${Text} {
    padding: 0 2px;
  }
`

export const Max = styled(Text)`
  cursor: pointer;
  color: #47bef9;
`

export const Input = styled.input`
  user-select: none;
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  outline: none;
  background: transparent;
  border: none;
  height: 20px;
  padding: 5px 0 0;
  width: 100%;

  &::placeholder {
    color: #ffffff7e;
    font-size: 20px;
    line-height: 20px;
  }
`

export const ActiveSymbol = styled.div`
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
  border-radius: 14px;
  padding: 3px 9px 3px 3px;
  box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.2);
  background: linear-gradient(
    270deg,
    rgba(51, 62, 64, 1) 0%,
    rgba(79, 81, 85, 1) 100%
  );
`

export const SymbolLabel = styled.span`
  font-size: 22px;
  height: 22px;
  color: #f5f5f5;
  margin-left: 7px;
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
  color: #999999;
  font-size: 16px;
`

export const TooltipIcon = styled.img`
  height: 15px;
  width: 15px;
`

export const PriceText = styled(Text)`
  height: 15px;
  font-size: 16px;
  margin-right: 9px;
  cursor: pointer;
`
