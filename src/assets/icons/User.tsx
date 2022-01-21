import * as React from "react"
import { IconProps } from "constants/types"
import { motion } from "framer-motion"

const User: React.FC<IconProps> = ({ active }) => {
  return (
    <svg width={21} height={24} fill="none">
      <motion.path
        initial={active ? "active" : "default"}
        animate={active ? "active" : "default"}
        variants={{
          active: {
            fill: "#9AE2CB",
          },
          default: {
            fill: "#5A6071",
          },
        }}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.97 8.968a3.956 3.956 0 01-3.97 3.97 3.956 3.956 0 01-3.97-3.97A3.955 3.955 0 0110 5a3.955 3.955 0 013.97 3.968zM10 20c-3.253 0-6-.529-6-2.569s2.764-2.55 6-2.55c3.254 0 6 .528 6 2.568C16 19.49 13.236 20 10 20z"
      />
    </svg>
  )
}

const MemoUser = React.memo(User)
export default MemoUser
