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

  const variants = {
    visible: {
      opacity: 1,
    },
    hidden: {
      opacity: 0,
    },
  }

  const icon = (
    <AngleIcon
      initial="hidden"
      animate={loading ? "hidden" : "visible"}
      variants={variants}
      src={angle}
    />
  )

  const loaderContent = (
    <>
      <Flex ai="center">
        <WhiteText>Fetching best price...</WhiteText>
      </Flex>
      <Flex ai="center">{icon}</Flex>
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
        {icon}
      </Flex>
    </>
  )

  return <Container>{loading ? loaderContent : mainContent}</Container>
}

export default SwapPrice
