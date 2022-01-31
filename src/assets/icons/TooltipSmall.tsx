import * as React from "react"

function TooltipSmall() {
  return (
    <svg width={16} height={17} fill="none">
      <g opacity={0.2}>
        <path
          d="M8.35 15.41c3.683 0 6.667-3.01 6.667-6.723 0-3.712-2.984-6.722-6.666-6.722-3.682 0-6.667 3.01-6.667 6.722 0 3.713 2.985 6.722 6.667 6.722z"
          stroke="#5A6071"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.42 11.447v-2.69"
          stroke="#5A6071"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <ellipse cx={8.421} cy={6.211} rx={0.842} ry={0.849} fill="#5A6071" />
      </g>
    </svg>
  )
}

const MemoTooltipSmall = React.memo(TooltipSmall)
export default MemoTooltipSmall
