import { FC, memo } from "react"
import { IconProps } from "constants/types"
import { motion } from "framer-motion"

const Managers: FC<IconProps> = ({ active }) => {
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
        d="M16.286 15.572c1.997.624 3.428 2.307 3.428 4.286M4.286 19.858c0-2.367 2.302-4.286 5.143-4.286 2.84 0 5.142 1.919 5.142 4.286M14.571 13a3.429 3.429 0 100-6.857M9.428 13a3.429 3.429 0 100-6.857 3.429 3.429 0 000 6.857z"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const MemoManagers = memo(Managers)
export default MemoManagers
