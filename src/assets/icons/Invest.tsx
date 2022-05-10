import * as React from "react"

function Invest(props) {
  return (
    <svg transform="translate(4, 0)" width={16} height={16} fill="none">
      <path
        d="M10.667 5.333l-5.334 5.333M9.333 10.667h-4v-4"
        stroke={props.active ? "#9AE2CB" : "#616D8B"}
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const MemoInvest = React.memo(Invest)
export default MemoInvest
