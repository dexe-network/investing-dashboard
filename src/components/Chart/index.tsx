// import React, { useState, useRef } from "react"
// import { motion } from "framer-motion"
import styled from "styled-components"
import ApexChart from "react-apexcharts"
import { Flex, chartColors, device } from "theme"
import { useUserProMode } from "state/user/hooks"

interface Props {
  width?: number
  height?: number
  title?: boolean
  period?: boolean
}

const StyledChart = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  @media only screen and (${device.sm}) {
    padding: 0 10px;
  }
`

const series = [
  {
    name: "P&L",
    data: [
      30, 40, 45, 50, 30, 40, 45, 50, 49, 60, 70, 91, 34, 60, 70, 91, 30, 20,
      45, 40, 45, 30, 60, 70, 91, 30, 50, 30, 40, 45, 50, 50, 20, 60, 70, 91,
      -40, 95, 80, 90, 50, 160, 175, 180, 99, 60, 70, 61, 70, 80, 85, 50, 189,
      90, 100, 121,
    ],
  },
]

const Chart: React.FC<Props> = (props) => {
  const [isPro] = useUserProMode()

  const options = {
    dataLabels: {
      enabled: false,
    },
    annotations: {
      xaxis: [
        {
          x: 140,
          strokeDashArray: 0,
          borderColor: "#1751d8",
          fillColor: "#1751d8",
          opacity: 0.5,
          offsetY: 5,
          label: {
            borderColor: "#1751d8",
            style: {
              fontFamily: "Gilroy",
              fontSize: "10px",
              color: "#7FFFD4",
              background: "#2869FC",
            },
            text: "Buy ISDX",
          },
        },
        {
          x: 190,
          strokeDashArray: 0,
          borderColor: "#431cc1",
          fillColor: "#431cc1",
          opacity: 0.5,
          offsetY: 5,
          label: {
            borderColor: "#431cc1",
            style: {
              fontFamily: "Gilroy",
              fontSize: "10px",
              color: "#FF7F7F",
              background: "#824096",
            },
            text: "Sell ISDX",
          },
        },
      ],
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
      animations: {
        enabled: false,
        easing: "easeinout",
        speed: 800,
        animateGradually: {
          enabled: false,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: false,
          speed: 350,
        },
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
        opacityFrom: 0.1,
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
    <StyledChart>
      {/* <ApexChart
        options={options}
        series={series}
        type="area"
        width={"100%"}
        height={props.height || "100%"}
      /> */}
    </StyledChart>
  )
}

export default Chart
