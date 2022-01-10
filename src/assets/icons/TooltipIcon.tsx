import React from "react"

function TooltipIcon() {
  return (
    <svg width={29} height={31} fill="none">
      <g opacity={0.8}>
        <g filter="url(#prefix__filter0_b_20_8287)">
          <path
            d="M7.545 15.233a7.5 7.5 0 1115 0 7.5 7.5 0 01-15 0z"
            stroke="#FEFEFE"
            strokeWidth={2}
          />
        </g>
        <path
          d="M14.57 12.84a.862.862 0 01-.878-.859.863.863 0 01.246-.619.845.845 0 01.613-.271.82.82 0 01.62.257.844.844 0 01.27.612.845.845 0 01-.257.62.839.839 0 01-.613.26zm.783 6.151l-1.42.017-.06-5.5 1.42-.017.06 5.5z"
          fill="#fff"
        />
      </g>
      <defs>
        <filter
          id="prefix__filter0_b_20_8287"
          x={2.545}
          y={2.733}
          width={25}
          height={25}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImage" stdDeviation={2} />
          <feComposite
            in2="SourceAlpha"
            operator="in"
            result="effect1_backgroundBlur_20_8287"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_backgroundBlur_20_8287"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  )
}

const MemoTooltipIcon = React.memo(TooltipIcon)
export default MemoTooltipIcon
