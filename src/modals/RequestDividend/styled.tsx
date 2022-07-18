import styled from "styled-components"
import { Flex } from "theme"

export const Tile = styled(Flex)`
  height: 60px;
  width: 100%;
  box-sizing: border-box;
  gap: 8px;
  padding: 0 16px;
  background: linear-gradient(
    85.11deg,
    rgba(255, 255, 255, 0.005) 0.73%,
    rgba(188, 215, 255, 0.03) 101.29%
  );

  & > div {
    &:nth-child(2) {
      flex: 1 1;
    }
  }
`

export const Body = styled(Flex)`
  flex-direction: column;
  gap: 12px;
  width: 100%;
  padding: 16px 16px 20px;
  box-sizing: border-box;
`

export const TextContainer = styled(Flex)`
  flex-direction: column;
`

export const TextWhite = styled.div`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: 1px;

  color: #e4f2ff;
`

export const TextGray = styled.div`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 15px;

  color: #788ab4;
`
