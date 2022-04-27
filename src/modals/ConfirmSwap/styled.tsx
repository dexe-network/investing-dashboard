import styled from "styled-components"
import { GradientBorder } from "theme"

export const ContainerContent = styled.div`
  width: fill-available;
  padding-top: 32px;
  box-sizing: border-box;
`

export const NumberCoinsContainer = styled(GradientBorder)`
  padding: 8px 16px 8px 10px;
  box-sizing: border-box;
  border-radius: 10px;
  width: fill-available;
`

export const CoinContainer = styled.div`
  display: flex;
  align-items: center;
`

export const CoinLogo = styled.div`
  display: flex;
  align-items: center;
`

export const CoinName = styled.div`
  display: flex;
  align-items: center;
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 16px;
  color: #e4f2ff;
  transform: translateY(2px);
`

export const NumberContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const Price = styled.div`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 10px;
  text-align: right;
  color: #616d8b;
  margin-bottom: 8px;
`

export const Amount = styled.div`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 20px;
  text-align: right;
  letter-spacing: -0.03em;
  color: #e4f2ff;
`

export const Arrow = styled.div`
  padding: 4px 0;
  box-sizing-border-box;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const AdditionalInfoContainer = styled.div`
  width: fill-available;
  padding: 24px 0;
  box-sizing: border-box;
`

export const DexePrice = styled.div`
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const CryptocurrencyPrice = styled.div`
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const MinReceived = styled.div`
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const TransactionCost = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const Title = styled.div`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 100%;
  letter-spacing: 0.03em;
  color: #e4f2ff;
`

export const ContainerBottom = styled.div`
  display: flex;
`

export const PriceBottom = styled.div`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 100%;
  text-align: right;
  letter-spacing: 0.03em;
  color: #616d8b;
  margin-right: 5px;
`

export const AmountBottom = styled.div`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 100%;
  text-align: right;
  letter-spacing: 0.03em;
  color: #e1f2ff;
`
