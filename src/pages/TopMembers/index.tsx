import React, { useEffect, useState, lazy, Suspense } from "react"
import { useScroll } from "react-use"
import Member from "components/Member"
import ReactPaginate from "react-paginate"
import TopMembersBar from "components/TopMembersBar"
import MemberMobile from "components/MemberMobile"
import { GuardSpinner, SpiralSpinner } from "react-spinners-kit"
import { Text, Flex, Center, useBreakpoint } from "theme"
import { usePoolsFilters, usePools } from "state/pools/hooks"
import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock"

import prev from "assets/icons/pagination-prev.svg"
import next from "assets/icons/pagination-next.svg"

import loadMore from "assets/icons/swipe-arrow-down.svg"

import {
  StyledTopMembers,
  MembersList,
  MembersGrid,
  ListContainer,
  LoadMoreIcon,
} from "./styled"

import "./pagination.css"

const Profile = lazy(() => import("pages/Profile"))

const Loader: React.FC<{
  r: any
  isLoading: boolean
  handleMore: () => void
}> = ({ r, isLoading, handleMore }) => {
  const { y } = useScroll(r)
  const scrollableDistance = r?.current?.scrollHeight - r?.current?.clientHeight

  const getAnimation = () => {
    // const isBottom = scrollableDistance - y <= 0
    if (scrollableDistance - y <= -100) {
      handleMore()
    }
    if (scrollableDistance - y <= -50) {
      return "visible2x"
    }
    if (scrollableDistance - y <= -30 || isLoading) {
      return "visible"
    }

    return "hidden"
  }

  return (
    <LoadMoreIcon
      variants={{
        hidden: { opacity: 0, y: -30, scale: 0 },
        visible: { opacity: 1, y: -20, scale: 1 },
        visible2x: { opacity: 1, y: 0, scale: 1.1 },
      }}
      animate={getAnimation()}
    >
      {isLoading ? (
        <SpiralSpinner size={30} loading />
      ) : (
        <img src={loadMore} alt="looad more" />
      )}
    </LoadMoreIcon>
  )
}

function TopMembers() {
  console.log("top members render")
  const [pageCount, setPage] = useState(50)
  const scrollRef = React.useRef<any>(null)

  const [pools, isLoading, loadMorePools] = usePools()
  const [filters] = usePoolsFilters()
  const breakpoint = useBreakpoint()
  const isMobile = breakpoint === "xs"

  // manually disable scrolling *refresh this effect when ref container dissapeared from DOM
  useEffect(() => {
    if (!scrollRef.current) return
    disableBodyScroll(scrollRef.current)

    return () => clearAllBodyScrollLocks()
  }, [scrollRef, filters.listStyle, isLoading])

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

  const cardView = isMobile ? (
    <div />
  ) : (
    <MembersGrid style={{ height: window.innerHeight - 118 }}>
      <Suspense fallback={loadingIndicator}>
        <Profile pools={pools} />
      </Suspense>
    </MembersGrid>
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
        style={{ height: window.innerHeight - 118 }}
      >
        {pools.map((pool, index) =>
          isMobile ? (
            <MemberMobile key={pool.pool_address} index={index} />
          ) : (
            <Member key={pool.pool_address} data={pool} />
          )
        )}
        <Loader
          isLoading={isLoading && !!pools.length}
          handleMore={loadMorePools}
          r={scrollRef}
        />
      </MembersList>

      {!isMobile && (
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
      )}
    </ListContainer>
  )

  const body = filters.listStyle === "card" ? cardView : listView

  return (
    <StyledTopMembers>
      <TopMembersBar />
      {isLoading && !pools.length ? loadingIndicator : body}
    </StyledTopMembers>
  )
}

export default TopMembers
