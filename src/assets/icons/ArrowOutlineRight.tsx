import { SVGProps, FC, memo } from "react"

interface IProps extends SVGProps<SVGSVGElement> {
  color?: string
}
const ArrowOutlineRight: FC<IProps> = ({ color, ...rest }) => {
  return (
    <svg width="1em" height="1em" viewBox="0 0 5 8" fill="none" {...rest}>
      <path
        d="M3.335 4L.512 1.177a.69.69 0 01.976-.975l3.31 3.31a.69.69 0 010 .976l-3.31 3.31a.69.69 0 01-.976-.975L3.335 4z"
        fill={color ?? "#616D8B"}
      />
    </svg>
  )
}

const MemoArrowOutlineRight = memo(ArrowOutlineRight)
export default MemoArrowOutlineRight
