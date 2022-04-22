import Confirm from "components/Confirm"
import { FC } from "react"
import { SpinnerCircularFixed } from "spinners-react"

import { Text } from "./styled"

const Payload: FC<{
  isOpen: boolean
  toggle: () => void
}> = ({ isOpen, toggle }) => {
  return (
    <Confirm isOpen={isOpen} toggle={toggle} title="Waiting">
      <SpinnerCircularFixed
        size={100}
        style={{
          height: 100,
          paddingTop: 38,
        }}
        thickness={46}
        speed={78}
        color="#8DEED3"
        secondaryColor="#0D1320"
      />
      <Text>Open your wallet and sign transactions</Text>
    </Confirm>
  )
}

export default Payload
