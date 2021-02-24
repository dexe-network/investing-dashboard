import { useState, useEffect } from "react"
import useAxios from "axios-hooks"
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
  const [{ response, loading, error }] = useAxios<EthplorerResponse, any>(url)
  const [selected, setSelected] = useState<Token | null>(null)
  const [data, setData] = useState<Token[]>([])

  useEffect(() => {
    if (response?.data?.tokens?.length) {
      const transfromed = response.data.tokens.map((t) => ({
        id: t.tokenInfo.address,
        label: t.tokenInfo.symbol,
        value: Math.random() * 100,
      }))
      setData(transfromed)
      setSelected(transfromed[0])
    }
  }, [response, setData])

  const onHover = (node) => {
    setSelected({
      id: node.data.id,
      label: node.data.label,
      value: node.data.value,
    })
  }

  if (loading || error) {
    return null
  }

  return (
    <StyledChart>
      <ResponsivePie
        data={data}
        onMouseEnter={onHover}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        innerRadius={0.83}
        padAngle={2}
        cornerRadius={90}
        colors={[
          "#294DA1",
          "#553B96",
          "#813994",
          "#AC2076",
          "#AC1F24",
          "#AD4424",
          "#B06125",
          "#AD8230",
        ]}
        borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
        radialLabelsSkipAngle={13}
        radialLabelsTextColor="#333333"
        enableRadialLabels={false}
        radialLabelsLinkOffset={4}
        radialLabelsLinkDiagonalLength={12}
        radialLabelsLinkHorizontalLength={17}
        radialLabelsLinkColor={{ from: "color" }}
        enableSliceLabels={false}
        sliceLabelsSkipAngle={10}
        sliceLabelsTextColor="#333333"
      />

      {selected?.label && selected?.value && (
        <>
          <Symbol>{selected.label}</Symbol>
          <Value>{selected.value.toFixed(2)}</Value>
        </>
      )}
    </StyledChart>
  )
}

export default DonutChart
