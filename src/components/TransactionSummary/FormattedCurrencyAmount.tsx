import { useSelector } from "react-redux"
import { BigNumber } from "@ethersproject/bignumber"

import { formatBigNumber } from "utils"
import { selectWhitelistItem } from "state/pricefeed/selectors"

const FormattedCurrencyAmount: React.FC<{
  rawAmount: string
  rawCurrency: string
  decimals?: number
  sigFigs?: number
}> = ({ rawAmount, rawCurrency, decimals = 18, sigFigs = 6 }) => {
  const amount = formatBigNumber(BigNumber.from(rawAmount), decimals, sigFigs)
  const currency = useSelector(selectWhitelistItem(rawCurrency))

  return (
    <>
      {amount} {currency?.symbol}
    </>
  )
}

export default FormattedCurrencyAmount
