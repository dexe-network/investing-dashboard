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
  background: #2f333b;
  border-radius: 6px;
  height: 47px;
  width: 100%;
  padding: 5px 18px;
  user-select: none;
`

const Label = styled.div`
  font-family: Gilroy;
  font-style: normal;
  font-family: "Gilroy-Regular";
font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.5px;
  color: #75ddc1;
`

const Address = styled.div`
  font-family: Gilroy;
  font-style: normal;
  font-family: "Gilroy-Regular";
font-weight: 400;
  font-size: 18px;
  line-height: 22px;

  display: flex;
  align-items: center;

  color: #aeb0b2;
`

const Change = styled.div`
  font-family: Gilroy;
  font-style: normal;
  font-family: "Gilroy-Regular";
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
  font-family: "Gilroy-Bold";
font-weight: 700;;
`

const TokenName = styled.div`
  font-size: 14px;
  font-family: "Gilroy-Medium";
font-weight: 500;
  color: #f5f5f5;
  text-transform: uppercase;
`

interface IProps {
  token: string
}

const WalletCard: React.FC<IProps> = (props) => {
  const [list, tokens] = useTokensList()
  const { account } = useWeb3React()
  const wallet = useActiveWallet()

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
          <TokenIcon
            size={20}
            src={tokens[props.token.toLowerCase()]?.logoURI}
          />
          <TokenName>{tokens[props.token.toLowerCase()]?.symbol}</TokenName>
        </Flex>
      </Flex>
    </Card>
  )
}

export default WalletCard
