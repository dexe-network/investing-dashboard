import { useState, useEffect } from "react"
import styled from "styled-components"
import { ResponsivePie } from "@nivo/pie"

const url =
  "https://api.ethplorer.io/getAddressInfo/0x64ec24675d7bbc80f954ff15edd57d381f5b3e1a?apiKey=EK-fG1nt-b7TqmhU-WsGdd"

const StyledChart = styled.div`
  position: relative;
  height: inherit;
  width: inherit;
`

const Text = styled.div`
  color: #999999;
  font-size: 16px;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
  max-width: 70px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`

const Symbol = styled(Text)`
  position: absolute;
  top: 55px;
`

const Value = styled(Text)`
  position: absolute;
  top: 75px;
`

interface EthplorerToken {
  balance: number
  tokenInfo: {
    symbol: string
    decimals: string
    address: string
  }
}

interface EthplorerResponse {
  tokens: EthplorerToken[]
}

interface Token {
  id: string
  label: string
  value: number
}

const DonutChart = () => {
  return (<div></div>)
}

export default DonutChart
