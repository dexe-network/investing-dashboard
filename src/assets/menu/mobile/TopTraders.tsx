import { FC, memo } from "react"

interface Props {
  active: boolean
}

const TopTraders: FC<Props> = ({ active }) => {
  return (
    <svg width={29} height={28} fill="none">
      <path
        d="M23.375 22h-18V6"
        stroke={active ? "#9AE2CB" : "#616D8B"}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22.375 9l-6.222 7.875-3.111-4.5L8.375 18"
        stroke={active ? "#9AE2CB" : "#616D8B"}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const MemoTopTraders = memo(TopTraders)
export default MemoTopTraders
