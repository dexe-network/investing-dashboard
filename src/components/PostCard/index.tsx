// import React, { useState, useRef } from "react"
// import styled from "styled-components"
// import { motion } from "framer-motion"
import { Flex } from "theme"

import { IPost } from "constants/interfaces"

const PostCard: React.FC<{ data: IPost; border?: boolean }> = (props) => {
  const { description, comments, created_at } = props.data

  return <div></div>
}

export default PostCard
