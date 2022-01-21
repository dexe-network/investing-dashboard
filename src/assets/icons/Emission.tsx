import * as React from "react"
import { IconProps } from "constants/types"
import { motion } from "framer-motion"

const Emission: React.FC<IconProps> = ({ active }) => {
  return (
    <svg width={24} height={24} fill="none">
      <motion.path
        initial={active ? "active" : "default"}
        animate={active ? "active" : "default"}
        variants={{
          active: {
            fill: "url(#active1)",
          },
          default: {
            fill: "url(#default1)",
          },
        }}
        d="M20.38 8.57l-1.23 1.85a8 8 0 01-.22 7.58H5.07A8 8 0 0115.58 6.85l1.85-1.23A10 10 0 003.35 19a2 2 0 001.72 1h13.85a2 2 0 001.74-1 10 10 0 00-.27-10.44l-.01.01z"
        fill="url(#default1)"
      />
      <motion.path
        initial={active ? "active" : "default"}
        animate={active ? "active" : "default"}
        variants={{
          active: {
            fill: "url(#active2)",
          },
          default: {
            fill: "url(#default2)",
          },
        }}
        d="M10.59 15.41a1.998 1.998 0 002.83 0l5.66-8.49-8.49 5.66a1.998 1.998 0 000 2.83z"
        fill="url(#default2)"
      />
      <defs>
        <linearGradient
          id="default1"
          x1={12.016}
          y1={4.038}
          x2={12.016}
          y2={20}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#5A6071" />
          <stop offset={1} stopColor="#434C5F" />
        </linearGradient>
        <linearGradient
          id="default2"
          x1={14.542}
          y1={6.92}
          x2={14.542}
          y2={15.997}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#5A6071" />
          <stop offset={1} stopColor="#434C5F" />
        </linearGradient>

        <linearGradient
          id="active1"
          x1="21.9994"
          y1="4.03796"
          x2="7.29568"
          y2="12.8355"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#63B49B" />
          <stop offset="1" stopColor="#A4EBD4" />
        </linearGradient>
        <linearGradient
          id="active2"
          x1="19.08"
          y1="6.91998"
          x2="11.6933"
          y2="10.453"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#63B49B" />
          <stop offset="1" stopColor="#A4EBD4" />
        </linearGradient>
      </defs>
    </svg>
  )
}

const MemoEmission = React.memo(Emission)
export default MemoEmission
