import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock"

import { useActiveWeb3React } from "hooks"
import { TransactionDetails, TransactionType } from "state/transactions/types"

import Invest from "assets/icons/Invest"
import Withdraw from "assets/icons/Withdraw"
import Swap from "assets/icons/Swap"
import Expand from "assets/icons/Expand"
import Shrink from "assets/icons/Shrink"

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

  const scrollRef = useRef<any>(null)
  const [scrollH, setScrollH] = useState<string | number>("initial")
  const toggleExpanded = () => setExpanded(!expanded)

  useEffect(() => {
    if (!scrollRef.current) return
    disableBodyScroll(scrollRef.current)

    return () => clearAllBodyScrollLocks()
  }, [])

  useEffect(() => {
    if (!scrollRef.current) return

    const listRect = scrollRef.current.getBoundingClientRect()
    const bottomBarH = 49

    setScrollH(window.innerHeight - listRect.top - bottomBarH)
  }, [expanded])

  return (
    <>
      <Container>
        <Header>
          <HeaderButton
            onClick={() => setFilter(filterTypes.DEPOSIT)}
            focused={filter === filterTypes.DEPOSIT}
          >
            Investing <Invest active={filter === filterTypes.DEPOSIT} />
          </HeaderButton>
          <HeaderButton
            onClick={() => setFilter(filterTypes.SWAP)}
            focused={filter === filterTypes.SWAP}
          >
            Swap <Swap active={filter === filterTypes.SWAP} />
          </HeaderButton>
          <HeaderButton
            onClick={() => setFilter(filterTypes.WITHDRAW)}
            focused={filter === filterTypes.WITHDRAW}
          >
            Withdraw <Withdraw active={filter === filterTypes.WITHDRAW} />
          </HeaderButton>
          <HeaderButton focused={expanded} onClick={toggleExpanded}>
            {expanded ? <Shrink active /> : <Expand />}
          </HeaderButton>
        </Header>
        <List ref={scrollRef} style={{ height: scrollH }}>
          {list.length ? (
            list.map((tx) => (
              <Card key={tx.hash} payload={tx} chainId={chainId} />
            ))
          ) : (
            <ListPlaceholder>
              Your transactions will appear here....
            </ListPlaceholder>
          )}
        </List>
      </Container>
    </>
  )
}

export default TransactionHistory
