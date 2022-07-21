import { FC } from "react"

import { BodyItem } from "components/cards/proposal/styled"

interface Props {
  ticker: string

  supply: string
  youSizeLP: string
  maxSizeLP: string
  apr: string
  dividendsAvailable: string
  totalDividends: string

  totalInvestors: string
  expirationDate: string
}

const BodyTrader: FC<Props> = ({
  ticker,

  supply,
  youSizeLP,
  maxSizeLP,
  apr,
  dividendsAvailable,
  totalDividends,
  totalInvestors,
  expirationDate,
}) => {
  return (
    <>
      <BodyItem label={"Supply " + ticker} amount={supply} />
      <BodyItem label={"Your size " + ticker} amount={youSizeLP} />
      <BodyItem label={"Max Size " + ticker} amount={maxSizeLP} ai="flex-end" />
      <BodyItem label="APR" amount={`${apr} %`} />
      <BodyItem
        label="Dividends avail. ($)"
        amount={`~${dividendsAvailable}`}
      />
      <BodyItem
        label="Total dividends ($)"
        amount={`~${totalDividends}`}
        ai="flex-end"
      />
      <BodyItem label="Investors" amount={`${totalInvestors}/`} symbol="1000" />
      <BodyItem label="Price OTC" amount={"-"} />
      <BodyItem
        label="Expiration date"
        amount={expirationDate}
        fz="11px"
        ai="flex-end"
      />
    </>
  )
}

export default BodyTrader
