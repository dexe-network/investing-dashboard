import { RingSpinner } from "react-spinners-kit"

import { Loader } from "./styled"

interface IProps {
  size?: number
  m?: string
}

const IconLoader: React.FC<IProps> = ({ size, m }) => {
  return (
    <Loader m={m || "0 8px 0 0"} size={size}>
      <RingSpinner color="#A4EBD4" size={20} />
    </Loader>
  )
}

export default IconLoader
