import * as React from "react"

function Withdraw(props) {
  return (
    <svg transform="translate(3, 0)" width={16} height={16} fill="none">
      <path
        d="M5.333 10.666l5.334-5.333M6.667 5.333h4v4"
        stroke={props.active ? "#9AE2CB" : "#616D8B"}
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const MemoWithdraw = React.memo(Withdraw)
export default MemoWithdraw
