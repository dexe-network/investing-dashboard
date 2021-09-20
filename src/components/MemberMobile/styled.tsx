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
  bottom: -2px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: #35344b;
  padding: 5px 7px 3px 7px;
  border-radius: 10px 0 10px 0;
  width: 91px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  color: #7fffd4;
  font-size: 12px;
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
  padding-left: 35px;
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
    background: linear-gradient(
      262deg,
      rgba(51, 62, 64, 1) 0%,
      rgba(128, 128, 128, 1) 100%
    );
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
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
      0deg,
      rgba(51, 62, 64, 1) 0%,
      rgba(79, 81, 85, 1) 100%
    );
    border-bottom-right-radius: 5px;
    opacity: 0.5;
    z-index: 3;
    box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.2);
  }
`

export const Ticker = styled(Text)`
  font-size: 22px;
  font-weight: bold;
  color: #c2c3c4;
  margin-right: 20px;
`

export const Price = styled(Text)`
  font-size: 22px;
  color: #c2c3c4;
  margin-right: 3px;
`

export const Pnl = styled(Text)`
  font-size: 12px;
  color: #7fffd4;
  transform: translateY(3px);
`

export const Tile = styled(Flex)`
  flex-direction: column;
  width: 100%;
  position: relative;
`

export const Value = styled(Text)`
  color: #ffffff;
  font-size: 22px;
  font-weight: bold;
  height: 28px;
`

export const Label = styled(Text)`
  color: #c2c3c4;
  font-size: 15px;
`

export const CopiersCounter = styled(Text)`
  color: #7fffd4;
  font-weight: bold;
  font-size: 12px;
  margin-right: 5px;
`

export const CopiersLabel = styled(Text)`
  color: #999999;
  font-weight: 800;
  font-size: 12px;
`

export const CopiersPnl = styled(Text)`
  color: #7fffd4;
  font-weight: 400;
  font-size: 12px;
  opacity: 0.5;
  margin-left: 3px;
`
