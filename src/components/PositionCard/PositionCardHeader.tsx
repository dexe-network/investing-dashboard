import { Flex } from "theme"
import TokenIcon from "components/TokenIcon"
import Icon from "components/Icon"
import { Head, PositionSymbol, FundSymbol, Amount } from "./styled"

interface Props {
  positionToken?: string
  symbol?: string
  showBaseToken?: boolean
  baseTokenSymbol?: string
  poolAddress?: string
  poolIcon?: string
}

const PositionCardHeader: React.FC<Props> = ({
  positionToken,
  symbol,
  showBaseToken = false,
  baseTokenSymbol,
  poolAddress,
  poolIcon,
}) => {
  return (
    <Head>
      <Flex>
        <TokenIcon address={positionToken} m="0" size={24} />
        <Amount>5</Amount>
        <PositionSymbol>{symbol}</PositionSymbol>
      </Flex>
      {showBaseToken && (
        <Flex>
          <FundSymbol>{baseTokenSymbol}</FundSymbol>
          <Icon m="0" size={24} source={poolIcon} address={poolAddress} />
        </Flex>
      )}
    </Head>
  )
}

export default PositionCardHeader
