// import React, { useState, useRef } from "react"

import { motion } from "framer-motion"
import styled from "styled-components"
import { ease, Text, LinkIcon, device } from "theme"

import { shortenAddress } from "utils"

import { opacityVariants } from "motion/variants"
import star from "assets/icons/star.svg"
import Avatar from "components/Avatar"

interface Props {
  pinned: boolean
  url: string
  name: string
}

const containerVariants = {
  hidden: {
    y: 0,
  },
  visible: {
    y: 50,
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

  @media only screen and (${device.sm}) {
    left: 10px;
    top: ${(props) => (props?.pinned ? "50px" : "8px")};
  }
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 10px;
`

const Main = styled.div`
  height: 35px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const TextCentered = styled(Text)`
  display: flex;
  align-items: center;
`

const TextTop = styled(Text)`
  display: flex;
  align-items: flex-start;
`

const AddressButton = styled.div`
  color: #999999;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: #7fffd4;
  }
`

const Star = styled.img`
  height: 12px;
  width: 12px;
  margin-left: 4px;
  opacity: 0.7;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    opacity: 0.9;
  }
`

const ProfileAvatar: React.FC<Props> = (props) => {
  return (
    <StyledAvatar
      animate={props.pinned ? "hidden" : "visible"}
      variants={containerVariants}
      pinned={props.pinned}
      transition={{ ease, duration: 0.3 }}
    >
      <Avatar url={props.url} size={props.pinned ? 41 : 60} />
      <Info>
        <Main>
          <TextTop color="#F5F5F5">
            {props.name}
            <Star src={star} />
          </TextTop>
          <TextCentered>
            <AddressButton>
              {shortenAddress("0x3196d7ea7fd55001f4d26d9fbc83d8b0dbf08d21")}
            </AddressButton>
            <LinkIcon side="right" />
          </TextCentered>
        </Main>
        <Text
          transition={{ ease, duration: 0.3 }}
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
