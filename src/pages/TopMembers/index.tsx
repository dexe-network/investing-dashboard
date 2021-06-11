import { useState } from "react"
import styled from "styled-components"
import Member from "components/Member"
import ReactPaginate from "react-paginate"
import TopMembersBar from "components/TopMembersBar"
import { GuardSpinner } from "react-spinners-kit"
import { Text, Flex, Center } from "theme"
import { useMembers } from "state/members/hooks"
import prev from "assets/icons/pagination-prev.svg"
import next from "assets/icons/pagination-next.svg"

import "./pagination.css"

const StyledTopMembers = styled.div`
  padding: 0 20px;
`

const MembersList = styled.div`
  min-height: -webkit-fill-available;
  height: calc(100vh - 120px);
  width: 100%;
  padding: 10px 0 30px;
  overflow: auto;
`

function TopMembers() {
  const [members, membersLoading, error] = useMembers()
  const [pageCount, setPage] = useState(50)

  if (error)
    return (
      <Center>
        <p>Ooops, something went wrong</p>
        <div>reload</div>
      </Center>
    )

  if (membersLoading)
    return (
      <Center>
        <GuardSpinner size={30} loading />
        <Flex p="10px 0">
          <Text fz={16} align="center" color="#7FFFD4" fw={300}>
            Loading traders data
          </Text>
        </Flex>
      </Center>
    )

  return (
    <StyledTopMembers>
      <TopMembersBar />
      <MembersList>
        {members.map((v) => (
          <Member key={v.address} data={v} />
        ))}
      </MembersList>
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
    </StyledTopMembers>
  )
}

export default TopMembers
