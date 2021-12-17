import styled from "styled-components"
import { device } from "theme"
import { motion } from "framer-motion"

export const StyledTopMembers = styled(motion.div)`
  padding: 0;
  height: 100%;
`

export const MembersList = styled.div`
  width: 100%;
  padding: 10px 0 30px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  @media only screen and (${device.sm}) {
    padding: 15px 20px 30px 20px;
  }
`

export const MembersGrid = styled.div`
  width: 100%;
  overflow: auto;
`

export const ListContainer = styled(motion.div)`
  padding: 0 0 0 20px;
  overflow-y: hidden;
  touch-action: none;
  overscroll-behavior: none;

  @media only screen and (${device.sm}) {
    padding: 0;
  }
`
