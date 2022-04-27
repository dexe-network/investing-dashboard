import React from "react"
import Confirm from "components/Confirm"
import DexeMinLogo from "assets/confirm-swap-icons/dexe-min-logo.svg"
import CryptocurrencyLogo from "assets/confirm-swap-icons/cryptocurrency-logo.svg"
import DownArrow from "assets/confirm-swap-icons/down-arrow-gray.svg"
import {
  ContainerContent,
  NumberCoinsContainer,
  CoinContainer,
  NumberContainer,
  CoinLogo,
  CoinName,
  Price,
  Amount,
  Arrow,
  AdditionalInfoContainer,
  DexePrice,
  CryptocurrencyPrice,
  MinReceived,
  TransactionCost,
  Title,
  ContainerBottom,
  PriceBottom,
  AmountBottom,
} from "./styled"
import Button from "components/Button"
import TokenIcon from "components/TokenIcon"

const ConfirmSwap = () => {
  return (
    <Confirm title="Confirm Swap" isOpen toggle={() => {}}>
      <ContainerContent>
        <NumberCoinsContainer>
          <CoinContainer>
            <CoinLogo>
              <TokenIcon />
            </CoinLogo>
            <CoinName>DEXE</CoinName>
          </CoinContainer>
          <NumberContainer>
            <Price>~$6.26</Price>
            <Amount>0.01</Amount>
          </NumberContainer>
        </NumberCoinsContainer>

        <Arrow>
          <img src={DownArrow} alt="down-arrow" />
        </Arrow>

        <NumberCoinsContainer>
          <CoinContainer>
            <CoinLogo>
              <TokenIcon />
            </CoinLogo>
            <CoinName>PZM</CoinName>
          </CoinContainer>
          <NumberContainer>
            <Price>~$6.26 (-0.1%)</Price>
            <Amount>6.2349301</Amount>
          </NumberContainer>
        </NumberCoinsContainer>
        <AdditionalInfoContainer>
          <DexePrice>
            <Title>DEXE price</Title>
            <ContainerBottom>
              <PriceBottom>~$625.77 </PriceBottom>
              <AmountBottom>622.33334456 PZM</AmountBottom>
            </ContainerBottom>
          </DexePrice>
          <CryptocurrencyPrice>
            <Title>PZM price</Title>
            <ContainerBottom>
              <PriceBottom> ~$1.01 </PriceBottom>
              <AmountBottom>0.356 DEXE</AmountBottom>
            </ContainerBottom>
          </CryptocurrencyPrice>
          <MinReceived>
            <Title>Minimum received</Title>
            <AmountBottom>6.3456 PZM</AmountBottom>
          </MinReceived>
          <TransactionCost>
            <Title>Transaction cost</Title>
            <ContainerBottom>
              <PriceBottom>~$3.2 </PriceBottom>
              <AmountBottom>0.0016 DEXE</AmountBottom>
            </ContainerBottom>
          </TransactionCost>
        </AdditionalInfoContainer>
        <Button full>Confirm Swap</Button>
      </ContainerContent>
    </Confirm>
  )
}

export default ConfirmSwap
