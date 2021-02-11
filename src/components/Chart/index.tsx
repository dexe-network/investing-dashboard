// import React, { useState, useRef } from "react"
import styled from "styled-components"
// import { motion } from "framer-motion"
import ApexChart from "react-apexcharts"

const ChartWrapper = styled.div`
  margin-left: -20px;
`

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
    toolbar: {
      show: false,
    },
    dropShadow: {
      enabled: true,
      top: -2,
      left: -2,
      blur: 20,
      opacity: 0.2,
    },
  },
  fill: {
    colors: ["#1F5281", "#2E313E"],
    type: "gradient",
    gradient: {
      shade: "dark",
      type: "vertical",
      shadeIntensity: 0.1,
      gradientToColors: undefined,
      inverseColors: false,
      opacityFrom: 1,
      opacityTo: 0.1,
      stops: [0, 90],
    },
  },
  tooltip: {
    theme: "dark",
  },
  stroke: {
    show: true,
    curve: "smooth",
    lineCap: "butt",
    colors: ["#00C0FF"],
    width: 1.8,
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
      show: true,
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
      show: true,
    },
  },
}
const series = [
  {
    name: "series-1",
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
      0,
      60,
      70,
      91,
      30,
      40,
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
      0,
      60,
      70,
      91,
      40,
      45,
      50,
      0,
      30,
      40,
      45,
      50,
      49,
      60,
      70,
      91,
      30,
      40,
      45,
      50,
      49,
      60,
      70,
      91,
    ],
  },
]

const Chart: React.FC = () => {
  return (
    <ChartWrapper>
      <ApexChart
        options={options}
        series={series}
        type="area"
        width="940"
        height="192"
      />
    </ChartWrapper>
  )
}

export default Chart
