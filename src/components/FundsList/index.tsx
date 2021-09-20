import { useEffect, useState } from "react"
import styled from "styled-components"
import { useWeb3React } from "@web3-react/core"
import axios from "axios"
// import { motion } from "framer-motion"
import TokenIcon from "components/TokenIcon"
import PlusGreenFilled from "assets/icons/PlusGreenFilled"
import { Flex } from "theme"

import { IFund } from "constants/interfaces"
import { useSelectOwnedPools } from "state/user/hooks"

const Container = styled(Flex)`
  width: 100%;
  justify-content: center;
  padding: 20px 0;
  position: relative;
`

const DetailsText = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  height: 14px;
  color: #2680eb;
  font-size: 13px;
`

const CreateText = styled.div`
  font-size: 16px;
  /* color: #7fffd4; */
  color: #3e9b89;
  padding-left: 11px;
`

const FundsList: React.FC = () => {
  const { account } = useWeb3React()
  // const { toggleConnectWallet } = useConnectWalletContext()
  // const { toggleCreateFund } = useCreateFundContext()
  const ownedPools = useSelectOwnedPools()

  // const handleCreate = () => {
  //   if (account?.length !== 42) {
  //     toggleConnectWallet(true)
  //     return
  //   }

  //   toggleCreateFund(true)
  // }

  return (
    <Container>
      {!ownedPools || !ownedPools.length ? (
        <Flex>
          <PlusGreenFilled fill="#3E9B89" />
          <CreateText>
            Create a new fund <br /> \become a trader
          </CreateText>
        </Flex>
      ) : (
        <>
          {ownedPools.map((fund) => (
            <TokenIcon
              key={fund.poolAdr}
              src={`https://tokens.1inch.exchange/${fund.basicTokenAdr.toLowerCase()}.png`}
            />
          ))}
          <PlusGreenFilled fill="#53545A" />
          <DetailsText>Fund details</DetailsText>
        </>
      )}
    </Container>
  )
}

export default FundsList
