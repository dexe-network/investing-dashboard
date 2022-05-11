import styled from "styled-components"
import { GradientBorder, Flex } from "theme"

export const Overlay = styled(Flex)`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  margin: auto;
  z-index: 25;
  opacity: 0.1;
`

export const Container = styled(GradientBorder)`
  flex-direction: column;
  justify-content: flex-start;
  position: absolute;
  top: 37px;
  left: 37px;
  z-index: 100;
  width: 312px;
  height: fit-content;
  box-shadow: 10px 13px 19px #0a1420;
  border-radius: 15px;
`

export const Header = styled(Flex)`
  height: 44px;
  width: 100%;
  padding: 0 16px;
  box-sizing: border-box;
  position: relative;

  &:after {
    content: "";
    height: 1px;
    width: 100%;
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    background: linear-gradient(302.71deg, #2f3d52 0%, #1b2431 60.89%);
  }
`

export const Title = styled.div`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 100%;
  color: #e4f2ff;
`

export const Cancel = styled.button`
  outline: none;
  appearance: none;
  border: none;
  background: none;
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  text-align: right;
  color: #616d8b;
`

export const Item = styled(Flex)<{ active?: boolean }>`
  width: 100%;
  height: 41px;
  padding: 0 12px 0 16px;
  box-sizing: border-box;
  background: ${({ active }) =>
    active
      ? "linear-gradient(266.2deg, rgba(169, 221, 251, 0) 2.35%, rgba(193, 218, 255, 0.04) 96.05%)"
      : "transparent"};
`

export const Label = styled.div<{ active?: boolean }>`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 200%;
  letter-spacing: 0.03em;
  color: ${({ active }) => (active ? "#E4F2FF" : "#616d8b")};
`
