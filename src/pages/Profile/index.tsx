import { useState, useEffect, useCallback } from "react"
import ProfileAvatar from "components/ProfileAvatar"
import Statistics from "pages/Profile/Statistics"
import History from "pages/Profile/History"
import News from "pages/Profile/News"
import { feed } from "components/PostCard/PostCard.stories"
import { Header, Center, Flex, Text } from "theme"
import { GuardSpinner } from "react-spinners-kit"
import { useMembers } from "state/members/hooks"
import { IPool } from "constants/interfaces"
import FavoriteCard from "components/FavoriteCard"

import {
  ProfileCard,
  Tab,
  ProfilePlaceholder,
  MotionCard,
  Parent,
  cardVariants,
  FavoriteContainer,
} from "./styled"

interface Props {
  active?: boolean
  data: IPool
}

function Profile(props: Props) {
  const { data, active } = props
  const STATISTICS = `/profile`
  const HISTORY = `/profile/history`
  const NEWS = `/profile/news`

  const [tab, setTab] = useState<string>(STATISTICS)

  return (
    <ProfileCard>
      {!active ? <ProfilePlaceholder /> : null}
      <ProfileAvatar
        name={`${data.firstName} ${data.lastName}`}
        url={data.avatar}
        pinned={tab !== STATISTICS}
      />

      <Header>
        <Tab active={tab === STATISTICS} to={() => setTab(STATISTICS)}>
          Statistics
        </Tab>
        <Tab active={tab === HISTORY} to={() => setTab(HISTORY)}>
          History
        </Tab>
        <Tab active={tab === NEWS} to={() => setTab(NEWS)}>
          News
        </Tab>
      </Header>

      {tab === STATISTICS && <Statistics data={data} />}
      {tab === HISTORY && <History />}
      {tab === NEWS && <News data={feed} />}
    </ProfileCard>
  )
}

const Card = ({ active, i, next, prev, data }) => {
  const offset = active - i

  const handleClick = () => {
    if (offset > 0) {
      prev()
    }

    if (offset < 0) {
      next()
    }
  }

  if (offset <= 2 && offset >= -2) {
    return (
      <MotionCard
        initial={`initial${offset}`}
        transition={{ duration: 0.5 }}
        onClick={handleClick}
        animate={offset.toString()}
        variants={cardVariants}
      >
        <Profile data={data} active={offset === 0} />
      </MotionCard>
    )
  }

  return null
}

const ProfileContainer = () => {
  const [members, membersLoading, error] = useMembers()
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => setCurrent(current + 1), [current])
  const prev = useCallback(() => setCurrent(current - 1), [current])

  const downHandler = useCallback(
    ({ key }) => {
      if (key === "ArrowRight" && current !== members.length - 1) {
        next()
      }
      if (key === "ArrowLeft" && current !== 0) {
        prev()
      }
    },
    [next, prev, current, members]
  )

  useEffect(() => {
    window.addEventListener("keydown", downHandler)
    return () => {
      window.removeEventListener("keydown", downHandler)
    }
  }, [downHandler])

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
    <Parent>
      <div></div>
      {(members || []).map((v, i) => (
        <Card
          data={v}
          i={i}
          active={current}
          key={v.firstName}
          next={next}
          prev={prev}
        />
      ))}
      <FavoriteContainer>
        <FavoriteCard />
        <FavoriteCard />
      </FavoriteContainer>
    </Parent>
  )
}

export default ProfileContainer
