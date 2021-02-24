import { motion } from "framer-motion"
import styled from "styled-components"
import { Switch, Route, Link, useLocation } from "react-router-dom"
import ProfileAvatar from "components/ProfileAvatar"
import Statistics from "pages/Profile/Statistics"

interface Props {}

const ProfileCard = styled(motion.div)`
  position: relative;
  background: rgb(41, 49, 52);
  background: linear-gradient(
    204deg,
    rgba(41, 49, 52, 1) -10%,
    rgba(53, 52, 75, 1) 100%
  );
  border-radius: 10px;
  max-width: 910px;
  height: fit-content;
  margin: auto;
  overflow: hidden;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.25);
  margin-top: 74px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`

const Header = styled.div`
  display: flex;
  padding: 20px 0;
  max-width: 461px;
  width: 100%;
  align-items: center;
  justify-content: space-around;
`

const Tab = styled(Link)<{ active?: boolean }>`
  font-size: 16px;
  color: #999999;
  user-select: none;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  text-decoration: none;
  user-select: none;

  font-weight: ${(props) => (props.active ? 800 : 300)};
`

function Profile(props: Props) {
  const {} = props
  const { pathname } = useLocation()

  const STATISTICS = `/profile`
  const HISTORY = `/profile/history`
  const NEWS = `/profile/news`
  const VOTING = `/profile/voting`

  return (
    <ProfileCard>
      <ProfileAvatar
        url="https://i.pravatar.cc/164"
        pinned={pathname !== STATISTICS}
      />

      <Header>
        <Tab active={pathname === STATISTICS} to={STATISTICS}>
          Statistics
        </Tab>
        <Tab active={pathname === HISTORY} to={HISTORY}>
          History
        </Tab>
        <Tab active={pathname === NEWS} to={NEWS}>
          News
        </Tab>
        <Tab active={pathname === VOTING} to={VOTING}>
          Voting & Authorizations
        </Tab>
      </Header>

      <Switch>
        <Route exact path={STATISTICS}>
          <Statistics />
        </Route>
        <Route exact path={HISTORY}>
          history
        </Route>
        <Route exact path={NEWS}>
          news
        </Route>
        <Route exact path={VOTING}>
          voting
        </Route>
      </Switch>
    </ProfileCard>
  )
}

export default Profile
