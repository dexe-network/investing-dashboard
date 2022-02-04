import styled from "styled-components"
import { Text, BaseButton, Flex } from "theme"

export const HeadContainer = styled.div`
  touch-action: none;
  user-select: none;
  height: 50px;
  width: 100%;
  background: #1e212a;
  padding: 0 12px;

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const Title = styled(Text)`
  color: #f5f5f5;
  font-size: 24px;
  font-family: Gilroy;
  font-weight: 700;
  text-align: center;
`

export const FloatingButton = styled(BaseButton)<{
  position: "left" | "right"
}>`
  height: 44px;
  position: absolute;
  ${(props) => props.position}: 7px;
  top: 5px;
  background: none;
  background-color: transparent;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

export const FloatingLabel = styled(Text)`
  font-family: Gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 130%;
  color: #5a6071;
  padding: 0 8px;
`

export const Menu = styled(Flex)`
  transform: translateY(2px);
  justify-content: space-between;
`

export const MenuItem = styled.div<{ active: boolean }>`
  position: relative;
  font-family: Gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 130%;
  color: ${(props) => (props.active ? "#C5D1DC" : "#5a6071")};
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:after {
    content: "";
    position: absolute;
    bottom: 5px;
    left: -1px;
    right: 0;
    width: 70px;
    height: 2px;
    background: linear-gradient(64.44deg, #63b49b 12.29%, #a4ebd4 76.64%);
    box-shadow: 0px 1px 4px rgba(164, 235, 212, 0.29),
      0px 2px 5px rgba(164, 235, 212, 0.14);
    border-radius: 2px 2px 0px 0px;
    opacity: ${(props) => (props.active ? 1 : 0)};
  }
`

export const IconPencil = styled.img`
  margin-right: 10px;
`

export const FundWrapper = styled.div`
  width: 26px;
  height: 26px;
  border-radius: 50px;
  border: px solid #363f4e80;
  position: absolute;
`

export const Funds = styled(Flex)`
  padding: 0 45px 0 0px;
  position: relative;

  & > ${FundWrapper}:nth-child(1) {
    right: 0;
  }
  & > ${FundWrapper}:nth-child(2) {
    right: 10px;
  }
`
