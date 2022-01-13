// import React, { useState, useRef } from "react"
import { Flex } from "theme"
import styled from "styled-components"
import Avatar from "components/Avatar"

import { Card } from "components/MemberMobile/styled"

interface Props {
  onArrowClick: () => void
}

const InvestorMobile: React.FC<Props> = () => {
  return <Card ai="flex-end" full></Card>
}

export default InvestorMobile
