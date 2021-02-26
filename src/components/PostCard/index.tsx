// import React, { useState, useRef } from "react"
// import styled from "styled-components"
// import { motion } from "framer-motion"
import { Flex } from "theme"
import {
  StyledPost,
  PostDescription,
  PostBottomText,
} from "pages/Profile/styled"

import { IPost } from "constants/interfaces"

const PostCard: React.FC<{ data: IPost; border?: boolean }> = (props) => {
  const { description, comments, created_at } = props.data

  return (
    <StyledPost border={props.border}>
      <PostDescription>{description.substr(0, 150)}</PostDescription>

      <Flex full>
        <PostBottomText>Comments: {comments.length}</PostBottomText>
        <PostBottomText>{created_at}</PostBottomText>
      </Flex>
    </StyledPost>
  )
}

export default PostCard
