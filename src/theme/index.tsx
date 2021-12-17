import { Link } from "react-router-dom"
import styled from "styled-components"
import { motion } from "framer-motion"
import { createBreakpoint } from "react-use"

export const ease = [0.29, 0.98, 0.29, 1]

const breakpoints = {
  xs: 500,
  sm: 768,
  md: 1024,
  lg: 1280,
}

export const useBreakpoint = createBreakpoint(breakpoints)

const size = {
  xs: `${breakpoints.xs}px`,
  sm: `${breakpoints.sm}px`,
  md: `${breakpoints.md}px`,
  lg: `${breakpoints.lg}px`,
}

const device = {
  xs: `max-width: ${size.xs}`,
  sm: `max-width: ${size.sm}`,
  md: `max-width: ${size.md}`,
  lg: `max-width: ${size.lg}`,
}

export { size, device }

export default {
  textPrimary: "#FAFAFA",
  bgPrimary:
    "linear-gradient(243deg,rgba(41, 49, 52, 1) 0%,rgba(53, 52, 75, 1) 100%);",
  bgPrimaryHovered:
    "linear-gradient(203deg,rgba(41, 49, 52, 1) 0%,rgba(53, 52, 75, 0.9) 100%);",
  device,
  buttonGradients: {
    primary: "linear-gradient(90deg, #a4ebd4 0%, #63b49b 100%)",
    warn: "linear-gradient(90deg, #e87e7e 0%, #ac5c5c 100%)",
    disabled: "linear-gradient(90deg,#74797E 0%,#4A4343 100%)",
  },
}

export const chartColors = {
  pro: {
    stroke: "#48AA6E",
    bg: ["#2A4830", "#333347"],
  },
  default: {
    stroke: "#00C0FF",
    bg: ["#1F5281", "#2E313E"],
  },
}

export const rotateVariants = {
  visible: { rotate: 180 },
  hidden: { rotate: 0 },
}

export const To = styled(Link)`
  text-decoration: none;
  color: ${(props) => props.theme.textPrimary};
`

export const ExternalLink = styled.a`
  text-decoration: none;
  color: #007ff3;
`

export const BaseButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  border: none;
  cursor: pointer;
  user-select: none;
  background: none;

  // TODO: remove outdated animation, use only framer-motion package
  /* &:active {
    transform: scale(0.98);
  } */
  &:focus {
    outline: 0px solid transparent;
  }
`

export const Header = styled.div`
  display: flex;
  padding: 20px 0;
  width: fit-content;
  align-items: center;
  justify-content: space-around;
`

const LinkWrap = styled(Link)<{ c: string; fw: number }>`
  font-size: 16px;
  color: ${(props) => props.c};
  user-select: none;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  text-decoration: none;
  user-select: none;
  padding: 0 20px;

  font-weight: ${(props) => props.fw};

  @media only screen and (${device.md}) {
    font-size: 14px;
  }

  @media only screen and (${device.sm}) {
    padding: 0 10px;
  }
`

export const Tab = ({ children, active, to }) => (
  <LinkWrap c={active ? "#F5F5F5" : "#999999"} to={to} fw={active ? 800 : 300}>
    {children}
  </LinkWrap>
)

export const Flex = styled(motion.div)<{
  m?: string
  p?: string
  full?: boolean
  dir?: string
  ai?: string
  jc?: string
  op?: number
}>`
  width: ${(props) => (props.full ? "100%" : "fit-content")};
  flex-direction: ${(props) => (props.dir ? props.dir : "row")};
  display: flex;
  align-items: ${(props) => (props.ai ? props.ai : "center")};
  justify-content: ${(props) => (props.jc ? props.jc : "space-between")};
  margin: ${(props) => (props.m ? props.m : 0)};
  padding: ${(props) => (props.p ? props.p : 0)};
  opacity: ${(props) => (props.op ? props.op : 1)};
`

export const Block = styled(Flex)`
  position: relative;
  background: linear-gradient(
    270deg,
    rgba(51, 62, 64, 0.5) 0%,
    rgba(128, 128, 128, 0.5) 100%
  );
  border-radius: 5px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
  height: 95px;
  width: 100%;
  margin: 5px 0;
  justify-content: space-around;
`

export const External: React.FC<{
  href: string
  children: React.ReactChild
}> = ({ href, children }) => (
  <ExternalLink href={href} target="_blank" rel="noopener noreferrer">
    {children}
  </ExternalLink>
)

export const customStyles = {
  header: {
    style: {
      display: "none",
    },
  },
  headRow: {
    style: {
      minHeight: "26px",
      borderBottomWidth: "0px",
    },
  },
  rows: {
    style: {
      minHeight: "37px",
      fontSize: "14px",
      fontWeight: 300,
      color: "#F5F5F5",
    },
  },
  headCells: {
    style: {
      color: "#707070",
      fontFamily: "Gilroy",
      fontSize: "14px",
      fontWeight: 300,
    },
  },
  cells: {
    style: {
      paddingLeft: "16px",
      paddingRight: "0px",
    },
  },
}

export const customListStyles = customStyles
export const customTableStyles = {
  ...customStyles,
  rows: { style: { minHeight: "52px" } },
  headCells: { style: { fontWeight: 800 } },
}

export const Text = styled(motion.span)<{
  color?: string
  fz?: number
  fw?: number
  fs?: string
  align?: string
}>`
  font-size: ${(props) => (props?.fz ? `${props.fz}px` : "14px")};
  font-weight: ${(props) => (props?.fw ? props.fw : 400)};
  color: ${(props) => (props.color ? props.color : "#999999")};
  white-space: nowrap;
  text-align: ${(props) => (props?.align ? props.align : "left")};
  font-style: ${(props) => props.fs || "normal"};
`

export const TextIcon = styled.svg<{ side?: "left" | "right" }>`
  width: 15px;
  height: 15px;
  margin-left: ${(props) => (props?.side === "left" ? "0px" : "5px")};
  margin-right: ${(props) => (props?.side === "right" ? "0px" : "5px")};
  transform: translateY(-2px);
  cursor: pointer;
`

export const LinkIcon: React.FC<{
  side?: "left" | "right"
  fill?: string
}> = (props) => (
  <TextIcon side={props.side} viewBox="0 0 15.004 15.004">
    <path
      d="M12.66-2.873h-.938a.469.469,0,0,0-.469.469V.878H1.875V-8.5H6.1a.469.469,0,0,0,.469-.469v-.938a.469.469,0,0,0-.469-.469H1.407A1.407,1.407,0,0,0,0-8.968V1.347A1.407,1.407,0,0,0,1.407,2.754H11.722a1.407,1.407,0,0,0,1.407-1.407V-2.4A.469.469,0,0,0,12.66-2.873ZM14.3-12.25H10.55a.7.7,0,0,0-.5,1.2L11.1-10,3.956-2.862a.808.808,0,0,0-.207.5.808.808,0,0,0,.207.5L4.62-1.2a.808.808,0,0,0,.5.207.808.808,0,0,0,.5-.207l7.139-7.141L13.8-7.3A.7.7,0,0,0,15-7.8v-3.751A.7.7,0,0,0,14.3-12.25Z"
      transform="translate(0 12.25)"
      fill={props.fill ? props.fill : "#5c9b90"}
      opacity="0.996"
    />
  </TextIcon>
)

export const IconButton = styled.div`
  cursor: pointer;
  min-height: 32px;
  min-width: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
`

export const Center = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`
