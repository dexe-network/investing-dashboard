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
  background: linear-gradient(
    243deg,
    rgba(41, 49, 52, 1) 0%,
    rgba(53, 52, 75, 1) 100%
  );
  height: 70px;
  width: 100%;
  border-radius: 10px;
  width: 100%;
  box-shadow: 0 3px 15px 0 rgba(0, 0, 0, 0.35);
  padding: 15px 18px;
  user-select: none;
`

const Label = styled.div`
  color: #707070;
  font-size: 14px;
  font-weight: 300;
`

const Address = styled.div`
  color: #999999;
  font-size: 22px;
  font-weight: 500;
`

const Change = styled.div`
  color: #999999;
  font-size: 14px;
  font-style: italic;
  cursor: pointer;
`

const TokenName = styled.div`
  font-size: 14px;
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
        <Label>Connected with {wallet}</Label>
        <Change>Change</Change>
      </Flex>
      <Flex p="5px 0 0" full>
        <Flex ai="center">
          <Address>{shortenAddress(account)}</Address>
          <LinkIcon fill="#2680EB" />
        </Flex>
        <Flex>
          <TokenIcon size={26} src={tokens[props.token]?.logoURI} />
          <TokenName>{tokens[props.token]?.symbol}</TokenName>
        </Flex>
      </Flex>
    </Card>
  )
}

export default WalletCard
