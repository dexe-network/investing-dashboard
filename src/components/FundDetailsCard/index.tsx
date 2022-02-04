// import React, { useState, useRef } from "react"
// import styled from "styled-components"
// import { motion } from "framer-motion"
import { Label, DescriptionText, Container, InfoRow } from "./styled"

const FundDetailsCard: React.FC = () => {
  return (
    <Container>
      <Label>Fund strategy</Label>
      <DescriptionText>
        Owner Our team has been developing this product since 2019 using their
        own experience and industry standards of trading. During this time, we
        managed to reach the key goal — the creation of an easy-to-use product
        for decentralized copying of the best traders/wallets. the creation of
        an easy-to-use product for decentralized
      </DescriptionText>
      <Label>Fund description</Label>
      <DescriptionText>
        Owner Our team has been developing this product since 2019 using their
        own experience and industry standards of trading. During this time, we
        managed to reach the key goal — the creation of an easy-to-use product
        for decentralized copying of the best traders/wallets. the creation of
        an easy-to-use product for decentralized
      </DescriptionText>
      <InfoRow label={"Min. investment amount"} value={"500 DEXE "} />
      <InfoRow label={"Type of fund"} value={"Standart"} />
      <InfoRow label={"Whitelist"} value={"356 adresess"} />
      <InfoRow label={"Fund manager"} value={"5 managers"} />
      <InfoRow label={"Performance Fee"} value={"35 %"} />
    </Container>
  )
}

export default FundDetailsCard
