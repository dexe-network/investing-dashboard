import React, { useState, useRef, useEffect } from "react"
// import styled from "styled-components"
// import { motion } from "framer-motion"
import { Pool } from "constants/interfaces_v2"
import { Label, DescriptionText, Container, InfoRow } from "./styled"
import { parsePoolData } from "utils/ipfs"
import { useERC20 } from "hooks/useContract"
import { ethers } from "ethers"

const FundDetailsCard: React.FC<{ data: Pool }> = ({ data }) => {
  const [description, setDescription] = useState("")
  const [strategy, setStrategy] = useState("")
  // const [baseToken, baseData] = useERC20(data.parameters.baseToken)

  // useEffect(() => {
  //   if (!data) return
  //   ;(async () => {
  //     const parsed = await parsePoolData(data.parameters.descriptionURL)
  //     if (!!parsed) {
  //       setDescription(parsed.description)
  //       setStrategy(parsed.strategy)
  //     }
  //   })()
  // }, [data])

  return (
    <Container>
      <Label>Fund strategy</Label>
      <DescriptionText>{strategy}</DescriptionText>
      <Label>Fund description</Label>
      <DescriptionText>{description}</DescriptionText>
      {/* <InfoRow
        label={"Min. investment amount"}
        value={`0 ${baseData?.symbol}`}
      /> */}
      <InfoRow label={"Type of fund"} value={"Standart"} />
      <InfoRow label={"Whitelist"} value={"0 adresess"} />
      <InfoRow label={"Fund manager"} value={"0 managers"} />
      {/* <InfoRow
        label={"Performance Fee"}
        value={`${ethers.utils
          .formatUnits(data.parameters.comissionPercentage, 25)
          .toString()}%`}
      /> */}
    </Container>
  )
}

export default FundDetailsCard
