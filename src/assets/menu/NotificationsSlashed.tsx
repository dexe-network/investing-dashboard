import * as React from "react"

function NotificationsSlashed() {
  return (
    <svg width={31.236} height={24.989}>
      <path
        d="M30.934 22.358l-4.423-3.419a1.466 1.466 0 00.039-.2 1.524 1.524 0 00-.42-1.06c-.943-1.013-2.707-2.537-2.707-7.53a7.707 7.707 0 00-6.244-7.571V1.562a1.561 1.561 0 10-3.122 0v1.017a7.84 7.84 0 00-4.763 3.054L2.219.164A.781.781 0 001.123.3L.164 1.535a.781.781 0 00.135 1.096l28.717 22.193a.781.781 0 001.1-.137l.959-1.233a.781.781 0 00-.141-1.096zM7.674 12.277a8.288 8.288 0 01-2.568 5.405 1.525 1.525 0 00-.42 1.06A1.563 1.563 0 006.252 20.3h11.807zm7.944 12.712a3.123 3.123 0 003.122-3.124h-6.241a3.123 3.123 0 003.119 3.124z"
        fill="#f5f5f5"
      />
    </svg>
  )
}

const MemoNotificationsSlashed = React.memo(NotificationsSlashed)
export default MemoNotificationsSlashed
