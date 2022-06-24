import * as React from "react"

function LockedIcon(props) {
  return (
    <svg width={19} height={19} fill="none" {...props}>
      <path
        d="M12.938 6.813V5.438A3.404 3.404 0 009.5 2a3.404 3.404 0 00-3.438 3.438v1.375C4.894 6.813 4 7.705 4 8.874v4.813c0 1.168.894 2.062 2.063 2.062h6.875c1.168 0 2.062-.894 2.062-2.063V8.875c0-1.169-.894-2.063-2.063-2.063zm-5.5-1.375c0-1.17.893-2.063 2.062-2.063 1.169 0 2.063.894 2.063 2.063v1.375H7.436V5.438z"
        fill="#788AB4"
      />
    </svg>
  )
}

const MemoLockedIcon = React.memo(LockedIcon)
export default MemoLockedIcon
