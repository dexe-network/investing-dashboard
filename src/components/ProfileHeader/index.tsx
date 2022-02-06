import { useEffect, useState } from "react"
import { useLocation, Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { AppState } from "state"
import { Flex } from "theme"
import TokenIcon from "components/TokenIcon"

import swipeRight from "assets/icons/swipe-arrow-right.svg"
import swipeLeft from "assets/icons/swipe-arrow-left.svg"

import penncilEdit from "assets/icons/pencil.svg"
import PoolsSelect from "components/PoolsSelect"

import {
  FloatingLabel,
  HeadContainer,
  FloatingButton,
  Menu,
  MenuItem,
  IconPencil,
  Funds,
  FundWrapper,
} from "./styled"
import { selectBasicPoolsBatch } from "state/pools/selectors"

const ProfileHeader: React.FC = () => {
  const location = useLocation()
  const [isPoolsOpen, setPoolsOpen] = useState(false)

  const ownedPools = useSelector<AppState, AppState["user"]["ownedPools"]>(
    (state) => {
      return state.user.ownedPools
    }
  )

  const basicPools = useSelector((state: AppState) =>
    selectBasicPoolsBatch(state, ownedPools.basic)
  )
  const investPools = useSelector((state: AppState) =>
    selectBasicPoolsBatch(state, ownedPools.invest)
  )

  const isTrader = location.pathname.substr(0, 10) === "/me/trader"
  const isInvestor = location.pathname.substr(0, 12) === "/me/investor"
  const isTraderDetails =
    location.pathname.substr(0, 18) === "/me/trader/details"

  // useEffect(() => {
  //   if (!isPoolsOpen)
  //     return () => {
  //       document.ontouchmove = function (event) {
  //         // unset
  //       }
  //     }

  //   document.ontouchmove = function (event) {
  //     event.preventDefault()
  //   }

  //   return () => {
  //     document.ontouchmove = function (event) {
  //       // unset
  //     }
  //   }
  // }, [isPoolsOpen])

  if (isTrader) {
    return (
      <>
        <PoolsSelect
          pools={ownedPools}
          isOpen={isPoolsOpen}
          toggle={() => setPoolsOpen(false)}
        />
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
              <FloatingLabel>Investing</FloatingLabel>
            </FloatingButton>
          </Link>

          <Menu>
            <MenuItem
              active={isTraderDetails}
              onClick={() => setPoolsOpen(true)}
            >
              My Funds
              <Funds>
                {basicPools.slice(0, 2).map((pool) => (
                  <FundWrapper key={pool.address}>
                    <TokenIcon size={24} address={pool.parameters.baseToken} />
                  </FundWrapper>
                ))}
              </Funds>
            </MenuItem>
          </Menu>
        </HeadContainer>
      </>
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
          <Link to={`/me/trader/profile/basic/${ownedPools.basic[0]}`}>
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
              <FloatingLabel>Trade</FloatingLabel>
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
