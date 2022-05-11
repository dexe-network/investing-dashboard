import { Flex, BaseButton } from "theme"
import styled from "styled-components"

export const Title = styled(Flex)`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 32px;
  text-align: center;
  letter-spacing: -0.02em;
  color: #e4f2ff;
`

export const ClickableArea = styled(BaseButton)`
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 24px;
  min-width: 24px;
`

export const TabsMenu = styled(Flex)`
  width: 100%;
  height: 34px;
`

export const Tabs = styled(Flex)`
  width: 100%;
  padding: 0 10px;
  position: relative;
  justify-content: space-around;
  height: 34px;

  &:before {
    position: absolute;
    top: 0;
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

export const Tab = styled(ClickableArea)<{ active?: boolean }>`
  font-family: Gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 100%;

  text-align: center;
  letter-spacing: 0.5px;

  display: flex;
  align-items: flex-end;
  position: relative;
  color: ${(props) => (props.active ? "#C5D1DC" : "#838ba3")};

  &:after {
    opacity: ${(props) => (props.active ? "1" : "0")};
    content: "";
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
    background: linear-gradient(64.44deg, #63b49b 12.29%, #a4ebd4 76.64%);
    box-shadow: 0px 1px 4px rgba(164, 235, 212, 0.29),
      0px 2px 5px rgba(164, 235, 212, 0.14);
    border-radius: 2px 2px 0px 0px;
    height: 2px;
    width: 100%;
  }
`

export const Icons = styled(Flex)`
  width: 70px;

  &:first-child {
    justify-content: flex-start;
  }
  &:last-child {
    justify-content: flex-end;
  }
`

export const IconButton = styled.img`
  margin: 0 3px;
`

export const tabsVariants = {
  visible: {
    opacity: 1,
    transition: { delay: 0.2 },
  },
  hidden: {
    opacity: 0,
  },
}
