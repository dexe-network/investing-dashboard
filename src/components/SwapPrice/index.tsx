import { useState, useEffect } from "react"
import { Flex } from "theme"
import { BigNumber } from "@ethersproject/bignumber"

import { ethers } from "ethers"
import { formatNumber } from "utils"

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

interface Props {
  fromSymbol: string | undefined
  toSymbol: string | undefined
  tokensCost: BigNumber
  usdCost: BigNumber
}

const SwapPrice: React.FC<Props> = ({
  fromSymbol,
  toSymbol,
  tokensCost,
  usdCost,
}) => {
  const [loading, setLoading] = useState(true)
  const [full, setFull] = useState(false)

  useEffect(() => {
    if (!fromSymbol || !toSymbol || !tokensCost || !usdCost) {
      setLoading(true)
      return
    }
    setLoading(false)
  }, [fromSymbol, toSymbol, tokensCost, usdCost])

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
        <TokenPrice>
          1 {toSymbol} = {formatNumber(ethers.utils.formatUnits(tokensCost), 6)}{" "}
          {fromSymbol}
        </TokenPrice>
        <UsdPrice>
          (${formatNumber(ethers.utils.formatUnits(usdCost), 2)})
        </UsdPrice>
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
