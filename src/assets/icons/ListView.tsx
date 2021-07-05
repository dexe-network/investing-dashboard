import * as React from "react"

function ListView(props) {
  return (
    <svg width={12} height={12.004}>
      <g>
        <g>
          <path
            d="M0 2.401a2.452 2.452 0 012.5-2.4 2.531 2.531 0 012 .96h6.06a1.44 1.44 0 010 2.88H4.5a2.531 2.531 0 01-2 .96 2.452 2.452 0 01-2.5-2.4z"
            fill={props.fill}
          />
        </g>
        <g>
          <path
            d="M0 9.601a2.452 2.452 0 012.5-2.4 2.53 2.53 0 012 .96h6.06a1.441 1.441 0 010 2.881H4.5a2.53 2.53 0 01-2 .96A2.452 2.452 0 010 9.601z"
            fill={props.fill}
          />
        </g>
      </g>
    </svg>
  )
}

const MemoListView = React.memo(ListView)
export default MemoListView
