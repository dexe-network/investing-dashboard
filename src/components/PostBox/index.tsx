// import React, { useState, useRef } from "react"
// import { motion } from "framer-motion"
import styled from "styled-components"
import { Flex } from "theme"
import { Orientation } from "constants/types"
import staple from "assets/icons/staple.svg"

const StyledPostBox = styled(Flex)``

const Textarea = styled.textarea`
  width: 100%;
  height: 50px;
  border: none;
  border-radius: 15px;
  background: #242832;
  border: none;
  overflow: auto;
  outline: none;
  transition: height 0.3s ease-in-out;

  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;

  resize: none;
  font-size: 16px;
  color: #999999;
  padding: 18px 15px 0;

  &:focus {
    height: 100px;
  }
`

const PostButton = styled.div`
  color: #7fffd4;
  font-size: 22px;
  font-family: "Gilroy-Bold";
font-weight: 700;;
  padding: 17px 27px 14px;
  cursor: pointer;
  transition: background, color 0.3s ease-in-out;
  border-radius: 7px;
  user-select: none;

  &:hover {
    background: rgba(127, 255, 212, 0.1);
    color: #2d2d2d;
  }
`

const Staple = styled.img`
  height: 23px;
  width: 20px;
  display: block;
  opacity: 0.5;
`

const PostBox: React.FC = () => {
  return (
    <StyledPostBox dir={Orientation.vertical} full>
      <Textarea placeholder="Share your thoughts, predictions..." />
      <Flex p="15px 0 0" full>
        <Staple src={staple} />
        <PostButton>Send</PostButton>
      </Flex>
    </StyledPostBox>
  )
}

export default PostBox
