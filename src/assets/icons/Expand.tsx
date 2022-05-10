import * as React from "react"

function Expand(props) {
  return (
    <svg width={16} height={16} fill="none" {...props}>
      <path
        d="M6.667 12.666H3.333V9.333M9.333 3.333h3.334v3.333"
        stroke="#616D8B"
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const MemoExpand = React.memo(Expand)
export default MemoExpand
