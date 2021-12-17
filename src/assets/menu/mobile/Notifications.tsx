import React from "react"
import { motion } from "framer-motion"

interface Props {
  active: boolean
}

const Notifications: React.FC<Props> = ({ active }) => {
  return (
    <svg width={25} height={27} fill="none">
      <g filter="url(#prefix__filter0_d_18_6155)">
        <motion.path
          d="M18.682 7.727V6.182a6.182 6.182 0 10-12.364 0v1.545a3.432 3.432 0 01-1.195 2.468A3.232 3.232 0 004 12.364c0 1.931 3.177 3.09 8.5 3.09s8.5-1.159 8.5-3.09a3.232 3.232 0 00-1.123-2.17 3.432 3.432 0 01-1.195-2.467z"
          fill={active ? "url(#prefix__paint0_linear_18_6165)" : "#D0C9D6"}
        />
        <motion.path
          d="M9.598 16.619a3.042 3.042 0 005.804 0 39.45 39.45 0 01-2.902.101c-1.028 0-1.994-.032-2.902-.101z"
          fill={active ? "url(#prefix__paint0_linear_18_6165)" : "#ECEBED"}
        />
      </g>
      <defs>
        <linearGradient
          id="prefix__paint0_linear_18_6165"
          x1={32}
          y1={0}
          x2={13.294}
          y2={13.185}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#63B49B" />
          <stop offset={1} stopColor="#A4EBD4" />
        </linearGradient>
        <filter
          id="prefix__filter0_d_18_6155"
          x={0}
          y={0}
          width={25}
          height={26.75}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy={4} />
          <feGaussianBlur stdDeviation={2} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_18_6155"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_18_6155"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  )
}

const MemoNotifications = React.memo(Notifications)
export default MemoNotifications
