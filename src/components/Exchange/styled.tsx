import styled from "styled-components"
import { Flex, Text } from "theme"

export const FromContainer = styled(Flex)`
  padding: 12px 20px 5px 20px;
  background: linear-gradient(64.44deg, #282b31 32.35%, #373d47 100%);
  border-radius: 8px 8px 0px 0px;
  box-shadow: 0px -4px 12px rgba(0, 0, 0, 0.1);
  width: 331px;
`

export const ToContainer = styled(Flex)`
  padding: 12px 20px 5px 20px;
  background: linear-gradient(64.44deg, #282b31 32.35%, #373d47 100%);
  border-radius: 0px 0px 8px 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  width: 331px;
`

export const InfoContainer = styled(Flex)`
  width: 331px;
  padding-bottom: 11px;
`

export const IconDown = styled.img`
  margin-left: 10px;
`

export const Price = styled(Text)`
  font-family: Gilroy;
  font-style: normal;
  font-family: "Gilroy-Regular";
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: #6c757d;
  user-select: none;
`
export const Balance = styled(Flex)`
  font-family: Gilroy;
  font-style: normal;
  font-family: "Gilroy-Regular";
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

export const Max = styled(Text)`
  cursor: pointer;
  color: #00caff;
  font-family: "Gilroy-Heavy";
  font-weight: 800; ;
`

export const Input = styled.input`
  user-select: none;
  font-family: Gilroy;
  font-style: normal;
  font-family: "Gilroy-Regular";
  font-weight: 400;
  font-size: 22px;
  line-height: 41px;
  color: #424b55;
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
  background: linear-gradient(64.44deg, #24282d 32.35%, #2e323a 100%);
  /* Dropshadow 3 */

  -webkit-box-shadow: inset 1px 2px 4px 4px rgb(0, 0, 0, 0.1);
  box-shadow: inset 1px 2px 4px 4px rgb(0, 0, 0, 0.1);
  border-radius: 16px;
`

export const SymbolLabel = styled.span`
  font-family: Gilroy;
  font-style: normal;
  font-family: "Gilroy-Regular";
  font-weight: 400;
  font-size: 20px;
  line-height: 20px;
  color: #f7f7f7;
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
  font-family: "Gilroy-Regular";
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  color: #6c757d;
`

export const Value = styled(Text)`
  font-family: Gilroy;
  font-style: normal;
  font-family: "Gilroy-Regular";
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  color: #5a6071;
`

export const PriceText = styled(Text)`
  font-family: Gilroy;
  font-style: normal;
  font-family: "Gilroy-Regular";
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  /* or 18px */

  display: flex;
  align-items: center;
  cursor: pointer;
`
