import * as React from "react"
import { IconProps } from "constants/types"
import { motion } from "framer-motion"

const LimitInvest: React.FC<IconProps> = ({ active }) => {
  return (
    <svg width={26} height={24} fill="none">
      <g clipPath="url(#prefix__clip0_6_13115)">
        <motion.path
          initial={active ? "active" : "default"}
          animate={active ? "active" : "default"}
          variants={{
            active: {
              fill: "url(#active)",
            },
            default: {
              fill: "url(#default)",
            },
          }}
          d="M22.587 8.609a4.799 4.799 0 00-1.56-1.193A4.271 4.271 0 0019.188 7c-1.286-.003-2.522.575-3.437 1.609l-2.25 2.483-2.25-2.482c-.674-.769-1.531-1.292-2.465-1.504a4.257 4.257 0 00-2.78.314c-.879.417-1.63 1.122-2.159 2.026a6.073 6.073 0 00-.81 3.055c0 1.088.282 2.15.81 3.055.529.904 1.28 1.61 2.16 2.026.878.416 1.846.526 2.78.314.933-.212 1.79-.735 2.463-1.504l2.25-2.562 2.251 2.562c.446.522.977.938 1.564 1.224a4.312 4.312 0 001.856.441 4.302 4.302 0 001.86-.41 4.832 4.832 0 001.58-1.197 5.622 5.622 0 001.054-1.8 6.204 6.204 0 00.366-2.126 6.202 6.202 0 00-.378-2.122 5.615 5.615 0 00-1.065-1.793zm-12.574 6.374c-.58.657-1.364 1.026-2.181 1.026S6.23 15.64 5.65 14.983c-.567-.663-.883-1.555-.878-2.483.005-.928.331-1.816.906-2.47.575-.655 1.353-1.023 2.165-1.026.812-.002 1.591.363 2.17 1.014l2.174 2.474-2.174 2.491zm11.336 0c-.58.658-1.363 1.027-2.18 1.027-.817 0-1.601-.37-2.181-1.027l-2.176-2.49 2.176-2.476c.58-.657 1.364-1.026 2.18-1.026.817 0 1.601.369 2.181 1.026.286.326.513.713.668 1.139.154.426.234.882.234 1.343 0 .462-.08.918-.234 1.344a3.579 3.579 0 01-.668 1.14z"
        />
      </g>
      <rect
        x={1}
        y={18.455}
        width={26.708}
        height={4}
        rx={2}
        transform="rotate(-32.768 1 18.455)"
        fill={active ? "#9AE2CB" : "transparent"}
        stroke={active ? "#1B1F26" : "transparent"}
        strokeWidth={2}
      />
      <defs>
        <linearGradient
          id="default"
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
          id="active"
          x1={24.03}
          y1={7}
          x2={12.525}
          y2={17.449}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#63B49B" />
          <stop offset={1} stopColor="#A4EBD4" />
        </linearGradient>
        <clipPath id="prefix__clip0_6_13115">
          <path fill="#fff" transform="translate(3)" d="M0 0h21v24H0z" />
        </clipPath>
      </defs>
    </svg>
  )
}

const MemoLimitInvest = React.memo(LimitInvest)
export default MemoLimitInvest
