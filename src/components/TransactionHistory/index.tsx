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
  Heading,
  Content,
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

const barH = 52
const titleMB = 24

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
  const titleRef = useRef<any>(null)

  const [scrollH, setScrollH] = useState<number>(0)
  const [initialTop, setInitialTop] = useState<number>(0)
  const toggleExpanded = () => setExpanded(!expanded)

  useEffect(() => {
    if (!scrollRef.current) return
    disableBodyScroll(scrollRef.current)

    return () => clearAllBodyScrollLocks()
  }, [])

  useEffect(() => {
    if (!titleRef.current) return

    const titleRect = titleRef.current.getBoundingClientRect()
    setInitialTop(titleRect.bottom + titleMB)
  }, [titleRef])

  useEffect(() => {
    if (expanded) {
      setScrollH(window.innerHeight - barH * 2)
    } else {
      const t = setTimeout(() => {
        setScrollH(window.innerHeight - initialTop - barH * 2)
        clearTimeout(t)
      }, 400)
    }
  }, [expanded, initialTop])

  return (
    <Container>
      <Heading ref={titleRef}>Transactions History</Heading>
      <Content
        style={{
          background: "linear-gradient(64.44deg, #0c1017 32.35%, #181d26 100%)",
        }}
        animate={expanded ? "visible" : "hidden"}
        initial="hidden"
        transition={{ duration: 0.4 }}
        variants={{
          visible: {
            top: 55,
            height: "100vh",
          },
          hidden: {
            top: "initial",
            height: window.innerHeight - initialTop,

            transitionEnd: { background: "transparent" },
          },
        }}
      >
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
          <HeaderButton onClick={toggleExpanded}>
            {expanded ? <Shrink /> : <Expand />}
          </HeaderButton>
        </Header>
        <List
          ref={scrollRef}
          style={{
            height: scrollH,
          }}
        >
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
      </Content>
    </Container>
  )
}

export default TransactionHistory
