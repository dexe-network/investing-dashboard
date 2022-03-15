import styled from "styled-components"
import { device, Flex } from "theme"

export const Container = styled(Flex)`
  flex-direction: column;
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
