import styled from "styled-components"
import { Flex, Text, BaseButton, device } from "theme"

export const Card = styled(Flex)`
  height: 112px;
  padding: 0;
  margin-bottom: 15px;
`

export const BuyButton = styled(BaseButton)`
  color: #47bef9;
  background-color: none;
  background: none;
  border: none;
  font-size: 13px;
  font-weight: bold;
`

export const ChartContainer = styled(Flex)`
  position: relative;
`

export const Chart = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: fill-available;
  height: 47px;
  opacity: 0.5;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding: 0 15px;
`

export const AvatarContainer = styled.div`
  height: 112px;
  width: 112px;
  z-index: 5;
  border-radius: 150px;
  position: relative;
`

export const Wrapper = styled(Flex)`
  flex-direction: column;
  align-items: flex-start;
`

export const TraderName = styled.div`
  cursor: pointer;
  position: absolute;
  bottom: -9px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background: linear-gradient(64.44deg, #24282d 32.35%, #3a393f 100%);
  border-radius: 4px;
  padding: 5px 7px 3px 7px;
  width: 134px;
  height: 27px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-family: Gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  color: #7fffd4;
  text-align: center;
  box-shadow: 0px 3px 7px rgba(0, 0, 0, 0.3);
  z-index: 25;

  @media only screen and (${device.xs}) {
    font-size: 15px;
    width: 100%;
  }
`

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 45px;
  width: 100%;
  height: 96px;
  z-index: 1;
  position: relative;

  > * {
    z-index: 4;
    position: relative;
  }

  &:before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: linear-gradient(64.44deg, #24282d 32.35%, #3a393f 100%);
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    opacity: 0.5;
    z-index: 2;
    box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.2);
  }

  &:after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 38px;
    bottom: 0;
    background: linear-gradient(
      244.44deg,
      rgba(250, 250, 250, 0.1) 0%,
      rgba(0, 0, 0, 0.04) 67.65%
    );
    border-bottom-right-radius: 10px;
    opacity: 0.5;
    z-index: 3;
    box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.2);
  }
`

export const Ticker = styled(Text)`
  font-family: Gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 41px;
  /* identical to box height, or 205% */

  display: flex;
  align-items: center;
  text-align: center;

  /* Main Color */

  color: #c2c3c4;
  margin-right: 20px;
`

export const Price = styled(Text)`
  font-family: Gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 41px;
  color: #c2c3c4;
  margin-right: 3px;
`

export const Pnl = styled(Text)`
  font-family: Gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;

  color: #9ae2cb;
  transform: translateY(2px);
`

export const Tile = styled(Flex)`
  flex-direction: column;
  width: 100%;
  position: relative;
`

export const Value = styled(Text)`
  color: #f7f7f7;
  font-family: Gilroy;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 32px;
`

export const Label = styled(Text)`
  font-family: Gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #5a6071;
`

export const CopiersCounter = styled(Text)`
  color: #9ae2cb;
  font-family: Gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 15px;
  margin-right: 5px;
`

export const CopiersLabel = styled(Text)`
  font-family: Gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #c2c3c4;
`

export const CopiersPnl = styled(Text)`
  font-family: Gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;

  display: flex;
  align-items: center;
  text-align: center;

  color: #7fffd4;

  opacity: 0.5;
  margin-left: 3px;
`
