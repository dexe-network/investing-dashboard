import { motion } from "framer-motion"
import { device, Flex, BaseButton } from "theme"
import styled from "styled-components"

export const StyledBar = styled(motion.div)`
  touch-action: none;
  user-select: none;
  height: 50px;
  width: 100%;
  background: #1e212a;

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);

  @media only screen and (${device.sm}) {
    justify-content: space-between;
    padding: 0 10px;
  }
`

export const ClickableArea = styled(BaseButton)`
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const TopMenu = styled(Flex)`
  width: 100%;
  margin-bottom: 5px;
`
export const BottomMenu = styled(Flex)`
  width: 100%;
  overflow-x: scroll;
`

export const Tabs = styled(Flex)``

export const Tab = styled(ClickableArea)<{ active?: boolean }>`
  font-family: Gilroy;
  font-style: normal;
  font-family: Gilroy;
font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  /* or 18px */

  display: flex;
  align-items: flex-end;
  color: ${(props) => (props.active ? "#9AE2CB" : "#5A6071")};

  &:nth-child(2) {
    padding-left: 30px;
  }
`

export const Icons = styled(Flex)``

export const IconButton = styled.img`
  margin: 0 3px;
`

export const Badge = styled.div<{ active?: boolean }>`
  background: ${(props) =>
    props.active
      ? "linear-gradient(244.44deg, #63b49b 0%, #a4ebd4 67.65%)"
      : "transparent"};
  border-radius: 4px;
  height: 24px;
  padding: 0 12px;
  color: ${(props) => (props.active ? "#272A31" : "#5A6071")};
  display: flex;
  align-items: center;
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
  background: ${(props) =>
    props.active
      ? " linear-gradient(244.44deg, #63B49B 0%, #A4EBD4 67.65%)"
      : "#33363f"};
  font-family: Gilroy;
  font-style: normal;
  font-family: Gilroy;
font-weight: 400;
  font-size: 12px;
  line-height: 200%;
  padding: 7px 10px 8px 16px;
  color: ${(props) => (props.active ? "#24272D" : "#c2c3c4")};
  box-shadow: 0px 7px 4px rgba(0, 0, 0, 0.07);
`
