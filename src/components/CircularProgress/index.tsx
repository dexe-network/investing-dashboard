import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Container } from "./styled"

const INTERVAL = 10

const pathVariants = {
  hidden: {
    pathLength: 0,
  },
  visible: {
    pathLength: 1,
    transition: {
      duration: INTERVAL,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
}

const CircularProgress = () => {
  return (
    <Container>
      <svg viewBox="0 0 24 24">
        <motion.path
          initial="hidden"
          animate="visible"
          variants={pathVariants}
          fill="none"
          strokeWidth="2"
          stroke="#666F87"
          strokeLinecap="round"
          d="M5 12C5 13.8565 5.7375 15.637 7.05025 16.9497C8.36301 18.2625 10.1435 19 12 19C13.8565 19 15.637 18.2625 16.9497 16.9497C18.2625 15.637 19 13.8565 19 12C19 10.1435 18.2625 8.36301 16.9497 7.05025C15.637 5.7375 13.8565 5 12 5C10.1435 5 8.36301 5.7375 7.05025 7.05025C5.7375 8.36301 5 10.1435 5 12"
          style={{
            rotate: 90,
            scale: 0.9,
            scaleX: -1,
          }}
        />
      </svg>
    </Container>
  )
}

export default CircularProgress
