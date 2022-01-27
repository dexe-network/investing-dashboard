import React, { useEffect, useState } from "react"
import Member from "components/Member"
import ReactPaginate from "react-paginate"
import TopMembersBar from "components/TopMembersBar"
import MemberMobile from "components/MemberMobile"
import LoadMore from "components/LoadMore"
import { GuardSpinner } from "react-spinners-kit"
import { Text, Flex, Center, useBreakpoint, To } from "theme"
import { usePoolsFilters, usePools } from "state/pools/hooks"
import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock"

import prev from "assets/icons/pagination-prev.svg"
import next from "assets/icons/pagination-next.svg"

import { StyledTopMembers, MembersList, ListContainer } from "./styled"

import "./pagination.css"

function TopMembers() {
  const [pageCount, setPage] = useState(50)
  const scrollRef = React.useRef<any>(null)

  const [pools, isLoading, loadMorePools] = usePools()
  const [filters, dispatchFilter] = usePoolsFilters()

  // manually disable scrolling *refresh this effect when ref container dissapeared from DOM
  useEffect(() => {
    if (!scrollRef.current) return
    disableBodyScroll(scrollRef.current)

    return () => clearAllBodyScrollLocks()
  }, [scrollRef, filters.listType, isLoading])

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

  const listView = (
    <ListContainer
      initial={{ y: -62 }}
      animate={{ y: 0 }}
      exit={{ y: -62 }}
      transition={{ duration: 0.5, ease: [0.29, 0.98, 0.29, 1] }}
    >
      <MembersList
        onTouchMove={(e) => console.log(e)}
        ref={scrollRef}
        style={{ height: window.innerHeight - 117 }}
      >
        {pools.map((pool, index) => (
          <To key={pool.address} to={`/pool/profile/${pool.address}`}>
            <MemberMobile data={pool} index={index} />
          </To>
        ))}
        {/* // TODO: make loading indicator stick to bottom of the list */}
        <LoadMore
          isLoading={isLoading && !!pools.length}
          handleMore={loadMorePools}
          r={scrollRef}
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

  const body = listView

  return (
    <StyledTopMembers>
      <TopMembersBar />
      {isLoading && !pools.length ? loadingIndicator : body}
    </StyledTopMembers>
  )
}

export default TopMembers
