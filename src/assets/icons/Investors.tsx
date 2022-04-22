import { FC, memo } from "react"
import { IconProps } from "constants/types"
import { motion } from "framer-motion"

const Investors: FC<IconProps> = ({ active }) => {
  return (
    <svg width={24} height={24} fill="none">
      <motion.path
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
        d="M7 20c0-1.657 2.239-3 5-3s5 1.343 5 3M18 14.25c1.766.462 3 1.52 3 2.75M6 14.25c-1.766.462-3 1.52-3 2.75M12 14a3 3 0 100-6 3 3 0 000 6zM18 10.236a3 3 0 10-4-4.472M6 10.236a3 3 0 014-4.472"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const MemoInvestors = memo(Investors)
export default MemoInvestors
