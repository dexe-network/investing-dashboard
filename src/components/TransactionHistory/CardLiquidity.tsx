import { format } from "date-fns/esm"

import { Flex } from "theme"
import ExternalLink from "components/ExternalLink"
import TokenIcon from "components/TokenIcon"

import getExplorerLink, { ExplorerDataType } from "utils/getExplorerLink"
import {
  DepositLiquidityTransactionInfo,
  WithdrawLiquidityTransactionInfo,
} from "state/transactions/types"

import { CardContainer, CardIcons, CardTime } from "./styled"

interface IProps {
  hash: string
  info: DepositLiquidityTransactionInfo | WithdrawLiquidityTransactionInfo
  chainId?: number
  confirmedTime?: number
}

const TransactionHistoryCardLiquidity: React.FC<IProps> = ({
  hash,
  info: { currencyId },
  chainId,
  confirmedTime,
}) => {
  return (
    <CardContainer>
      <Flex>
        <CardIcons relative={false}>
          <TokenIcon m="0" address={currencyId} size={30} />
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

export default TransactionHistoryCardLiquidity
