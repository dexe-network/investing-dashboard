import { format } from "date-fns/esm"

import { Flex } from "theme"
import ExternalLink from "components/ExternalLink"
import TokenIcon from "components/TokenIcon"

import getExplorerLink, { ExplorerDataType } from "utils/getExplorerLink"
import {
  ExactInputSwapTransactionInfo,
  ExactOutputSwapTransactionInfo,
} from "state/transactions/types"

import { CardContainer, CardIcons, CardTime } from "./styled"

interface IProps {
  hash: string
  info: ExactInputSwapTransactionInfo | ExactOutputSwapTransactionInfo
  chainId?: number
  confirmedTime?: number
}

const TransactionHistoryCardSwap: React.FC<IProps> = ({
  hash,
  info: { inputCurrencyId, outputCurrencyId },
  chainId,
  confirmedTime,
}) => {
  return (
    <CardContainer>
      <Flex>
        <CardIcons>
          <TokenIcon m="0" address={inputCurrencyId} size={20} />
          <TokenIcon m="0" address={outputCurrencyId} size={20} />
        </CardIcons>
        {chainId && (
          <ExternalLink
            fz="13px"
            fw="500"
            color="#2680EB"
            href={getExplorerLink(chainId, hash, ExplorerDataType.TRANSACTION)}
          >
            View on bscscan
          </ExternalLink>
        )}
      </Flex>
      <CardTime>
        {confirmedTime && format(confirmedTime, "MMM dd, y, HH:mm")}
      </CardTime>
    </CardContainer>
  )
}

export default TransactionHistoryCardSwap
