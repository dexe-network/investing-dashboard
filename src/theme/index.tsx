import { Link } from "react-router-dom"
import styled from "styled-components"
import { motion } from "framer-motion"

export const ease = [0.29, 0.98, 0.29, 1]

export default {
  textPrimary: "#FAFAFA",
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

export const To = styled(Link)`
  text-decoration: none;
  color: ${(props) => props.theme.textPrimary};
`

export const ExternalLink = styled.a`
  text-decoration: none;
  color: ${(props) => props.theme.textPrimary};
`

export const BaseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  border: none;
  cursor: pointer;
  user-select: none;

  &:active {
    transform: scale(0.98);
  }
`

export const Flex = styled(motion.div)<{
  m?: string
  p?: string
  full?: boolean
  dir?: string
  ai?: string
  jc?: string
}>`
  width: ${(props) => (props.full ? "100%" : "fit-content")};
  flex-direction: ${(props) => (props.dir ? props.dir : "row")};
  display: flex;
  align-items: ${(props) => (props.ai ? props.ai : "center")};
  justify-content: ${(props) => (props.jc ? props.jc : "space-between")};
  margin: ${(props) => (props.m ? props.m : 0)};
  padding: ${(props) => (props.p ? props.p : 0)};
`

export const External: React.FC<{
  href: string
  children: React.ReactChild
}> = ({ href, children }) => (
  <ExternalLink href={href} target="_blank" rel="noopener noreferrer">
    {children}
  </ExternalLink>
)
