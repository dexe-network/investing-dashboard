import React, { useEffect, useRef } from "react"
import { Flex } from "theme"
import styled, { createGlobalStyle } from "styled-components"
import { createChart, CrosshairMode } from "lightweight-charts"
import areaData, { emptyData } from "./areaData"

function businessDayToString(businessDay) {
  return businessDay.year + "-" + businessDay.month + "-" + businessDay.day
}

export const TooltipStyles = createGlobalStyle`
  .floating-tooltip-2 {
    width: 140px;
    height: 80px;
    position: absolute;
    display: none;
    padding: 8px;
    box-sizing: border-box;
    font-size: 12px;
    color: #C5D1DC;
    text-align: left;
    z-index: 1000;
    top: 12px;
    left: 12px;
    pointer-events: none;
    border: 1px solid #05050580;
    background: linear-gradient(264.39deg, rgba(255, 255, 255, 0) -58.22%, rgba(255, 255, 255, 0.04) 116.91%);
    background: linear-gradient(64.44deg, #24272F 32.35%, #2C313C 100%);
    border-radius: 8px;
  }

  .floating-tooltip-2-container {

  }
  .floating-tooltip-2-date {
    font-family: Gilroy;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 14px;
    color: #5A6071;
    
    opacity: 0.6;
  }
  .floating-tooltip-2-row {
    font-family: Gilroy;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 15px;
    margin: 3px 0;
    /* Text / main */
    
    color: #C5D1DC;
  }
  .floating-tooltip-2-value {
    font-family: Gilroy;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    text-align: right;
    
    color: #9AE2CB;
  }
`

const ChartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex: 1;
  width: 100%;
  height: 120px;
  max-height: 120px;
  position: relative;
  background: "linear-gradient(64.44deg, #24272F 32.35%, #333A48 100%)";
`

const Container = styled.div`
  flex: 1;
  width: 100%;
  height: 120px;
`

const ChartPeriods = styled(Flex)`
  justify-content: space-around;
  width: 100%;
  padding: 15px 0;
`

const Period = styled.div<{ active?: boolean }>`
  font-family: Gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 10px;
  line-height: 130%;
  /* identical to box height, or 13px */

  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 1px;

  /* Text / gray */

  color: ${(props) => (props.active ? "#C5D1DC" : "#5a607180")};
`

const Chart = () => {
  const chartContainerRef = useRef<any>()
  const chart = useRef<any>()
  const resizeObserver = useRef<any>()

  useEffect(() => {
    chart.current = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      layout: {
        backgroundColor: "transparent",
        textColor: "rgba(255, 255, 255, 0.9)",
      },
      leftPriceScale: {
        visible: false,
      },
      rightPriceScale: {
        visible: false,
      },
      timeScale: {
        visible: false,
      },
      handleScroll: {
        mouseWheel: true,
        pressedMouseMove: true,
      },
      handleScale: {
        axisPressedMouseMove: true,
        mouseWheel: true,
        pinch: true,
      },
      grid: {
        vertLines: {
          color: "transparent",
          visible: false,
        },
        horzLines: {
          color: "transparent",
          visible: false,
        },
      },
      crosshair: {
        mode: CrosshairMode.Magnet,
        vertLine: {
          visible: false,
        },
        horzLine: {
          visible: false,
        },
      },
    })

    const areaSeries = chart.current.addAreaSeries({
      topColor: "#9AE2CB10",
      bottomColor: "#9AE2CB00",
      lineColor: "#9AE2CB",
      lineWidth: 2,
    })

    areaSeries.setData(emptyData)

    const toolTipWidth = 80
    const toolTipHeight = 80
    const toolTipMargin = 15

    const toolTip = document.createElement("div")
    toolTip.className = "floating-tooltip-2"
    chartContainerRef.current.appendChild(toolTip)

    // update tooltip
    const subscriber = chart.current.subscribeCrosshairMove(function (param) {
      if (
        !chartContainerRef.current ||
        param.point === undefined ||
        !param.time ||
        param.point.x < 0 ||
        param.point.x > chartContainerRef.current.clientWidth ||
        param.point.y < 0 ||
        param.point.y > chartContainerRef.current.clientHeight
      ) {
        toolTip.style.display = "none"
      } else {
        const dateStr = businessDayToString(param.time)
        toolTip.style.display = "block"
        const price = param.seriesPrices.get(areaSeries)
        toolTip.innerHTML = `
            <div class="floating-tooltip-2-container">
                <div class="floating-tooltip-2-date">${dateStr}</div>
                <div class="floating-tooltip-2-row">
                    P&L - $ETH:
                    <div class="floating-tooltip-2-value">
                    ${Math.round(100 * price) / 100}%
                    </div>
                </div>
                <div class="floating-tooltip-2-row">
                    P&L - USD:
                    <div class="floating-tooltip-2-value">
                    ${Math.round(100 * price) / 100}%
                    </div>
                </div>
            </div>

            
        `
        const coordinate = areaSeries.priceToCoordinate(price)
        let shiftedCoordinate = param.point.x - 50
        if (coordinate === null) {
          return
        }
        shiftedCoordinate = Math.max(
          0,
          Math.min(
            chartContainerRef.current.clientWidth - toolTipWidth,
            shiftedCoordinate
          )
        )
        const coordinateY =
          coordinate - toolTipHeight - toolTipMargin > 0
            ? coordinate - toolTipHeight - toolTipMargin
            : Math.max(
                0,
                Math.min(
                  chartContainerRef.current.clientHeight -
                    toolTipHeight -
                    toolTipMargin,
                  coordinate + toolTipMargin
                )
              )
        toolTip.style.left = shiftedCoordinate + "px"
        toolTip.style.top = coordinateY + "px"
      }
    })

    return () => subscriber
  }, [])

  // Resize chart on container resizes.
  useEffect(() => {
    if (!chart || !chart.current) return

    console.log("resize init")
    resizeObserver.current = new ResizeObserver((entries) => {
      const { width } = entries[0].contentRect
      chart.current.applyOptions({ width, height: 120 })
      setTimeout(() => {
        chart.current.timeScale().fitContent()
      }, 0)
    })

    resizeObserver.current.observe(chartContainerRef.current)
  }, [chart])

  return (
    <>
      <ChartPeriods>
        <Period active>D</Period>
        <Period>W</Period>
        <Period>M</Period>
        <Period>3M</Period>
        <Period>6M</Period>
        <Period>1Y</Period>
        <Period>ALL</Period>
      </ChartPeriods>
      <ChartWrapper>
        <TooltipStyles />
        <Container ref={chartContainerRef} />
      </ChartWrapper>
    </>
  )
}

export default Chart
