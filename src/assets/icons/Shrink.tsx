import { SVGProps, FC, memo } from "react"

interface IProps extends SVGProps<SVGSVGElement> {
  active?: boolean
}

const Shrink: FC<IProps> = ({ active = false, ...rest }) => {
  return (
    <svg width={17} height={16} fill="none" {...rest}>
      <path
        d="M3.833 9.333h3.334v3.333M13.167 6.666H9.833V3.333"
        stroke={active ? "#9AE2CB" : "#616D8B"}
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const MemoShrink = memo(Shrink)
export default MemoShrink
