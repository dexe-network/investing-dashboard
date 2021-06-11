import * as React from "react"

interface IProps {
  size?: number
}

function DexeIcon(props: IProps) {
  return (
    <svg
      width={38}
      height={38}
      transform={`scale(${props.size ? props.size / 38 : 1})`}
    >
      <defs>
        <filter
          id="prefix__b"
          x={-16.985}
          y={6.205}
          width={57.7}
          height={50.408}
          filterUnits="userSpaceOnUse"
        >
          <feOffset dy={3} />
          <feGaussianBlur stdDeviation={3} result="blur" />
          <feFlood floodOpacity={0.102} />
          <feComposite operator="in" in2="blur" />
          <feComposite in="SourceGraphic" />
        </filter>
        <filter
          id="prefix__d"
          x={-9.571}
          y={-14.142}
          width={64.59}
          height={59.003}
          filterUnits="userSpaceOnUse"
        >
          <feOffset dy={3} />
          <feGaussianBlur stdDeviation={3} result="blur-2" />
          <feFlood floodOpacity={0.161} />
          <feComposite operator="in" in2="blur-2" />
          <feComposite in="SourceGraphic" />
        </filter>
        <radialGradient
          id="prefix__c"
          cx={0.5}
          cy={0.5}
          r={0.5}
          gradientUnits="objectBoundingBox"
        >
          <stop offset={0} stopColor="#a3a3a3" />
          <stop offset={1} stopColor="#777" />
        </radialGradient>
        <clipPath id="prefix__a">
          <rect
            data-name="Rectangle 5951"
            width={38}
            height={38}
            rx={19}
            transform="translate(14.153 309.396)"
            fill="none"
          />
        </clipPath>
      </defs>
      <g
        data-name="Mask Group 9"
        transform="translate(-14.153 -309.396)"
        clipPath="url(#prefix__a)"
      >
        <path
          data-name="Rectangle 5950"
          fill="none"
          d="M14.153 309.396h38v38h-38z"
        />
        <g data-name="Group 11369">
          <g filter="url(#prefix__b)" transform="matrix(1 0 0 1 14.154 309.4)">
            <path
              data-name="Path 10384"
              d="M9.284 0a10.462 10.462 0 0010.851 6.409 10.552 10.552 0 005.157-2.089l9.64 2.653a19.409 19.409 0 01-14.789 8.4A19.309 19.309 0 015.461 9.955 19.413 19.413 0 010 .094z"
              transform="matrix(.87 .5 -.5 .87 .51 12.95)"
              stroke="rgba(0,0,0,0)"
              fill="url(#prefix__c)"
            />
          </g>
          <g filter="url(#prefix__d)" transform="matrix(1 0 0 1 14.154 309.4)">
            <path
              data-name="Path 10385"
              d="M9.067 17.949L.471 13.124a22.267 22.267 0 011.646-3.683A19.155 19.155 0 0114.033.3a19.507 19.507 0 0115.034 2.145 19.435 19.435 0 016.722 26.328 21.199 21.199 0 01-2.221 3.121zm3.074-6.819l17.132 9.913a10.418 10.418 0 00-.795-6.409 10.476 10.476 0 00-16.337-3.504z"
              fill="#7fffd4"
              stroke="rgba(0,0,0,0)"
              strokeWidth={1.00344}
            />
          </g>
        </g>
      </g>
    </svg>
  )
}

const MemoDexeIcon = React.memo(DexeIcon)
export default MemoDexeIcon
