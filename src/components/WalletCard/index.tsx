// import React, { useState, useRef } from "react"
import styled from "styled-components"
import { Flex, LinkIcon } from "theme"
// import { motion } from "framer-motion"
import { shortenAddress } from "utils"
import useTokensList from "hooks/useTokensList"
import TokenIcon from "components/TokenIcon"
import { useWeb3React } from "@web3-react/core"
import { useActiveWallet } from "hooks/useActiveWallet"

const Card = styled.div`
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.08);
  background: #252932;
  border-radius: 6px;
  height: 47px;
  width: 100%;
  padding: 5px 18px;
  user-select: none;
`

const Label = styled.div`
  font-family: Gilroy;
  font-style: normal;
  font-family: Gilroy;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.5px;
  color: #75ddc1;
`

const Address = styled.div`
  font-family: Gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  /* or 256% */

  color: #e8e9ed;
`

const Change = styled.div`
  font-family: Gilroy;
  font-style: normal;
  font-family: Gilroy;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  text-align: right;

  /* Input/Text */

  color: #5a6071;
  cursor: pointer;
`

const Connect = styled.div`
  color: #2680eb;
  font-size: 15px;
  font-family: Gilroy;
  font-weight: 700;
`

const TokenName = styled.div`
  font-size: 14px;
  font-family: Gilroy;
  font-weight: 500;
  color: #f5f5f5;
  text-transform: uppercase;
  transform: translate(-2px, 2px);
`

interface IProps {
  token: string
  symbol: string
}

const WalletCard: React.FC<IProps> = (props) => {
  const { account } = useWeb3React()

  return (
    <Card>
      <Flex full>
        <Label>Owner</Label>
        <Change>Change</Change>
      </Flex>
      <Flex full>
        <Flex ai="center">
          <Address>
            {account ? shortenAddress(account) : "wallet not connected"}
          </Address>
        </Flex>
        <Flex>
          <TokenIcon size={20} address={props.token} />
          <TokenName>{props.symbol}</TokenName>
        </Flex>
      </Flex>
    </Card>
  )
}

export default WalletCard
