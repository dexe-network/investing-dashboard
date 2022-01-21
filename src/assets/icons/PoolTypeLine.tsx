import * as React from "react"

interface Props {
  active: boolean
}

const PoolTypeLine: React.FC<Props> = ({ active }) => {
  return (
    <svg width={68} height={38} fill="none">
      <path
        d="M5.356 38.949s3.388-12.606 11.58-10.521c8.193 2.084 10.023 5.314 15.83 1.479 5.805-3.835 1.177-23.305 7.77-20.835 6.592 2.47 22.4 6.78 31.426-7.575"
        stroke={`url(${active ? "#active-line" : "#default-line"})`}
        strokeWidth={1.82}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="active-line"
          x1={71.833}
          y1={1}
          x2={60.586}
          y2={37.159}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#63B49B" />
          <stop offset={1} stopColor="#A4EBD4" stopOpacity={0.4} />
        </linearGradient>

        <linearGradient
          id="default-line"
          x1={67.833}
          y1={1}
          x2={56.586}
          y2={37.159}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#6C757D" stopOpacity={0.1} />
          <stop offset={1} stopColor="#E8E9ED" stopOpacity={0.05} />
        </linearGradient>
      </defs>
    </svg>
  )
}

const MemoPoolTypeLine = React.memo(PoolTypeLine)
export default MemoPoolTypeLine
