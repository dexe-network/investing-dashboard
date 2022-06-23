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
  gasPrice: string
  isExpandable?: boolean
}

const SwapPrice: React.FC<Props> = ({
  fromSymbol,
  toSymbol,
  tokensCost,
  usdCost,
  gasPrice,
  isExpandable = false,
}) => {
  const [loading, setLoading] = useState(true)
  const [full, setFull] = useState(false)

  useEffect(() => {
    if (tokensCost.eq("0") || usdCost.eq("0")) {
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
      {isExpandable && <Flex ai="center">{icon}</Flex>}
    </>
  )

  const mainContent = (
    <>
      <Flex ai="center">
        <TokenPrice>
          1 {toSymbol} = {formatNumber(ethers.utils.formatUnits(tokensCost), 4)}{" "}
          {fromSymbol}
        </TokenPrice>
        <UsdPrice>
          (${formatNumber(ethers.utils.formatUnits(usdCost), 2)})
        </UsdPrice>
      </Flex>
      <Flex gap="6" ai="center">
        <GasIcon src={gas} />
        <GasPrice>${gasPrice}</GasPrice>
        {isExpandable && icon}
      </Flex>
    </>
  )

  return !!fromSymbol && !!toSymbol ? (
    <Container>{loading ? loaderContent : mainContent}</Container>
  ) : null
}

export default SwapPrice
