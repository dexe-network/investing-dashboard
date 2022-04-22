import styled from "styled-components"
import { Flex, BasicCard } from "theme"

// TOKEN ITEM

export const TokenContainer = styled(Flex)`
  width: fill-available;
  height: 50px;
  justify-content: flex-start;
  padding: 0 16px;
  transition: background 0.2s ease-in-out;
  &:hover {
    background: linear-gradient(
      264.39deg,
      rgba(255, 255, 255, 0) -58.22%,
      rgba(255, 255, 255, 0.04) 116.91%
    );
  }
`

export const TokenInfo = styled(Flex)`
  flex-direction: column;
  flex: 1;
  align-items: flex-start;
`

export const Symbol = styled.div`
  overflow: hidden;
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: 0.0168em;
  font-feature-settings: "tnum" on, "lnum" on;
  color: #ffffff;
  text-align: left;
`

export const Name = styled.div`
  overflow: hidden;
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 142%;
  letter-spacing: 0.03em;
  font-feature-settings: "tnum" on, "lnum" on;
  color: #5a6071;
  text-align: left;
`

export const BalanceInfo = styled(Flex)`
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
`

export const TokenBalance = styled.div`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 142%;
  text-align: right;
  letter-spacing: 0.0168em;
  font-feature-settings: "tnum" on, "lnum" on;
  color: #ffffff;
`

export const TokenPrice = styled.div`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 130%;
  text-align: right;
  letter-spacing: 0.03em;
  color: #e4f2ff;
`

// TOKENS CARD

export const Card = styled(Flex)`
  width: 100%;
  flex-direction: column;
`

export const CardHeader = styled(Flex)`
  flex-direction: column;
  width: fill-available;
  padding: 0 16px 24px;
  justify-content: flex-start;
  position: relative;

  &:before {
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
    width: 100%;
    content: "";
    height: 1px;
    background: radial-gradient(
          54.8% 53% at 50% 50%,
          #587eb7 0%,
          rgba(88, 126, 183, 0) 100%
        )
        /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */,
      radial-gradient(
          60% 51.57% at 50% 50%,
          #6d99db 0%,
          rgba(109, 153, 219, 0) 100%
        )
        /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */,
      radial-gradient(
          69.43% 69.43% at 50% 50%,
          rgba(5, 5, 5, 0.5) 0%,
          rgba(82, 82, 82, 0) 100%
        )
        /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
    opacity: 0.1;
  }
`

export const CardList = styled.div`
  width: 100%;
  height: calc(100vh - 400px);
  overflow-y: auto;
  padding: 10px 0 0;
`
