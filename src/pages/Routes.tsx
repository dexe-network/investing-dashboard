import { Route, Switch, useLocation } from "react-router-dom"
import { lazy, Suspense } from "react"
import { AnimatePresence } from "framer-motion"

import ProfileHeader from "components/ProfileHeader"
import CreateFundContext from "context/CreateFundContext"

import { Content, RestrictedContainer } from "theme/GlobalStyle"

const TopMembers = lazy(() => import("pages/TopMembers")) // TODO
const NewFund = lazy(() => import("pages/NewFund"))
const Invest = lazy(() => import("pages/Invest")) // TODO
const Profile = lazy(() => import("pages/Profile")) // TODO
const CreateFund = lazy(() => import("pages/CreateFund"))
const Investor = lazy(() => import("pages/Investor")) // TODO
const Trader = lazy(() => import("pages/Trader")) // TODO
const Swap = lazy(() => import("pages/Swap"))
const Trades = lazy(() => import("pages/Trades")) // TODO
const Wallet = lazy(() => import("pages/Wallet")) // TODO
const Success = lazy(() => import("pages/NewFund/Success"))
const Notifications = lazy(() => import("pages/Notifications"))
const TokenSelect = lazy(() => import("pages/TokenSelect")) // TODO
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

              <Route path="/notifications">
                <Notifications />
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

              <Route path="/insurance">
                <Insurance />
              </Route>

              <Route path="/select-token/:type/:poolAddress">
                <TokenSelect />
              </Route>

              <Route path="/pool/swap/whitelist/:poolAddress/:outputTokenAddress">
                <Swap />
              </Route>
              <Route path="/pool/invest/:poolType/:poolAddress">
                <Invest />
              </Route>
              <Route path="/new-fund/success/:ticker/:address">
                <Success />
              </Route>
              <Route path="/pool/profile/:poolType/:poolAddress">
                <Profile />
              </Route>

              {/* REDESIGN */}
              <Route path="/create-fund">
                <CreateFund />
              </Route>

              <Route path="/new-fund">
                <NewFund />
              </Route>

              <Route path="/">
                <TopMembers />
              </Route>
            </Switch>
          </AnimatePresence>
        </CreateFundContext>
      </Suspense>
    </Content>
  )
}
