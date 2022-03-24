import { useState, useEffect } from "react"
import { Flex } from "theme"

import angle from "assets/icons/angle-down.svg"
import gas from "assets/icons/gas-price.svg"

import {
  Container,
  WhiteText,
  TokenPrice,
  UsdPrice,
  GasPrice,
  GasIcon,
  AngleIcon,
} from "./styled"

const SwapPrice: React.FC = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000)
  }, [])

  const loaderContent = (
    <>
      <Flex ai="center">
        <WhiteText>Fetching best price...</WhiteText>
      </Flex>
      <Flex ai="center">
        <AngleIcon src={angle} />
      </Flex>
    </>
  )

  const mainContent = (
    <>
      <Flex ai="center">
        <TokenPrice>1 TRX = 2.22 USDT</TokenPrice>
        <UsdPrice>($2.13)</UsdPrice>
      </Flex>
      <Flex ai="center">
        <GasIcon src={gas} />
        <GasPrice>$20.18</GasPrice>
        <AngleIcon src={angle} />
      </Flex>
    </>
  )

  return <Container>{loading ? loaderContent : mainContent}</Container>
}

export default SwapPrice
