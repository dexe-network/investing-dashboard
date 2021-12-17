import React, { useState, useRef } from "react"
import styled from "styled-components"
import { motion } from "framer-motion"
import { useScroll } from "react-use"
import { SpiralSpinner } from "react-spinners-kit"

import loadMore from "assets/icons/swipe-arrow-down.svg"

const LoadMoreIcon = styled(motion.div)`
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 40px auto;
  z-index: 100;
  height: 50px;
`

const LoadMore: React.FC<{
  r: any
  isLoading: boolean
  handleMore: () => void
}> = ({ r, isLoading, handleMore }) => {
  const { y } = useScroll(r)
  const scrollableDistance = r?.current?.scrollHeight - r?.current?.clientHeight

  const getAnimation = () => {
    // const isBottom = scrollableDistance - y <= 0
    if (scrollableDistance - y <= -100) {
      handleMore()
    }
    if (scrollableDistance - y <= -50) {
      return "visible2x"
    }
    if (scrollableDistance - y <= -30 || isLoading) {
      return "visible"
    }

    return "hidden"
  }

  return (
    <LoadMoreIcon
      variants={{
        hidden: { opacity: 0, y: -30, scale: 0 },
        visible: { opacity: 1, y: -20, scale: 1 },
        visible2x: { opacity: 1, y: 0, scale: 1.1 },
      }}
      animate={getAnimation()}
    >
      {isLoading ? (
        <SpiralSpinner size={30} loading />
      ) : (
        <img src={loadMore} alt="looad more" />
      )}
    </LoadMoreIcon>
  )
}

export default LoadMore
