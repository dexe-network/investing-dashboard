import { Route, Switch, useLocation } from "react-router-dom"
import { lazy, Suspense } from "react"
import { AnimatePresence } from "framer-motion"

import ProfileHeader from "components/ProfileHeader"
import CreateFundContext from "context/CreateFundContext"

import { Content, RestrictedContainer } from "theme/GlobalStyle"

const TopMembers = lazy(() => import("pages/TopMembers"))
const NewFund = lazy(() => import("pages/NewFund"))
const Invest = lazy(() => import("pages/Invest"))
const Profile = lazy(() => import("pages/Profile"))
const Investor = lazy(() => import("pages/Investor"))
const Trader = lazy(() => import("pages/Trader"))
const Swap = lazy(() => import("pages/Swap"))
const Trades = lazy(() => import("pages/Trades"))
const Wallet = lazy(() => import("pages/Wallet"))
const Success = lazy(() => import("pages/NewFund/Success"))
const Notifications = lazy(() => import("pages/Notifications"))
const Insurance = lazy(() => import("pages/Insurance"))

export default function Routes() {
  const location = useLocation()

  return (
    <Content>
      <Suspense fallback={null}>
        <CreateFundContext>
          <AnimatePresence exitBeforeEnter initial>
            <Switch location={location} key={location.pathname}>
              <Route path="/me">
                <RestrictedContainer>
                  <ProfileHeader />

                  <Route path="/me/investor">
                    <Investor />
                  </Route>

                  <Route path="/me/trader/profile/:poolType/:poolAddress">
                    <Trader />
                  </Route>
                </RestrictedContainer>
              </Route>

              <Route exact path="/notifications">
                <Notifications />
              </Route>

              <Route exact path="/new-fund/success/:ticker/:address">
                <Success />
              </Route>

              <Route path="/new-fund">
                <NewFund />
              </Route>

              <Route path="/wallet">
                <Wallet />
              </Route>

              <Route path="/investor/history/:type/:account">
                <Trades />
              </Route>

              <Route path="/pool/history/:type/:address">
                <Trades />
              </Route>

              <Route path="/pool/profile/:poolType/:poolAddress">
                <Profile />
              </Route>
              <Route path="/pool/invest/:poolType/:poolAddress">
                <Invest />
              </Route>
              <Route path="/pool/exchange/:poolAddress">
                <Swap />
              </Route>
              <Route path="/insurance">
                <Insurance />
              </Route>

              <Route exact path="/">
                <TopMembers />
              </Route>
            </Switch>
          </AnimatePresence>
        </CreateFundContext>
      </Suspense>
    </Content>
  )
}
