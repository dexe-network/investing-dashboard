import * as React from "react"
import { motion } from "framer-motion"

interface Props {
  active: boolean
}

const Wallet: React.FC<Props> = ({ active }) => {
  return (
    <svg width={36} height={27} fill="none">
      <g filter="url(#prefix__filter0_d_18_6165)">
        <motion.path
          d="M29.2 0H6.8C5.246 0 4.014 1.057 4.014 2.375L4 16.625C4 17.943 5.246 19 6.8 19h22.4c1.554 0 2.8-1.057 2.8-2.375V2.375C32 1.057 30.754 0 29.2 0zm0 16.625H6.8V9.5h22.4v7.125zm0-11.875H6.8V2.375h22.4V4.75z"
          fill={active ? "url(#prefix__paint0_linear_18_6165)" : "#C2C3C4"}
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
          id="prefix__filter0_d_18_6165"
          x={0}
          y={0}
          width={36}
          height={27}
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
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_18_6165"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_18_6165"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  )
}

const MemoWallet = React.memo(Wallet)
export default MemoWallet
