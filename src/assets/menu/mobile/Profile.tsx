import { FC, memo } from "react"

interface Props {
  active: boolean
}

const Profile: FC<Props> = ({ active }) => {
  return (
    <svg width={29} height={28} fill="none">
      <path
        d="M19.625 17c2.33.728 4 2.692 4 5M5.625 22c0-2.761 2.686-5 6-5s6 2.239 6 5M17.625 14a4 4 0 000-8M11.625 14a4 4 0 100-8 4 4 0 000 8z"
        stroke={active ? "#9AE2CB" : "#616D8B"}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const MemoProfile = memo(Profile)
export default MemoProfile
