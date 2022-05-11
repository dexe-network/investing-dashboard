import { FC, memo } from "react"

interface Props {
  direction: "asc" | "desc" | ""
}

const SortIcon: FC<Props> = ({ direction }) => {
  return (
    <svg width={24} height={24} fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.733 17.593a.648.648 0 00.727-.133l3-3a.65.65 0 10-.92-.92l-1.89 1.891v-7.43a.65.65 0 00-1.3 0v7.43l-1.89-1.89a.65.65 0 10-.92.919l2.997 2.996a.651.651 0 00.196.137z"
        fill={direction === "desc" ? "#9AE2CB" : "#34455F"}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.35 16a.65.65 0 001.3 0V8.57l1.89 1.89a.65.65 0 10.92-.92l-2.997-2.996a.648.648 0 00-.923-.003l-3 3a.65.65 0 00.92.919l1.89-1.89V16z"
        fill={direction === "asc" ? "#9AE2CB" : "#34455F"}
      />
    </svg>
  )
}

const MemoSortIcon = memo(SortIcon)
export default MemoSortIcon
