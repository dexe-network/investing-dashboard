// import React, { useState, useRef } from "react"

import { motion } from "framer-motion"
import styled from "styled-components"
import { ease } from "theme"

import { shortenAddress } from "utils"

import link from "assets/icons/link.svg"

interface Props {
  pinned: boolean
  url: string
}

const containerVariants = {
  visible: {
    y: 0,
  },
  hidden: {
    y: 50,
  },
}

const opacityVariants = {
  visible: {
    opacity: 0,
    height: 0,
    transitionEnd: {
      display: "none",
    },
  },
  hidden: {
    opacity: 1,
    height: "fit-content",
    display: "flex",
  },
}

const StyledAvatar = styled(motion.div)<{ pinned?: boolean }>`
  position: absolute;
  top: 8px;
  left: 30px;
  height: 60px;
  width: 185px;
  display: flex;
  align-items: center;
  user-select: none;
`

const Avatar = styled.img<{ size: number }>`
  width: ${(props) => `${props.size}px`};
  height: ${(props) => `${props.size}px`};
  border-radius: 50px;
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 10px;
`

const Main = styled.div`
  height: 31px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Text = styled(motion.div)<{ color?: string }>`
  display: flex;
  font-size: 14px;
  color: ${(props) => (props.color ? props.color : "#999999")};
`

const TextIcon = styled.img`
  width: 15px;
  height: 15px;
  margin-left: 5px;
  transform: translateY(-2px);
`

const ProfileAvatar: React.FC<Props> = (props) => {
  return (
    <StyledAvatar
      animate={props.pinned ? "visible" : "hidden"}
      variants={containerVariants}
      pinned={props.pinned}
      transition={ease}
    >
      <Avatar src={props.url} size={props.pinned ? 41 : 60} />
      <Info>
        <Main>
          <Text color="#F5F5F5">Irvine Smith</Text>
          <Text>
            {shortenAddress("0x3196d7ea7fd55001f4d26d9fbc83d8b0dbf08d21")}
            <TextIcon src={link} />
          </Text>
        </Main>
        <Text
          transition={ease}
          key="text"
          initial="hidden"
          variants={opacityVariants}
        >
          % & White List
        </Text>
      </Info>
    </StyledAvatar>
  )
}

export default ProfileAvatar
