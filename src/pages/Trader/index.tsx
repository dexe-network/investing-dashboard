import styled from "styled-components"
import { Flex, Text, Center, To } from "theme"
import { useSwipeable } from "react-swipeable"
import { useHistory, useParams } from "react-router-dom"
import FundsList from "components/FundsList"
import TraderMobile from "components/TraderMobile"
import Button from "components/Button"
import { useEffect, useState } from "react"
import axios from "axios"
import { GuardSpinner } from "react-spinners-kit"
import { formatNumber } from "utils"
import { ethers } from "ethers"
import { useSelectPrices } from "state/rates/hooks"
import PnlWidget from "components/PnlWidget"
import { IPoolInfo } from "constants/interfaces"

import OpenNewTrade from "assets/custom-buttons/OpenNewTrade"

interface Props {}

import {
  Container,
  Buttons,
  Section,
  Block,
  HalfBlock,
  Label,
  Value,
  Pnl,
} from "./styled"

function Trader(props: Props) {
  const {} = props

  const { poolAddress } = useParams<{ poolAddress: string }>()
  const history = useHistory()
  const rates = useSelectPrices()

  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<IPoolInfo | null>(null)

  useEffect(() => {
    if (typeof poolAddress !== "string") return

    const getPoolData = async () => {
      const {
        data: { data },
      } = await axios.get(
        `${process.env.REACT_APP_STATS_API_URL}/trader/${poolAddress}/info`
      )
      console.log(data)
      setData(data)
      setLoading(false)
    }

    if (poolAddress.length === 42) {
      getPoolData()
    }
  }, [poolAddress])

  const redirectToInvestor = () => {
    history.push("/investor")
  }

  const handlers = useSwipeable({
    onSwipedRight: () => redirectToInvestor(),
  })

  if (loading) {
    return (
      <Center>
        <GuardSpinner size={20} loading />
      </Center>
    )
  }

  if (!data) {
    return (
      <Center>
        <Text>Data not available</Text>
      </Center>
    )
  }

  return (
    <Container {...handlers}>
      <Section>
        <FundsList />
        <TraderMobile
          decimal={data.basicTokenDecimal}
          symbol={data.symbol}
          currentPrice={data.currentPrice}
          priceChange24H={data.priceChange24H}
          totalValueLocked={data.totalValueLocked}
          annualPercentageYield={data.annualPercentageYield}
          profitAndLoss={data.profitAndLoss}
        />
      </Section>

      <Section>
        <PnlWidget
          pnlPeriod={data.profitAndLossByPeriod}
          pnlChart={data.profitAndLossChart}
        />
        <Block>
          <HalfBlock>
            <Label>Personal funds locked</Label>
            <Value>
              $
              {formatNumber(
                ethers.utils
                  .formatUnits(
                    data.personalFundsLocked.toString(),
                    data.basicTokenDecimal
                  )
                  .toString(),
                2
              )}
            </Value>
            <Pnl side="BUY">
              {formatNumber(data.personalFundsLocked24H.toString(), 2)}%
            </Pnl>
          </HalfBlock>
          <HalfBlock>
            <Label>Investor’s funds locked</Label>
            <Value>
              {"$"}
              {formatNumber(
                ethers.utils
                  .formatUnits(
                    data.investorsFundsLocked.toString(),
                    data.basicTokenDecimal
                  )
                  .toString(),
                2
              )}
            </Value>
            <Pnl side="SELL">
              {formatNumber(data.investorsFundsLocked24H.toString(), 2)}%
            </Pnl>
          </HalfBlock>
        </Block>
        <Buttons>
          <To to={`/pool/${poolAddress}/exchange`}>
            <OpenNewTrade />
          </To>
          <Button
            theme="primary"
            onClick={() => history.push(`/pool/${poolAddress}/trades`)}
            fz={16}
            full
          >
            Fund Positions
          </Button>
        </Buttons>
      </Section>
    </Container>
  )
}

export default Trader
