import styled from "styled-components"
import useAxios from "axios-hooks"
import Member from "components/Member"
import TopMembersBar from "components/TopMembersBar"

interface Props {}

const StyledTopMembers = styled.div`
  padding: 0 20px;
`

const MembersList = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: auto;
  max-height: calc(100vh - 100px);
`

function TopMembers(props: Props) {
  const {} = props
  const [{ data, loading, error }] = useAxios("https://tinyfac.es/api/users")

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error!</p>

  return (
    <StyledTopMembers>
      <TopMembersBar />
      <MembersList>
        {data.map((v) => (
          <Member
            key={v.first_name + v.last_name}
            avatar={v.avatars[0].url}
            rank={4.2}
            name={`${v.first_name} ${v.last_name}`}
            copiers={12}
            pnl={123}
            tradersFunds={123}
            totalFunds={450}
            traderFee={35}
          />
        ))}
      </MembersList>
    </StyledTopMembers>
  )
}

export default TopMembers
