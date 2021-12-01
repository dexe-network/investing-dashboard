import styled from "styled-components"
import { Flex, ease } from "theme"
import TokenIcon from "components/TokenIcon"
import { useERC20 } from "hooks/useContract"
import { ethers } from "ethers"
import { IPoolPosition, IPoolTransaction } from "constants/interfaces"
import { CircleSpinner } from "react-spinners-kit"
import { format } from "date-fns"

import {
  gradients,
  Wrapper,
  BaseInfo,
  From,
  To,
  Amount,
  AmountSymbol,
  Buy,
  Sell,
  PrimaryText,
  SecondaryText,
  TotalSymbol,
  PositionInfo,
  Price,
  Total,
  Date,
} from "./styled"

export const Container = styled.div`
  padding: 3px 0 0 0;
  width: 100%;
  display: grid;
  grid-auto-columns: 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 0px 0px;
  grid-template-areas:
    "content . ."
    ". . ."
    ". . .";
  justify-items: stretch;
  align-items: stretch;
`

const Avatar = styled.div`
  width: 32px;
  height: 32px;
  margin-right: 10px;
`

interface IProps {
  data: IPoolPosition
  onClick?: () => void
  active: boolean
  isAnySelected: boolean
}

export const TradesTotalItem: React.FC<IProps> = ({
  data,
  onClick,
  active,
  isAnySelected,
}) => {
  const [tokenContract, tokenData] = useERC20(data.tokenAddress)
  const [baseContract, baseData] = useERC20(data.baseAddress)

  if (!tokenContract || !tokenData || !baseContract || !baseData) {
    return (
      <Wrapper
        key={data.id}
        shadow={active}
        variants={{
          collapsed: {
            transition: { delay: 0, ease, duration: 0.2 },
          },
          open: {
            transition: { delay: 0.5, ease, duration: 0.4 },
          },
        }}
        gradient={gradients.default}
      >
        <Avatar>
          <CircleSpinner color="#2680EB" size={15} loading />
        </Avatar>
        <Container>
          <To>LOADING</To>
          <PrimaryText>
            xxx
            <TotalSymbol>symbol</TotalSymbol>
          </PrimaryText>
          <PrimaryText>
            xxx
            <TotalSymbol>symbol</TotalSymbol>
          </PrimaryText>
          <Flex>
            <Amount>xxx</Amount>
            <AmountSymbol>symbol</AmountSymbol>
          </Flex>
          <SecondaryText>xxx USDt</SecondaryText>
          <SecondaryText>xxx USDt</SecondaryText>
        </Container>
      </Wrapper>
    )
  }

  const basePrice = ethers.utils
    .formatUnits(data.avgBasePrice.toString())
    .toString()

  const baseTotal = ethers.utils
    .formatUnits(data.avgBasePrice.mul(data.amount).toString())
    .toString()

  const stablePrice = ethers.utils
    .formatUnits(data.avgStablePrice.toString(), 6)
    .toString()

  const stableTotal = ethers.utils
    .formatUnits(data.avgStablePrice.mul(data.amount).toString(), 6)
    .toString()

  const pnlBase = ethers.utils.formatUnits(data.pnlBase.toString()).toString()
  const pnlStable = ethers.utils
    .formatUnits(data.pnlStable.toString(), 6)
    .toString()

  return (
    <Wrapper
      op={isAnySelected ? 1 : !active ? 0.2 : 1}
      gradient={gradients.default}
      onClick={onClick}
    >
      <TokenIcon
        src={`https://tokens.1inch.exchange/${data.tokenAddress.toLowerCase()}.png`}
        size={32}
      />
      <Container>
        <To>{tokenData.name}</To>
        <PrimaryText>
          {basePrice}
          <TotalSymbol>{baseData.symbol}</TotalSymbol>
        </PrimaryText>
        <PrimaryText>
          {baseTotal}
          <TotalSymbol>{baseData.symbol}</TotalSymbol>
        </PrimaryText>

        <Flex>
          <Amount>{data.amount.toString()}</Amount>
          <AmountSymbol>{tokenData.symbol}</AmountSymbol>
        </Flex>
        <SecondaryText>{stablePrice} USDt</SecondaryText>
        <SecondaryText>{stableTotal} USDt</SecondaryText>

        <From>
          pnl:
          {data.pnl < 0 ? <Sell>{data.pnl}%</Sell> : <Buy> {data.pnl}%</Buy>}
        </From>
        {data.pnl < 0 ? (
          <Sell>
            {pnlBase} {baseData.symbol}
          </Sell>
        ) : (
          <Buy>
            {" "}
            {pnlBase} {baseData.symbol}
          </Buy>
        )}
        {data.pnl < 0 ? (
          <Sell>{pnlStable} USDt</Sell>
        ) : (
          <Buy> {pnlStable} USDt</Buy>
        )}
      </Container>
    </Wrapper>
  )
}

const TradesListItem: React.FC<{ data: IPoolTransaction }> = ({ data }) => {
  const { path } = data
  const [path1Contract, path0] = useERC20(path[0])
  const [path2Contract, path1] = useERC20(path[1])

  if (!path1Contract || !path0 || !path2Contract || !path1) {
    return (
      <Wrapper
        key={data.txId}
        variants={{
          collapsed: {
            transition: { delay: 0, ease, duration: 0.2 },
          },
          open: {
            transition: { delay: 0.5, ease, duration: 0.4 },
          },
        }}
        gradient={gradients[data.status.toLowerCase()]}
      >
        <Avatar>
          <CircleSpinner color="#2680EB" size={15} loading />
        </Avatar>
        <Container>
          <To>LOADING</To>
          <PrimaryText>
            xxx
            <TotalSymbol>symbol</TotalSymbol>
          </PrimaryText>
          <PrimaryText>
            xxx
            <TotalSymbol>symbol</TotalSymbol>
          </PrimaryText>
          <Flex>
            <Amount>xxx</Amount>
            <AmountSymbol>symbol</AmountSymbol>
          </Flex>
          <SecondaryText>xxx USDt</SecondaryText>
          <SecondaryText>xxx USDt</SecondaryText>
        </Container>
      </Wrapper>
    )
  }

  const basePrice = ethers.utils
    .formatUnits(data.basePrice.toString())
    .toString()

  const baseTotal = ethers.utils
    .formatUnits(data.basePrice.mul(data.amount).toString())
    .toString()

  const stablePrice = ethers.utils
    .formatUnits(data.stablePrice.toString(), 6)
    .toString()

  const stableTotal = ethers.utils
    .formatUnits(data.stablePrice.mul(data.amount).toString(), 6)
    .toString()

  return (
    <Wrapper
      key={data.txId}
      variants={{
        collapsed: {
          transition: { delay: 0, ease, duration: 0.2 },
        },
        open: {
          transition: { delay: 0.5, ease, duration: 0.4 },
        },
      }}
      gradient={gradients[data.status.toLowerCase()]}
    >
      <TokenIcon
        src={`https://tokens.1inch.exchange/${path[1].toLowerCase()}.png`}
        size={32}
      />
      <Container>
        <Flex>
          <From>{path0.symbol}/</From>
          <To>{path1.symbol}</To>
        </Flex>
        <PrimaryText>
          {basePrice}
          <TotalSymbol>
            {data.status === "SELL" ? path1.symbol : path0.symbol}
          </TotalSymbol>
        </PrimaryText>
        <PrimaryText>
          {baseTotal}
          <TotalSymbol>
            {data.status === "SELL" ? path1.symbol : path0.symbol}
          </TotalSymbol>
        </PrimaryText>

        <Flex>
          {data.status === "BUY" ? <Buy>buy</Buy> : <Sell>sell</Sell>}
          <Amount>{data.amount.toString()}</Amount>
          <AmountSymbol>
            {data.status === "SELL" ? path0.symbol : path1.symbol}
          </AmountSymbol>
        </Flex>
        <SecondaryText>{stablePrice} USDt</SecondaryText>
        <SecondaryText>{stableTotal} USDt</SecondaryText>

        <div></div>
        <div></div>
        <Date>{format(data.timestamp, "MMM d, yyyy kk:mm")}</Date>
      </Container>
    </Wrapper>
  )
}

export default TradesListItem
