import * as React from "react"

function CardView(props) {
  return (
    <svg width={10} height={10}>
      <rect width={10} height={10} rx={2} fill={props.fill} />
    </svg>
  )
}

const MemoCardView = React.memo(CardView)
export default MemoCardView
