import { FC, memo } from "react"

interface Props {
  onClick?: () => void
}

const AddFund: FC<Props> = ({ onClick }) => {
  return (
    <svg
      width={40}
      height={28}
      transform="translate(0 -2)"
      fill="none"
      onClick={onClick}
    >
      <g filter="url(#prefix__filter0_d_3165_97879)">
        <rect x={8} y={2} width={26} height={26} rx={9} fill="#212734" />
      </g>
      <path
        transform="translate(2 0)"
        d="M15.117 15.042c0 .321.26.582.582.582h2.713v2.714a.583.583 0 001.165 0v-2.714h2.714a.583.583 0 100-1.165h-2.714v-2.713a.583.583 0 00-1.165 0v2.713H15.7a.583.583 0 00-.582.583z"
        fill="#616D8B"
      />
      <defs>
        <filter
          id="prefix__filter0_d_3165_97879"
          x={0.5}
          y={0}
          width={37}
          height={37}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy={3.5} />
          <feGaussianBlur stdDeviation={2.75} />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.02 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_3165_97879"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_3165_97879"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  )
}

const MemoAddFund = memo(AddFund)
export default MemoAddFund
