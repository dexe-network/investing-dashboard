import { useState, lazy, Suspense } from "react"
import styled from "styled-components"
import Member from "components/Member"
import ReactPaginate from "react-paginate"
import TopMembersBar from "components/TopMembersBar"
import MemberMobile from "components/MemberMobile"
import { GuardSpinner } from "react-spinners-kit"
import { Text, Flex, Center, useBreakpoint, device } from "theme"
import { useSelectPools } from "state/pools/hooks"
import { usePoolsFilters } from "state/pools/hooks"

import prev from "assets/icons/pagination-prev.svg"
import next from "assets/icons/pagination-next.svg"

import "./pagination.css"

const Profile = lazy(() => import("pages/Profile"))

const StyledTopMembers = styled.div`
  padding: 0;
`

const MembersList = styled.div`
  width: 100%;
  padding: 10px 0 30px;
  overflow: auto;

  @media only screen and (${device.sm}) {
    padding: 0 20px 0 0;
  }
`

const ListContainer = styled.div`
  padding: 0 0 0 20px;

  @media only screen and (${device.sm}) {
    padding: 0 0 0 10px;
  }
`

function TopMembers() {
  const pools = useSelectPools()
  const poolsLoading = !pools.length

  const [filters] = usePoolsFilters()
  const breakpoint = useBreakpoint()
  const [pageCount, setPage] = useState(50)

  const isMobile = breakpoint === "xs"

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

  if (poolsLoading) return loadingIndicator

  return (
    <StyledTopMembers>
      <TopMembersBar />

      {filters.listStyle === "card" ? (
        <Suspense fallback={loadingIndicator}>
          <Profile pools={pools} />
        </Suspense>
      ) : (
        <ListContainer>
          <MembersList
            style={{
              height: window.innerHeight - 118,
            }}
          >
            {pools.map((v) =>
              isMobile ? (
                <MemberMobile />
              ) : (
                <Member key={v.ownerAddress} data={v} />
              )
            )}
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
      )}
    </StyledTopMembers>
  )
}

export default TopMembers
