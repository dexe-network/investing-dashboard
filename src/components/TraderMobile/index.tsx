// import React, { useState, useRef } from "react"
import { Flex, To } from "theme"
import styled from "styled-components"
import Avatar from "components/Avatar"
import AreaChart from "components/AreaChart"
import defaultAvatar from "assets/icons/default-avatar.svg"
import { IPool } from "constants/interfaces"
import { useWeb3React } from "@web3-react/core"
import swipeLeft from "assets/icons/swipe-arrow-left.svg"

import { Card } from "components/MemberMobile/styled"
import { shortenAddress, formatNumber } from "utils"

const TraderMobile = () => {
  const { account } = useWeb3React()

  return <Card ai="flex-end" full></Card>
}

export default TraderMobile
