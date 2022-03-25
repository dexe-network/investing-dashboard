import React, { useEffect, useState } from "react"
import Member from "components/Member"
import ReactPaginate from "react-paginate"
import TopMembersBar from "components/TopMembersBar"
import MemberMobile from "components/MemberMobile"
import LoadMore from "components/LoadMore"
import { CubeSpinner } from "react-spinners-kit"
import { Text, Flex, Center, useBreakpoint, To } from "theme"
import { createClient, Provider as GraphProvider } from "urql"
import {
  usePoolsFilters,
  useBasicPools,
  useInvestPools,
} from "state/pools/hooks"
import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock"

import prev from "assets/icons/pagination-prev.svg"
import next from "assets/icons/pagination-next.svg"

// THE GRAPH CLIENT
const basicPoolsClient = createClient({
  url: "https://api.thegraph.com/subgraphs/name/volodymyrzolotukhin/dexe-chapel-basic-pool",
})
const investPoolsClient = createClient({
  url: "https://api.thegraph.com/subgraphs/name/volodymyrzolotukhin/dexe-chapel-invest-pool",
})

import {
  StyledTopMembers,
  MembersList,
  ListContainer,
  LoadingText,
} from "./styled"

import "./pagination.css"
import { useSelector } from "react-redux"
import { selectBasicPools, selectInvestPools } from "state/pools/selectors"

const BasicPoolsList = () => {
  const basicScrollRef = React.useRef<any>(null)
  const basicPools = useSelector(selectBasicPools)
  const [isBasicLoading, loadMoreBasicPools] = useBasicPools()

  // manually disable scrolling *refresh this effect when ref container dissapeared from DOM
  // useEffect(() => {
  //   if (!basicScrollRef.current) return
  //   disableBodyScroll(basicScrollRef.current)

  //   return () => clearAllBodyScrollLocks()
  // }, [basicScrollRef, filters.listType, isBasicLoading])
  return isBasicLoading && !basicPools.length ? (
    <Center>
      <CubeSpinner size={40} loading />
      <Flex p="10px 0">
        <LoadingText>Retrieving Basic pools</LoadingText>
      </Flex>
    </Center>
  ) : (
    <ListContainer>
      <MembersList
        ref={basicScrollRef}
        style={{ height: window.innerHeight - 117 }}
      >
        {basicPools.map((pool, index) => (
          <To key={pool.id} to={`/pool/profile/basic/${pool.id}`}>
            <Flex p="16px 0 0" full>
              <MemberMobile data={pool} index={index} />
            </Flex>
          </To>
        ))}
        {/* // TODO: make loading indicator stick to bottom of the list */}
        <LoadMore
          isLoading={isBasicLoading && !!basicPools.length}
          handleMore={loadMoreBasicPools}
          r={basicScrollRef}
        />
      </MembersList>

      {/* // TODO: PAGINATION */}

      {/* {!isMobile && (
          <ReactPaginate
            previousLabel={<img src={prev} />}
            nextLabel={<img src={next} />}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={pageCount}
            marginPagesDisplayed={1}
            pageRangeDisplayed={4}
            // onPageChange={({ selected }) => console.log(selected)}
            containerClassName={"pagination"}
            activeClassName={"active"}
          />
        )} */}
    </ListContainer>
  )
}

const InvestPoolsList = () => {
  const investScrollRef = React.useRef<any>(null)
  const investPools = useSelector(selectInvestPools)
  const [isInvestLoading, loadMoreInvestPools] = useInvestPools()

  // // manually disable scrolling *refresh this effect when ref container dissapeared from DOM
  // useEffect(() => {
  //   if (!investScrollRef.current) return
  //   disableBodyScroll(investScrollRef.current)

  //   return () => clearAllBodyScrollLocks()
  // }, [investScrollRef, filters.listType, isInvestLoading])

  return isInvestLoading && !investPools.length ? (
    <Center>
      <CubeSpinner size={40} loading />
      <Flex p="10px 0">
        <LoadingText>Retrieving Invest pools</LoadingText>
      </Flex>
    </Center>
  ) : (
    <ListContainer>
      <MembersList
        ref={investScrollRef}
        style={{ height: window.innerHeight - 117 }}
      >
        {investPools.map((pool, index) => (
          <To key={pool.id} to={`/pool/profile/invest/${pool.id}`}>
            <Flex p="16px 0 0" full>
              <MemberMobile data={pool} index={index} />
            </Flex>
          </To>
        ))}
        {/* // TODO: make loading indicator stick to bottom of the list */}
        <LoadMore
          isLoading={isInvestLoading && !!investPools.length}
          handleMore={loadMoreInvestPools}
          r={investScrollRef}
        />
      </MembersList>

      {/* // TODO: PAGINATION */}

      {/* {!isMobile && (
            <ReactPaginate
              previousLabel={<img src={prev} />}
              nextLabel={<img src={next} />}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={pageCount}
              marginPagesDisplayed={1}
              pageRangeDisplayed={4}
              // onPageChange={({ selected }) => console.log(selected)}
              containerClassName={"pagination"}
              activeClassName={"active"}
            />
          )} */}
    </ListContainer>
  )
}

function TopMembers() {
  const [pageCount, setPage] = useState(50)

  const [filters, dispatchFilter] = usePoolsFilters()

  const body =
    filters.listType === "basic" ? (
      <GraphProvider value={basicPoolsClient}>
        <BasicPoolsList />
      </GraphProvider>
    ) : (
      <GraphProvider value={investPoolsClient}>
        <InvestPoolsList />
      </GraphProvider>
    )

  return (
    <StyledTopMembers>
      <TopMembersBar />
      {body}
    </StyledTopMembers>
  )
}

export default TopMembers
