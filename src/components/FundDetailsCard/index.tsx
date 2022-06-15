import { FC, useState, useEffect, useMemo } from "react"
import { ethers } from "ethers"

import { useERC20 } from "hooks/useContract"
import { IPoolQuery, PoolInfo } from "constants/interfaces_v2"
import { expandTimestamp, formatBigNumber } from "utils"
import { usePoolMetadata } from "state/ipfsMetadata/hooks"

import Emission from "components/Emission"

import {
  Label,
  DescriptionText,
  Container,
  InfoRow,
  EmptyDescription,
} from "./styled"
import { format } from "date-fns"

function percentage(used, total) {
  return (used / total) * 100
}

const fundTypes = {
  BASIC_POOL: "Basic",
  INVEST_POOL: "Invest",
}

interface Props {
  data: IPoolQuery
  poolInfo: PoolInfo | null
}

const FundDetailsCard: FC<Props> = ({ data, poolInfo }) => {
  const [description, setDescription] = useState("")
  const [strategy, setStrategy] = useState("")
  const [, baseData] = useERC20(data.baseToken)

  const [{ poolMetadata }] = usePoolMetadata(data.id, data.descriptionURL)

  const creationTime = useMemo(() => {
    if (!!data) {
      return format(expandTimestamp(data.creationTime), "MMM dd, y")
    }

    return "-"
  }, [data])

  const minimalInvestment = useMemo(() => {
    if (!poolInfo || !baseData) return "-"

    const res = ethers.utils.formatEther(poolInfo.parameters.minimalInvestment)

    if (res === "0.0" || res === "0.00") {
      return "-"
    }
    return `${res} ${baseData.symbol}`
  }, [poolInfo, baseData])

  const emission = useMemo(() => {
    if (!poolInfo) return { unlimited: true, value: "Unlimited" }

    const value = formatBigNumber(poolInfo.parameters.totalLPEmission, 18, 6)
    const unlimited = value === "0.0" || value === "0.00"

    return { unlimited, value: unlimited ? "Unlimited" : value }
  }, [poolInfo])

  const emissionLeft = useMemo(() => {
    if (!poolInfo || emission.unlimited)
      return {
        percentage: 0,
        value: "0.0",
      }

    const total = poolInfo.parameters.totalLPEmission
    const used = poolInfo.lpSupply.add(poolInfo.lpLockedInProposals)

    const dif = total.sub(used)

    const percent = percentage(
      Number(ethers.utils.formatEther(dif)).toFixed(2),
      Number(ethers.utils.formatEther(total)).toFixed(2)
    )

    return {
      percentage: percent,
      value: formatBigNumber(dif, 18, 6),
    }
  }, [poolInfo, emission])

  const whitelistCount = useMemo(() => {
    if (!data) return 0
    return data.privateInvestors.length
  }, [data])

  const adminsCount = useMemo(() => {
    if (!data) return 0
    return data.admins.length
  }, [data])

  useEffect(() => {
    if (!poolMetadata) return

    setDescription(poolMetadata.description)
    setStrategy(poolMetadata.strategy)
  }, [poolMetadata])

  return (
    <Container>
      <Label>Fund description</Label>
      {!description ? (
        <EmptyDescription>
          Add a description of your fund for investors.
        </EmptyDescription>
      ) : (
        <DescriptionText>{description}</DescriptionText>
      )}
      <Label>Fund strategy</Label>
      {!strategy ? (
        <EmptyDescription>
          Add a strategy of your fund for investors.
        </EmptyDescription>
      ) : (
        <DescriptionText>{strategy}</DescriptionText>
      )}

      {!emission.unlimited && (
        <Emission
          percent={emissionLeft.percentage}
          total={`${emission.value} ${data.ticker}`}
          current={`${emissionLeft.value} ${data.ticker}`}
        />
      )}
      <InfoRow label={"Creation date"} value={creationTime} />
      <InfoRow label={"Type of fund"} value={fundTypes[data.type]} />
      <InfoRow label={"Min. investment amount"} value={minimalInvestment} />
      <InfoRow label={"Whitelist"} value={`${whitelistCount} adresess`} />
      <InfoRow label={"Fund manager"} value={`${adminsCount} managers`} />
      {emission.unlimited && (
        <InfoRow label={"Emission"} value={emission.value} />
      )}

      <InfoRow
        label={"Performance Fee"}
        value={`${formatBigNumber(
          poolInfo?.parameters.commissionPercentage,
          25,
          0
        )}%`}
      />
    </Container>
  )
}

export default FundDetailsCard
