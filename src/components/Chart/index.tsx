// import React, { useState, useRef } from "react"
// import { motion } from "framer-motion"
import styled from "styled-components"
import ApexChart from "react-apexcharts"
import { Flex, chartColors } from "theme"
import { useUserProMode } from "state/user/hooks"

interface Props {
  width?: number
  height?: number
  title?: boolean
  period?: boolean
}

const Ticker = styled.div`
  color: #dddddd;
  font-size: 16px;
  font-weight: bold;
  margin-right: 10px;
`

const Price = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #999999;
`

const Month = styled.div<{ active?: boolean }>`
  font-size: 16px;
  font-weight: 500;
  color: ${(props) => (props.active ? "#999999" : "#4A4F53")};
  margin: 0 8px;
  user-select: none;
  cursor: pointer;
`

const series = [
  {
    name: "P&L",
    data: [
      30,
      40,
      45,
      50,
      30,
      40,
      45,
      50,
      49,
      60,
      70,
      91,
      34,
      60,
      70,
      91,
      30,
      20,
      45,
      40,
      45,
      30,
      60,
      70,
      91,
      30,
      50,
      30,
      40,
      45,
      50,
      50,
      20,
      60,
      70,
      91,
      -40,
      95,
      80,
      90,
      50,
      160,
      175,
      180,
      99,
      60,
      70,
      61,
      70,
      80,
      85,
      50,
      189,
      90,
      100,
      121,
    ],
  },
]

const Chart: React.FC<Props> = (props) => {
  const [isPro] = useUserProMode()

  const options = {
    dataLabels: {
      enabled: false,
    },
    grid: {
      show: false,
    },
    legend: {
      show: false,
    },
    markers: {
      size: 0,
    },
    chart: {
      theme: "dark",
      id: "basic-bar",
      fontFamily: "Gilroy Helvetica, Arial, sans-serif",
      parentHeightOffset: 0,
      toolbar: {
        show: false,
      },
      offsetX: -20,
      dropShadow: {
        enabled: true,
        top: -2,
        left: -2,
        blur: 20,
        opacity: 0.2,
      },
      zoom: {
        enabled: false,
      },
      selection: {
        enabled: false,
      },
    },
    fill: {
      colors: chartColors[isPro ? "pro" : "default"].bg,
      type: "gradient",
      gradient: {
        shade: "light",
        type: "vertical",
        shadeIntensity: 0.1,
        gradientToColors: undefined,
        inverseColors: false,
        opacityFrom: 0.8,
        opacityTo: 0,
        stops: [0, 90],
      },
    },
    tooltip: {
      theme: "dark",
    },
    stroke: {
      show: true,
      curve: "straight",
      lineCap: "butt",
      colors: [chartColors[isPro ? "pro" : "default"].stroke],
      width: 1.5,
      dashArray: 0,
    },
    xaxis: {
      labels: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      crosshairs: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      crosshairs: {
        show: false,
      },
    },
    plotOptions: {
      area: {
        fillTo: "end",
      },
      marker: {
        radius: 1,
      },
      lineWidth: 2,
      states: {
        hover: {
          lineWidth: 3,
        },
      },
      threshold: null,
      turboThreshold: 10000,
    },
  }

  return (
    <div>
      {(props.title || props.period) && (
        <Flex full p="17px 30px 4px 30px">
          {props.title && (
            <Flex>
              <Ticker>Chart IDSX</Ticker>
              <Price>1 IDSX = 3.22 ETH ($1437.22)</Price>
            </Flex>
          )}
          {props.period && (
            <Flex>
              <Month>1D</Month>
              <Month>1W</Month>
              <Month>1M</Month>
              <Month>3M</Month>
              <Month>1Y</Month>
              <Month>2Y</Month>
              <Month active>ALL</Month>
            </Flex>
          )}
        </Flex>
      )}
      <ApexChart
        options={options}
        series={series}
        type="area"
        width={props.width || "100%"}
        height={props.height || "100%"}
      />
    </div>
  )
}

export default Chart
