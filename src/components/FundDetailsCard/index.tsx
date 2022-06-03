import React, { useState, useEffect } from "react"

import {
  Label,
  DescriptionText,
  Container,
  InfoRow,
  EmptyDescription,
} from "./styled"
import { useERC20 } from "hooks/useContract"
import { IPoolQuery, PoolInfo } from "constants/interfaces_v2"
import { formatBigNumber } from "utils"
import { usePoolMetadata } from "state/ipfsMetadata/hooks"

const fundTypes = {
  BASIC_POOL: "Basic",
  INVEST_POOL: "Invest",
}

interface Props {
  data: IPoolQuery
  poolInfo: PoolInfo | null
}

const FundDetailsCard: React.FC<Props> = ({ data, poolInfo }) => {
  const [description, setDescription] = useState("")
  const [strategy, setStrategy] = useState("")
  const [, baseData] = useERC20(data.baseToken)

  const [{ poolMetadata }] = usePoolMetadata(data.id, data.descriptionURL)

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
          The trader did not fill in the description of his fund.
        </EmptyDescription>
      ) : (
        <DescriptionText>{description}</DescriptionText>
      )}
      <Label>Fund strategy</Label>
      {!strategy ? (
        <EmptyDescription>
          The trader did not fill in the straregy of his fund.
        </EmptyDescription>
      ) : (
        <DescriptionText>{strategy}</DescriptionText>
      )}
      <InfoRow
        label={"Min. investment amount"}
        value={`0 ${baseData?.symbol}`}
      />
      <InfoRow label={"Type of fund"} value={fundTypes[data.type]} />
      <InfoRow label={"Whitelist"} value={"0 adresess"} />
      <InfoRow label={"Fund manager"} value={"0 managers"} />
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
