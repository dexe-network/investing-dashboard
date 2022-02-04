import React, { useEffect, useState } from "react"
import Member from "components/Member"
import ReactPaginate from "react-paginate"
import TopMembersBar from "components/TopMembersBar"
import MemberMobile from "components/MemberMobile"
import LoadMore from "components/LoadMore"
import { GuardSpinner } from "react-spinners-kit"
import { Text, Flex, Center, useBreakpoint, To } from "theme"
import {
  usePoolsFilters,
  useBasicPools,
  useInvestPools,
} from "state/pools/hooks"
import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock"

import prev from "assets/icons/pagination-prev.svg"
import next from "assets/icons/pagination-next.svg"

import { StyledTopMembers, MembersList, ListContainer } from "./styled"

import "./pagination.css"

function TopMembers() {
  const [pageCount, setPage] = useState(50)
  const basicScrollRef = React.useRef<any>(null)
  const investScrollRef = React.useRef<any>(null)

  const [basicPools, isBasicLoading, loadMoreBasicPools] = useBasicPools()
  // const [investPools, isInvestLoading, loadMoreInvestPools] = useInvestPools()

  const [filters, dispatchFilter] = usePoolsFilters()

  // manually disable scrolling *refresh this effect when ref container dissapeared from DOM
  // useEffect(() => {
  //   if (!basicScrollRef.current) return
  //   disableBodyScroll(basicScrollRef.current)

  //   return () => clearAllBodyScrollLocks()
  // }, [basicScrollRef, filters.listType, isBasicLoading])

  // // manually disable scrolling *refresh this effect when ref container dissapeared from DOM
  // useEffect(() => {
  //   if (!investScrollRef.current) return
  //   disableBodyScroll(investScrollRef.current)

  //   return () => clearAllBodyScrollLocks()
  // }, [investScrollRef, filters.listType, isInvestLoading])

  const loadingIndicator = (
    <Center>
      <GuardSpinner size={30} loading />
      <Flex p="10px 0">
        <Text fz={16} align="center" color="#7FFFD4" fw={300}>
          Loading traders data
        </Text>
      </Flex>
    </Center>
  )

  const basicListView = (
    <ListContainer
      initial={{ y: -62 }}
      animate={{ y: 0 }}
      exit={{ y: -62 }}
      transition={{ duration: 0.5, ease: [0.29, 0.98, 0.29, 1] }}
    >
      <MembersList
        ref={basicScrollRef}
        style={{ height: window.innerHeight - 117 }}
      >
        {basicPools.map((pool, index) => (
          <To key={pool.address} to={`/pool/profile/${pool.address}`}>
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

  // const investListView = (
  //   <ListContainer
  //     initial={{ y: -62 }}
  //     animate={{ y: 0 }}
  //     exit={{ y: -62 }}
  //     transition={{ duration: 0.5, ease: [0.29, 0.98, 0.29, 1] }}
  //   >
  //     <MembersList
  //       ref={investScrollRef}
  //       style={{ height: window.innerHeight - 117 }}
  //     >
  //       {investPools.map((pool, index) => (
  //         <To key={pool.address} to={`/pool/profile/invest/${pool.address}`}>
  //           <Flex p="16px 0 0" full>
  //             <MemberMobile data={pool} index={index} />
  //           </Flex>
  //         </To>
  //       ))}
  //       {/* // TODO: make loading indicator stick to bottom of the list */}
  //       <LoadMore
  //         isLoading={isInvestLoading && !!investPools.length}
  //         handleMore={loadMoreInvestPools}
  //         r={investScrollRef}
  //       />
  //     </MembersList>

  //     {/* // TODO: PAGINATION */}

  //     {/* {!isMobile && (
  //       <ReactPaginate
  //         previousLabel={<img src={prev} />}
  //         nextLabel={<img src={next} />}
  //         breakLabel={"..."}
  //         breakClassName={"break-me"}
  //         pageCount={pageCount}
  //         marginPagesDisplayed={1}
  //         pageRangeDisplayed={4}
  //         // onPageChange={({ selected }) => console.log(selected)}
  //         containerClassName={"pagination"}
  //         activeClassName={"active"}
  //       />
  //     )} */}
  //   </ListContainer>
  // )

  const body = basicListView

  return (
    <StyledTopMembers>
      <TopMembersBar />
      {isBasicLoading && !basicPools.length ? loadingIndicator : body}
    </StyledTopMembers>
  )
}

export default TopMembers
