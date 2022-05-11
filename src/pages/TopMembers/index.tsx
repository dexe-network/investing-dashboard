import { Flex, Center, To } from "theme"
import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { CubeSpinner } from "react-spinners-kit"
import { Routes, Route } from "react-router-dom"
import { createClient, Provider as GraphProvider } from "urql"
import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock"

import TopMembersBar from "components/TopMembersBar"
import MemberMobile from "components/MemberMobile"
import LoadMore from "components/LoadMore"

import { usePools } from "state/pools/hooks"
import { PoolType } from "constants/interfaces_v2"

import {
  selectBasicPools,
  selectInvestPools,
  selectPools,
} from "state/pools/selectors"

import {
  StyledTopMembers,
  MembersList,
  ListContainer,
  LoadingText,
} from "./styled"

// THE GRAPH CLIENT
const AllPoolsClient = createClient({
  url: process.env.REACT_APP_ALL_POOLS_API_URL || "",
})

interface Props {
  poolType: PoolType
}

const List: React.FC<Props> = ({ poolType }) => {
  const investScrollRef = React.useRef<any>(null)
  const ALL_POOL = useSelector(selectPools)
  const BASIC_POOL = useSelector(selectBasicPools)
  const INVEST_POOL = useSelector(selectInvestPools)
  const [isLoading, loadMore] = usePools(poolType)

  const pools = {
    ALL_POOL,
    BASIC_POOL,
    INVEST_POOL,
  }

  // manually disable scrolling *refresh this effect when ref container dissapeared from DOM
  useEffect(() => {
    if (!investScrollRef.current) return
    disableBodyScroll(investScrollRef.current)

    return () => clearAllBodyScrollLocks()
  }, [investScrollRef, isLoading])

  return isLoading && !pools[poolType].length ? (
    <Center>
      <CubeSpinner size={40} loading />
      <Flex p="10px 0">
        <LoadingText>Retrieving pools</LoadingText>
      </Flex>
    </Center>
  ) : (
    <ListContainer>
      <MembersList
        ref={investScrollRef}
        style={{ height: window.innerHeight - 117 }}
      >
        {pools[poolType].map((pool, index) => (
          <To key={pool.id} to={`/pool/profile/${pool.type}/${pool.id}`}>
            <Flex p="16px 0 0" full>
              <MemberMobile data={pool} index={index} />
            </Flex>
          </To>
        ))}
        {/* // TODO: make loading indicator stick to bottom of the list */}
        <LoadMore
          isLoading={isLoading && !!pools[poolType].length}
          handleMore={loadMore}
          r={investScrollRef}
        />
      </MembersList>
    </ListContainer>
  )
}

function TopMembers() {
  return (
    <StyledTopMembers>
      <TopMembersBar />
      <GraphProvider value={AllPoolsClient}>
        <Routes>
          <Route path="" element={<List poolType="ALL_POOL" />}></Route>
          <Route path="basic" element={<List poolType="BASIC_POOL" />}></Route>
          <Route
            path="invest"
            element={<List poolType="INVEST_POOL" />}
          ></Route>
        </Routes>
      </GraphProvider>
    </StyledTopMembers>
  )
}

export default TopMembers
