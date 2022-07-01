import { Flex } from "theme"
import TokenIcon from "components/TokenIcon"
import { Head, PositionSymbol, Amount } from "./styled"

interface Props {
  positionToken?: string
  symbol?: string
  dir?: string
}

const PositionCardHeader: React.FC<Props> = ({
  positionToken,
  symbol,
  children,
  dir,
}) => {
  return (
    <Head dir={dir}>
      <Flex>
        <TokenIcon address={positionToken} m="0" size={24} />
        <Amount>5</Amount>
        <PositionSymbol>{symbol}</PositionSymbol>
      </Flex>
      {children}
    </Head>
  )
}

export default PositionCardHeader
