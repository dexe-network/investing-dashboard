import { FC, memo } from "react"

interface Props {
  active: boolean
}

const Wallet: FC<Props> = ({ active }) => {
  return (
    <svg width={29} height={28} fill="none">
      <rect
        x={3.875}
        y={7}
        width={22}
        height={15}
        rx={2}
        stroke={active ? "#9AE2CB" : "#616D8B"}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.875 12h22M8.917 17.5h2.333"
        stroke={active ? "#9AE2CB" : "#616D8B"}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const MemoWallet = memo(Wallet)
export default MemoWallet
