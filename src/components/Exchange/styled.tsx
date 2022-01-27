import styled from "styled-components"
import { Flex, Text } from "theme"

export const FromContainer = styled(Flex)`
  padding: 16px 16px 16px 16px;
  border-radius: 6px 6px 0px 0px;
  background: linear-gradient(64.44deg, #24272f 32.35%, #2c313c 100%);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
`

export const ToContainer = styled(Flex)`
  padding: 16px 16px 16px 16px;
  border-radius: 0px 0px 6px 6px;
  background: linear-gradient(64.44deg, #24272f 32.35%, #2c313c 100%);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
`

export const InfoContainer = styled(Flex)`
  width: 100%;
  padding-bottom: 11px;
`

export const IconDown = styled.img``

export const Price = styled(Text)`
  font-family: Gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  user-select: none;
  color: #596073;
`
export const Balance = styled(Flex)`
  font-family: Gilroy;
  font-style: normal;
  font-family: Gilroy;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;

  display: flex;
  align-items: center;
  text-align: right;
  user-select: none;
  ${Text} {
    padding: 0 2px;
  }
`

export const Tokens = styled.span`
  font-family: Gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  text-align: right;
  letter-spacing: 0.5px;
  color: #596073;
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
  cursor: pointer;
  font-family: Gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  user-select: none;
  color: #0066c2;
`

export const Input = styled.input`
  font-family: Gilroy;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;

  /* Text / main */

  color: #c5d1dc;
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
  padding: 3px 9px 3px 3px;
  background: linear-gradient(64.44deg, #24272f 32.35%, #2c313c 100%);
  box-shadow: inset -44px 7px 11px rgba(0, 0, 0, 0.03);
  border-radius: 19px;
`

export const SymbolLabel = styled.span`
  font-family: Gilroy;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin-right: 10px;

  color: #c5d1dc;
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
  font-family: Gilroy;
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  color: #6c757d;
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
  font-size: 14px;
  line-height: 130%;
  /* or 18px */

  display: flex;
  align-items: center;
  cursor: pointer;
`
