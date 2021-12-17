import * as React from "react"
import { motion } from "framer-motion"

interface Props {
  active: boolean
}

const TopTraders: React.FC<Props> = ({ active }) => {
  return (
    <svg width={32} height={30} fill="none">
      <g filter="url(#prefix__filter0_d_18_6150)">
        <motion.path
          d="M27.75 19.75H6.25V.25A.25.25 0 006 0H4.25A.25.25 0 004 .25v21.5c0 .137.112.25.25.25h23.5a.25.25 0 00.25-.25V20a.25.25 0 00-.25-.25zM9.556 14.928a.25.25 0 00.353 0l4.322-4.3 3.988 4.013a.25.25 0 00.353 0l8.606-8.604a.25.25 0 000-.353l-1.237-1.237a.25.25 0 00-.354 0L18.4 11.63l-3.981-4.006a.25.25 0 00-.353 0l-5.744 5.71a.25.25 0 000 .352l1.234 1.241z"
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
          id="prefix__filter0_d_18_6150"
          x={0}
          y={0}
          width={32}
          height={30}
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
            result="effect1_dropShadow_18_6150"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_18_6150"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  )
}

const MemoTopTraders = React.memo(TopTraders)
export default MemoTopTraders
