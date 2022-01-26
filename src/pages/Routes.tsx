import { Route, Switch, useLocation } from "react-router-dom"
import { lazy, Suspense } from "react"
import { AnimatePresence } from "framer-motion"

import ProfileHeader from "components/ProfileHeader"
import CreateFundContext from "context/CreateFundContext"

import { Content, RestrictedContainer } from "theme/GlobalStyle"

const TopMembers = lazy(() => import("pages/TopMembers"))
const NewFund = lazy(() => import("pages/NewFund"))
const Invest = lazy(() => import("pages/Invest"))
const Welcome = lazy(() => import("pages/Welcome"))
const Profile = lazy(() => import("pages/Profile"))
const Investor = lazy(() => import("pages/Investor"))
const Trader = lazy(() => import("pages/Trader"))
const Swap = lazy(() => import("pages/Swap"))
const Trades = lazy(() => import("pages/Trades"))
const Wallet = lazy(() => import("pages/Wallet"))

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

                  <Route path="/me/trader/:poolAddress">
                    <Trader />
                  </Route>
                  <Route path="/me">
                    <Welcome />
                  </Route>
                </RestrictedContainer>
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

              <Route path="/pool/:poolAddress/profile">
                <Profile />
              </Route>
              <Route path="/pool/:poolAddress/invest">
                <Invest />
              </Route>
              <Route path="/pool/:poolAddress/exchange">
                <Swap />
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
