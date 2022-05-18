import styled from "styled-components"
import { Flex, device, GradientBorder } from "theme"

export const Container = styled(Flex)`
  width: 100%;
  padding: 16px 16px 80px;
  flex-direction: column;
  justify-content: flex-start;
  overflow-y: auto;
  height: calc(100vh - 94px);

  @media all and (display-mode: standalone) {
    height: calc(100vh - 115px);
  }
`

export const TabContainer = styled(Flex)`
  position: relative;
  width: 100%;
  justify-content: space-evenly;
  height: 40px;

  @media only screen and (${device.xxs}) {
    height: 34px;
  }

  &:after {
    content: "";
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
    width: 100%;
    height: 1px;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }
`

export const Tab = styled(Flex)<{ active?: boolean }>`
  height: 40px;
  position: relative;
  font-family: Gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 130%;
  text-align: center;
  color: ${(props) => (props.active ? "#C5D1DC" : "#5a6071")};
  @media only screen and (${device.xxs}) {
    font-size: 12px;
  }
`

export const TabCard = styled(GradientBorder)`
  margin-bottom: 16px;
  margin-top: 24px;
  padding: 0 0 6px;
  position: relative;
  border-radius: 16px;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;

  &:after {
    background: #181e2c;
  }
`

export const Row = styled(Flex)`
  width: 100%;
  padding: 0 16px 13px;
`

export const MainText = styled.div`
  font-family: Gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 130%;
  color: #c5d1dc;
  @media only screen and (${device.xxs}) {
    font-size: 12px;
  }
`

export const MainValue = styled.div`
  font-family: Gilroy;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 130%;
  text-align: right;

  color: #9ae2cb;
`

export const SecondaryText = styled(MainText)`
  color: #5a6071;
`

export const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  grid-gap: 16px;
  padding-top: 16px;
  width: 100%;
`

export const ChartPeriods = styled(Flex)`
  justify-content: space-around;
  width: 100%;
  padding: 15px 0;
`

export const Period = styled.div<{ active?: boolean }>`
  font-family: Gilroy;
  font-style: normal;
  font-weight: normal;
  padding: 4px 11px 2px;
  font-size: 12px;
  line-height: 130%;
  @media only screen and (${device.xxs}) {
    font-size: 10px;
  }

  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 1px;

  /* Text / gray */

  color: ${(props) => (props.active ? "#000000" : "#5a607180")};
  font-weight: ${(props) => (props.active ? 600 : 400)};
  background: ${(props) =>
    props.active
      ? "linear-gradient(64.44deg, #63b49b 12.29%, #a4ebd4 76.64%)"
      : "translate"};
  border-radius: 6px;
`
