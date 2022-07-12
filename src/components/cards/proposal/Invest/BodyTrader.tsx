import { FC } from "react"

import { BodyItem } from "./styled"

interface Props {
  maxSizeLP: string
  apr: string
  expirationDate: string
}

const BodyTrader: FC<Props> = ({ maxSizeLP, apr, expirationDate }) => {
  return (
    <>
      <BodyItem label="Supply" amount={"90k"} symbol={"1/JBR"} />
      <BodyItem label="Your size" amount={"47k"} symbol={"1/JBR"} />
      <BodyItem label="Max Size" amount={maxSizeLP} symbol={"1/JBR"} />
      <BodyItem label="APR" amount={`${apr} %`} />
      <BodyItem label="Total dividends" amount={"~999k"} symbol={"USDT"} />
      <BodyItem label="Dividends avail." amount={"~88k"} symbol={"USDT"} />
      <BodyItem label="Investors" amount={"999/"} symbol={"1000"} />
      <BodyItem label="Price OTC" amount={"-"} />
      <BodyItem label="Expiration date" amount={expirationDate} fz="11px" />
    </>
  )
}

export default BodyTrader
