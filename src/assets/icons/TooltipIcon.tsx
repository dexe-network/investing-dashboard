import React from "react"

function TooltipIcon() {
  return (
    <svg width={16} height={16} fill="none">
      <path
        d="M8.351 15.018a6.667 6.667 0 100-13.334 6.667 6.667 0 000 13.334zM8.42 11.088V8.42"
        stroke="#5A6071"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={8.421} cy={5.895} fill="#5A6071" r={0.842} />
    </svg>
  )
}

const MemoTooltipIcon = React.memo(TooltipIcon)
export default MemoTooltipIcon
