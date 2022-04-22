import { memo, FC } from "react"
import { IconProps } from "constants/types"
import { motion } from "framer-motion"

const MinInvestAmount: FC<IconProps> = ({ active }) => {
  return (
    <svg width={24} height={24} fill="none">
      <motion.path
        d="M20 20H5V5"
        initial={active ? "active" : "default"}
        animate={active ? "active" : "default"}
        variants={{
          active: {
            stroke: "#9AE2CB",
          },
          default: {
            stroke: "#616D8B",
          },
        }}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <motion.path
        d="M19 8l-6.222 7-3.111-4L5 16"
        initial={active ? "active" : "default"}
        animate={active ? "active" : "default"}
        variants={{
          active: {
            stroke: "#9AE2CB",
          },
          default: {
            stroke: "#616D8B",
          },
        }}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const MemoMinInvestAmount = memo(MinInvestAmount)
export default MemoMinInvestAmount
