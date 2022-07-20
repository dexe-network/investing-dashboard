import { FC } from "react"

import Button from "components/Button"
import { BodyItem } from "components/cards/proposal/styled"

interface Props {
  ticker: string

  supply: string
  expirationDate: string

  invested: boolean
  apr: string
}

const BodyInvestor: FC<Props> = ({
  ticker,
  supply,
  expirationDate,
  invested,
  apr,
}) => {
  return (
    <>
      {invested ? (
        <>
          <BodyItem label={"Proposal size " + ticker} amount={"40"} />
          <BodyItem label="Fulness" amount={"90%"} />
          <BodyItem
            label="Expiration date"
            amount={expirationDate}
            fz="11px"
            ai="flex-end"
          />
          <BodyItem label="Custodian" amount={"-"} />
          <BodyItem label="LP price ($)" amount={"999,989"} />
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
          <BodyItem label={"Supply " + ticker} amount={supply} />
          <BodyItem label="Fulness" amount={"90%"} />
          <BodyItem
            label={"Your balance " + ticker}
            amount={"10"}
            ai="flex-end"
          />
          <BodyItem label="APR" amount={`${apr} %`} />
          <BodyItem label="Total dividends ($)" amount={"~999k"} />
          <BodyItem
            label="Dividends avail. ($)"
            amount={"~88k"}
            ai="flex-end"
          />
          <BodyItem label="Custodian" amount={"-"} />
          <BodyItem label="Price OTC" amount={"-"} />
          <BodyItem
            label="Expiration date"
            amount={expirationDate}
            fz="11px"
            ai="flex-end"
          />
        </>
      )}
    </>
  )
}

export default BodyInvestor
