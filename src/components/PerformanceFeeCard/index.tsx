import { FC, useMemo } from "react"
import { format } from "date-fns"

import { expandTimestamp } from "utils"

import Button, { SecondaryButton } from "components/Button"

import { Container, ValueLabel, ArrowIcon } from "./styled"
import { useNavigate } from "react-router-dom"

interface Props {
  performanceFeePercent: number | string
  commisionUnlockTime?: number
  isPerformanceFeeExist: boolean
  poolAddress?: string
  p?: string
}

const PerformanceFeeCard: FC<Props> = ({
  performanceFeePercent,
  commisionUnlockTime,
  isPerformanceFeeExist,
  poolAddress,
  p = "0",
}) => {
  const navigate = useNavigate()

  // TODO: can't use this because we have commission for every unique investor
  const commisionUnlockDate = useMemo(() => {
    if (!!commisionUnlockTime) {
      return format(expandTimestamp(commisionUnlockTime), "MMM dd, y")
    }
    return "-"
  }, [commisionUnlockTime])

  const handleCommissionRedirect = () => {
    navigate(`/fund-details/${poolAddress}/fee`)
  }

  const button = () => {
    if (isPerformanceFeeExist) {
      return (
        <Button onClick={handleCommissionRedirect} m="0" size="small">
          Performance Fee {performanceFeePercent}%
          <ArrowIcon color="#0d1320" />
        </Button>
      )
    } else {
      return (
        <SecondaryButton m="0" size="small">
          Performance Fee {performanceFeePercent}%
          <ArrowIcon color="#788ab4" />
        </SecondaryButton>
      )
    }
  }

  return (
    <Container full p={p}>
      {button()}
      <ValueLabel>{commisionUnlockDate}</ValueLabel>
    </Container>
  )
}

export default PerformanceFeeCard
