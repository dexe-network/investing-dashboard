import * as React from "react"

const LockedIcon: React.FC<{ active?: boolean }> = (props) => {
  return (
    <svg width={14} height={18} fill="none" transform="translate(9, -2)">
      <path
        d="M11.375 6.125h-7v-1.75c0-.7.263-1.313.787-1.837 1.05-1.05 2.713-1.05 3.676 0 .35.35.525.787.7 1.225.087.437.612.7 1.05.612.437-.088.787-.612.612-1.05-.175-.788-.612-1.488-1.137-2.013C9.274.438 8.136 0 7 0a4.333 4.333 0 00-4.375 4.375v1.75C1.137 6.125 0 7.263 0 8.75v6.125C0 16.363 1.137 17.5 2.625 17.5h8.75c1.488 0 2.625-1.137 2.625-2.625V8.75c0-1.487-1.137-2.625-2.625-2.625z"
        fill={
          props.active
            ? "url(#lock-gradient-active)"
            : "url(#lock-gradient-default)"
        }
      />
      <defs>
        <linearGradient
          id="lock-gradient-default"
          x1={7}
          y1={0}
          x2={7}
          y2={17.5}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#5A6071" />
          <stop offset={1} stopColor="#434C5F" />
        </linearGradient>
        <linearGradient
          id="lock-gradient-active"
          x1={7}
          y1={0}
          x2={7}
          y2={17.5}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" />
          <stop offset={1} stopColor="#fff" />
        </linearGradient>
      </defs>
    </svg>
  )
}

const MemoLockedIcon = React.memo(LockedIcon)
export default MemoLockedIcon
