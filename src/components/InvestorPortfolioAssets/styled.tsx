import styled from "styled-components"
import { Flex } from "theme"

export const Container = styled(Flex)`
  position: relative;
  height: 95px;
  width: 100%;
  background: linear-gradient(
    263deg,
    rgba(51, 62, 64, 0.5) 0%,
    rgba(128, 128, 128, 0.5) 100%
  );
  border-radius: 5px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const NumberOfAssets = styled.div`
  font-size: 70px;
  color: #969696;
  height: 70px;
  font-family: "Gilroy-Bold";
font-weight: 700;;
`

export const Label = styled.div`
  color: #c2c3c4;
  font-size: 13px;
`

export const AssetsContainer = styled.div`
  position: absolute;
  height: 32px;
  width: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const ProfitableAssets = styled(AssetsContainer)`
  left: 15px;
  right: 0;
  top: 23px;
`
export const LoosableAssets = styled(AssetsContainer)`
  right: 15px;
  top: 23px;
`

export const Item = styled(Flex)`
  width: 100%;
  justify-content: space-between;
`

export const Ticker = styled.div`
  color: #f7f7f7;
  font-size: 14px;
`

export const Price = styled.div<{ type: "positive" | "negative" }>`
  font-size: 14px;
  font-family: "Gilroy-Medium";
font-weight: 500;
  color: ${(props) => (props.type === "positive" ? "#7FFFD4" : "#FF7F7F")};
`
