import { useState, useEffect, useCallback } from "react"
import ProfileAvatar from "components/ProfileAvatar"
import Statistics from "pages/Profile/Statistics"
import History from "pages/Profile/History"
import { Header } from "theme"
import FavoriteCard from "components/FavoriteCard"
import { Pool } from "constants/interfaces_v2"

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
  data: Pool[]
}

function Profile(props: Props) {
  const { data, active } = props
  const STATISTICS = `/profile`
  const HISTORY = `/profile/history`

  const [tab, setTab] = useState<string>(STATISTICS)

  return (
    <ProfileCard>
      {!active ? <ProfilePlaceholder /> : null}
      <ProfileAvatar url="" name={`Irvin Smith`} pinned={tab !== STATISTICS} />

      <Header>
        <Tab active={tab === STATISTICS} to={() => setTab(STATISTICS)}>
          Statistics
        </Tab>
        <Tab active={tab === HISTORY} to={() => setTab(HISTORY)}>
          History
        </Tab>
      </Header>

      {tab === STATISTICS && <Statistics data={data} />}
      {tab === HISTORY && <History />}
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

const ProfileContainer: React.FC<{ pools: any }> = ({ pools }) => {
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => setCurrent(current + 1), [current])
  const prev = useCallback(() => setCurrent(current - 1), [current])

  const downHandler = useCallback(
    ({ key }) => {
      if (key === "ArrowRight" && current !== pools.length - 1) {
        next()
      }
      if (key === "ArrowLeft" && current !== 0) {
        prev()
      }
    },
    [next, prev, current, pools]
  )

  useEffect(() => {
    window.addEventListener("keydown", downHandler)
    return () => {
      window.removeEventListener("keydown", downHandler)
    }
  }, [downHandler])

  return (
    <Parent>
      <div></div>
      {(pools || []).map((v, i) => (
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
