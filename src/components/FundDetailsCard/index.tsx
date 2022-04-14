import React, { useState, useRef, useEffect } from "react"
// import styled from "styled-components"
// import { motion } from "framer-motion"
import {
  Label,
  DescriptionText,
  Container,
  InfoRow,
  EmptyDescription,
} from "./styled"
import { parsePoolData } from "utils/ipfs"
import { useERC20 } from "hooks/useContract"
import { ethers } from "ethers"
import { IPoolQuery, PoolInfo } from "constants/interfaces_v2"

interface Props {
  data: IPoolQuery
  poolInfo: PoolInfo | null
}

const FundDetailsCard: React.FC<Props> = ({ data, poolInfo }) => {
  const [description, setDescription] = useState("")
  const [strategy, setStrategy] = useState("")
  const [, baseData] = useERC20(data.baseToken)

  useEffect(() => {
    if (!data) return
    ;(async () => {
      const parsed = await parsePoolData(data.descriptionURL)

      if (!!parsed) {
        setDescription(parsed.description)
        setStrategy(parsed.strategy)
      }
    })()
  }, [data])

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
      <InfoRow label={"Type of fund"} value={"Standart"} />
      <InfoRow label={"Whitelist"} value={"0 adresess"} />
      <InfoRow label={"Fund manager"} value={"0 managers"} />
      <InfoRow
        label={"Performance Fee"}
        value={`${ethers.utils
          .formatUnits(poolInfo?.parameters.comissionPercentage || 0, 25)
          .toString()}%`}
      />
    </Container>
  )
}

export default FundDetailsCard
