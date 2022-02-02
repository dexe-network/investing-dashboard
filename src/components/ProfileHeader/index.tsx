import { useEffect } from "react"
import { useLocation, Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { AppState } from "state"

import swipeRight from "assets/icons/swipe-arrow-right.svg"
import swipeLeft from "assets/icons/swipe-arrow-left.svg"

import { FloatingLabel, Title, HeadContainer, FloatingButton } from "./styled"

const ProfileHeader: React.FC = () => {
  const location = useLocation()

  const ownedPools = useSelector<AppState, AppState["user"]["ownedPools"]>(
    (state) => {
      return state.user.ownedPools
    }
  )

  const isTrader = location.pathname.substr(0, 10) === "/me/trader"
  const isInvestor = location.pathname.substr(0, 12) === "/me/investor"

  useEffect(() => {
    document.ontouchmove = function (event) {
      event.preventDefault()
    }

    return () => {
      document.ontouchmove = function (event) {
        //
      }
    }
  }, [])

  if (isTrader) {
    return (
      <HeadContainer>
        <Link to="/me/investor">
          <FloatingButton
            position="left"
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 15 }}
            transition={{
              delay: 0.3,
              duration: 0.3,
              ease: [0.29, 0.98, 0.29, 1],
            }}
          >
            <img src={swipeLeft} alt="swipe left" />
            <FloatingLabel>Open investor profile</FloatingLabel>
          </FloatingButton>
        </Link>
      </HeadContainer>
    )
  }

  if (isInvestor) {
    return (
      <HeadContainer>
        {!ownedPools.basic.length && !ownedPools.invest.length ? (
          <Link to="/new-fund">
            <FloatingButton
              position="right"
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 15 }}
              transition={{
                delay: 0.3,
                duration: 0.3,
                ease: [0.29, 0.98, 0.29, 1],
              }}
            >
              <FloatingLabel>Create new fund</FloatingLabel>
              <img src={swipeRight} alt="swipe right" />
            </FloatingButton>
          </Link>
        ) : (
          <Link to={`/me/trader/basic-pool/${ownedPools.basic[0]}`}>
            <FloatingButton
              position="right"
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 15 }}
              transition={{
                delay: 0.3,
                duration: 0.3,
                ease: [0.29, 0.98, 0.29, 1],
              }}
            >
              <FloatingLabel>Open trader profile</FloatingLabel>
              <img src={swipeRight} alt="swipe right" />
            </FloatingButton>
          </Link>
        )}
      </HeadContainer>
    )
  }

  return <HeadContainer></HeadContainer>
}

export default ProfileHeader
