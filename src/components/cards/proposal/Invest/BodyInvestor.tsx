import { FC } from "react"

import Button from "components/Button"
import { BodyItem } from "./styled"

interface Props {
  invested: boolean
  apr: string
  expirationDate: string
}

const BodyInvestor: FC<Props> = ({ invested, apr, expirationDate }) => {
  return (
    <>
      {invested ? (
        <>
          <BodyItem label="Proposal size" amount={"40"} symbol={"1/JBR"} />
          <BodyItem label="Fulness" amount={"90%"} />
          <BodyItem label="Expiration date" amount={expirationDate} fz="11px" />
          <BodyItem label="Custodian" amount={"-"} />
          <BodyItem label="LP price" amount={"999,989"} symbol={"USDT"} />
          <div>
            <Button
              full
              size="small"
              br="10px"
              onClick={() => console.log("Stake LP")}
            >
              Stake LP
            </Button>
          </div>
        </>
      ) : (
        <>
          <BodyItem label="Supply" amount={"90k"} symbol={"1/JBR"} />
          <BodyItem label="Fulness" amount={"90%"} />
          <BodyItem label="Your balance" amount={"10"} symbol={"DEXE"} />
          <BodyItem label="APR" amount={`${apr} %`} />
          <BodyItem label="Total dividends" amount={"~999k"} symbol={"USD"} />
          <BodyItem label="Dividends avail." amount={"~88k"} symbol={"USD"} />
          <BodyItem label="Custodian" amount={"-"} />
          <BodyItem label="Price OTC" amount={"-"} />
          <BodyItem label="Expiration date" amount={expirationDate} fz="11px" />
        </>
      )}
    </>
  )
}

export default BodyInvestor
