import * as React from "react"

function PlusGreenFilled({ fill = "#7fffd4", onClick = () => {} }) {
  return (
    <svg onClick={onClick} width={28} height={28}>
      <path
        d="M14 27.999a13.91 13.91 0 01-9.9-4.1 13.909 13.909 0 01-4.1-9.9 13.912 13.912 0 014.1-9.9 13.91 13.91 0 019.9-4.1 13.91 13.91 0 019.9 4.1 13.912 13.912 0 014.1 9.9 13.909 13.909 0 01-4.1 9.9 13.91 13.91 0 01-9.9 4.1zm-1.019-13.113v4h1.906v-4h4v-1.909h-4V8.999h-1.906v3.979H9v1.909z"
        fill={fill}
      />
    </svg>
  )
}

const MemoPlusGreenFilled = React.memo(PlusGreenFilled)
export default MemoPlusGreenFilled
