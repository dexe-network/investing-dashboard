import { FC } from "react"

import { BodyItem } from "./styled"

interface Props {}

const BodyTrader: FC<Props> = () => {
  return (
    <>
      <BodyItem label="Supply" amount={"90k"} symbol={"1/JBR"} />
      <BodyItem label="Your size" amount={"47k"} symbol={"1/JBR"} />
      <BodyItem label="Max Size" amount={"100k"} symbol={"1/JBR"} />
      <BodyItem label="APR" amount={"10.02 %"} />
      <BodyItem label="Total dividends" amount={"~999k"} symbol={"USDT"} />
      <BodyItem label="Dividends avail." amount={"~88k"} symbol={"USDT"} />
      <BodyItem label="Investors" amount={"999/"} symbol={"1000"} />
      <BodyItem label="Price OTC" amount={"-"} />
      <BodyItem
        label="Expiration date"
        amount={"JUN 20,2022  20:00"}
        fz="11px"
      />
    </>
  )
}

export default BodyTrader
