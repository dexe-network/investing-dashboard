import { motion } from "framer-motion"
import { device, Flex, BaseButton } from "theme"
import styled from "styled-components"

export const StyledBar = styled(motion.div)`
  touch-action: none;
  user-select: none;
  width: 100%;
  background: #1e212a;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);

  @media only screen and (${device.sm}) {
    justify-content: space-between;
    padding: 0 10px;
  }
`

export const SearchOverlay = styled(Flex)`
  position: absolute;
  top: 79px;
  right: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  margin: auto;
  z-index: 25;
  opacity: 0.1;
`

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

export const TitleMenu = styled(Flex)`
  width: 100%;
  height: 45px;
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

export const overlayVariants = {
  visible: {
    opacity: 1,
    display: "flex",
  },
  hidden: {
    display: "none",
    opacity: 0,
  },
}

export const FormLabel = styled.div`
  font-family: Gilroy;
  font-style: normal;
  font-family: Gilroy;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #c4c4c4;
  margin-bottom: 10px;
  &:nth-of-type(3) {
    margin-top: 36px;
  }
`

export const FiltersBody = styled(Flex)`
  padding: 20px 16px;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`

export const FilterContainer = styled.div`
  width: 100%;
  border-radius: 6px;
  overflow: auto;
`

export const FilterSelectableItem = styled.div<{ active?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 40px;
  font-family: Gilroy;
  font-style: normal;
  font-family: Gilroy;
  font-weight: 400;
  font-size: 12px;
  line-height: 200%;
  padding: 7px 10px 8px 16px;
  color: ${(props) => (props.active ? "#fff" : "#c2c3c4")};
  // box-shadow: 0px 7px 4px rgba(0, 0, 0, 0.07);
`
