import * as React from "react"

function ConnectIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={15.004} height={20.005} {...props}>
      <path
        d="M12.5 1.25a1.25 1.25 0 00-2.5 0V5h2.5zm1.875 5H.625A.625.625 0 000 6.877v1.25a.625.625 0 00.625.625h.625V10a6.254 6.254 0 005 6.126V20h2.5v-3.871a6.254 6.254 0 005-6.126V8.752h.625A.625.625 0 0015 8.127v-1.25a.625.625 0 00-.622-.626zM5 1.25a1.25 1.25 0 00-2.5 0V5H5z"
        fill="#fff"
        data-name="Group 11177"
      />
    </svg>
  )
}

const MemoConnectIcon = React.memo(ConnectIcon)
export default MemoConnectIcon
