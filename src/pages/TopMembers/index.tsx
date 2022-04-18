import React, { useEffect } from "react"
import TopMembersBar from "components/TopMembersBar"
import MemberMobile from "components/MemberMobile"
import LoadMore from "components/LoadMore"
import { CubeSpinner } from "react-spinners-kit"
import { Flex, Center, To } from "theme"
import { createClient, Provider as GraphProvider } from "urql"
import { usePools } from "state/pools/hooks"
import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock"
import { Routes, Outlet, Route } from "react-router-dom"

// THE GRAPH CLIENT
const AllPoolsClient = createClient({
  url: process.env.REACT_APP_ALL_POOLS_API_URL || "",
})

import {
  StyledTopMembers,
  MembersList,
  ListContainer,
  LoadingText,
} from "./styled"

import "./pagination.css"
import { useSelector } from "react-redux"
import { selectPools } from "state/pools/selectors"
import { PoolType } from "constants/interfaces_v2"

interface Props {
  poolType: PoolType
}

const List: React.FC<Props> = ({ poolType }) => {
  const investScrollRef = React.useRef<any>(null)
  const pools = useSelector(selectPools)
  const [isLoading, loadMore] = usePools(poolType)

  // manually disable scrolling *refresh this effect when ref container dissapeared from DOM
  useEffect(() => {
    if (!investScrollRef.current) return
    disableBodyScroll(investScrollRef.current)

    return () => clearAllBodyScrollLocks()
  }, [investScrollRef, isLoading])

  return isLoading && !pools.length ? (
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
        {pools.map((pool, index) => (
          <To key={pool.id} to={`/pool/profile/${pool.type}/${pool.id}`}>
            <Flex p="16px 0 0" full>
              <MemberMobile data={pool} index={index} />
            </Flex>
          </To>
        ))}
        {/* // TODO: make loading indicator stick to bottom of the list */}
        <LoadMore
          isLoading={isLoading && !!pools.length}
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
          <Route path="/" element={<List poolType="all" />}></Route>
          <Route path="basic" element={<List poolType="basic" />}></Route>
          <Route path="invest" element={<List poolType="invest" />}></Route>
        </Routes>
      </GraphProvider>
    </StyledTopMembers>
  )
}

export default TopMembers
