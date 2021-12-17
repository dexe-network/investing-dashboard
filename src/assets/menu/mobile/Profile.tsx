import * as React from "react"
import { motion } from "framer-motion"

interface Props {
  active: boolean
}

const Profile: React.FC<Props> = ({ active }) => {
  return (
    <svg width={24} height={24} fill="none">
      <g
        filter="url(#prefix__filter0_d_18_6161)"
        clipPath="url(#prefix__clip0_18_6161)"
      >
        <motion.path
          d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0zm6.698 19.404C18.034 17.431 16.198 16 14 16h-4c-2.198 0-4.032 1.432-4.696 3.405C3.281 17.574 2 14.937 2 12 2 6.486 6.486 2 12 2s10 4.486 10 10c0 2.936-1.28 5.573-3.302 7.404z"
          fill={active ? "url(#prefix__paint0_linear_18_6165)" : "#C2C3C4"}
        />
        <motion.path
          d="M12 5a4 4 0 00-4 4v1a4 4 0 008 0V9a4 4 0 00-4-4z"
          fill={active ? "url(#prefix__paint0_linear_18_6165)" : "#C4C4C4"}
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
        <clipPath id="prefix__clip0_18_6161">
          <path fill="#fff" d="M0 0h24v24H0z" />
        </clipPath>
        <filter
          id="prefix__filter0_d_18_6161"
          x={-4}
          y={0}
          width={32}
          height={32}
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
            result="effect1_dropShadow_18_6161"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_18_6161"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  )
}

const MemoProfile = React.memo(Profile)
export default MemoProfile
