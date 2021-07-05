import Modal from "styled-react-modal"
import { Flex, Text } from "theme"
import closeIcon from "assets/icons/modal-close.svg"

import TokenIcon from "components/TokenIcon"

import {
  Title,
  Input,
  CommonsList,
  CommonItem,
  FullList,
  FullItem,
  Price,
  Close,
} from "./styled"

const StyledModal = Modal.styled`
  box-shadow: 0 3px 30px rgba(0, 0, 0, 0.4);
  background: linear-gradient(233deg, rgba(53,52,75,1) 0%, rgba(41,49,52,1) 100%);
  padding: 17px 15px 15px;
  border-radius: 5px;
  width: 331px;
  height: fit-content;
`

export default function TokenSelector({ isOpen, onRequestClose }) {
  const commonsList = [
    {
      symbol: "ETH",
      address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
    },
    {
      symbol: "SBNB",
      address: "0x617aecb6137b5108d1e7d4918e3725c8cebdb848",
    },
    {
      symbol: "BUSD",
      address: "0x4fabb145d64652a948d72533023f6e7a623c7c53",
    },
    {
      symbol: "USDT",
      address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
    },
    {
      symbol: "IBTC",
      address: "0xd6014ea05bde904448b743833ddf07c3c7837481",
    },
    {
      symbol: "DAI",
      address: "0x6b175474e89094c44da98b954eedeac495271d0f",
    },
  ]

  const tokensList = [
    {
      symbol: "ETH",
      name: "Ethereum",
      price: 2500,
      address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
    },
    {
      symbol: "SBNB",
      name: "Synth BNB",
      price: 300,
      address: "0x617aecb6137b5108d1e7d4918e3725c8cebdb848",
    },
    {
      symbol: "BUSD",
      name: "B-USD token",
      price: 1,
      address: "0x4fabb145d64652a948d72533023f6e7a623c7c53",
    },
    {
      symbol: "USDT",
      name: "Tether",
      price: 1,
      address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
    },
    {
      symbol: "IBTC",
      name: "BITCOIN",
      price: 32493,
      address: "0xd6014ea05bde904448b743833ddf07c3c7837481",
    },
    {
      symbol: "DAI",
      name: "DAI",
      price: 253,
      address: "0x6b175474e89094c44da98b954eedeac495271d0f",
    },
  ]

  return (
    <StyledModal
      isOpen={isOpen}
      onBackgroundClick={onRequestClose}
      onEscapeKeydown={onRequestClose}
    >
      <Flex full p="0 0 15px">
        <Title>Select a token</Title>
        <Close src={closeIcon} alt="" />
      </Flex>
      <Input placeholder="Search name or address" />

      <Flex p="8px 0 6px">
        <Title>Common bases</Title>
      </Flex>

      <CommonsList>
        {commonsList.map((item) => (
          <CommonItem key={item.address}>
            <TokenIcon
              src={`https://tokens.1inch.exchange/${item.address}.png`}
              size={28}
            />
            <Text color="#F7F7F7" fz={16}>
              {item.symbol}
            </Text>
          </CommonItem>
        ))}
      </CommonsList>

      <FullList>
        {tokensList.map((item) => (
          <FullItem full key={item.address}>
            <TokenIcon
              src={`https://tokens.1inch.exchange/${item.address}.png`}
              size={28}
            />
            <Flex dir="column" ai="flex-start" p="3px 0 0">
              <Text color="#F7F7F7" fz={16}>
                {item.symbol}
              </Text>
              <Text color="#999999" fz={14}>
                {item.name}
              </Text>
            </Flex>
            <Price>{item.price}</Price>
          </FullItem>
        ))}
      </FullList>
    </StyledModal>
  )
}
