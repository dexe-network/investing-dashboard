import { Dispatch, SetStateAction } from "react"

import { useActiveWeb3React } from "hooks"
import { TransactionDetails, TransactionType } from "state/transactions/types"

import Invest from "assets/icons/Invest"
import Withdraw from "assets/icons/Withdraw"
import Swap from "assets/icons/Swap"
import Expand from "assets/icons/Expand"

import {
  Container,
  Header,
  HeaderButton,
  List,
  ListPlaceholder,
} from "./styled"

import Card from "./Card"

interface IProps {
  list: TransactionDetails[]
  filter: TransactionType
  filterTypes: any
  expanded: boolean
  setFilter: Dispatch<SetStateAction<TransactionType>>
  setExpanded: Dispatch<SetStateAction<boolean>>
}

const TransactionHistory: React.FC<IProps> = ({
  list,
  filter,
  filterTypes,
  expanded,
  setExpanded,
  setFilter,
}) => {
  const { chainId } = useActiveWeb3React()
  const toggleExpanded = () => {
    setExpanded(!expanded)
  }

  return (
    <>
      <Container>
        <Header>
          <HeaderButton
            onClick={() => setFilter(filterTypes.DEPOSIT)}
            focused={filter === filterTypes.DEPOSIT}
          >
            Investing <Invest />
          </HeaderButton>
          <HeaderButton
            onClick={() => setFilter(filterTypes.SWAP)}
            focused={filter === filterTypes.SWAP}
          >
            Swap <Swap />
          </HeaderButton>
          <HeaderButton
            onClick={() => setFilter(filterTypes.WITHDRAW)}
            focused={filter === filterTypes.WITHDRAW}
          >
            Withdraw <Withdraw />
          </HeaderButton>
          <HeaderButton focused={expanded} onClick={toggleExpanded}>
            <Expand />
          </HeaderButton>
        </Header>
        {list.length ? (
          <List>
            {list.map((tx) => (
              <Card key={tx.hash} payload={tx} chainId={chainId} />
            ))}
          </List>
        ) : (
          <ListPlaceholder>
            Your transactions will appear here....
          </ListPlaceholder>
        )}
      </Container>
    </>
  )
}

export default TransactionHistory
