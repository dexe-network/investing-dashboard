import { Route, Routes as Switch, Outlet } from "react-router-dom"
import { lazy, Suspense } from "react"
import { AnimatePresence } from "framer-motion"

import RequireAuth from "pages/RequireAuth"
import CreateFundContext from "context/CreateFundContext"

import { Content } from "theme/GlobalStyle"

const Welcome = lazy(() => import("pages/Welcome"))
const TopMembers = lazy(() => import("pages/TopMembers"))
const Invest = lazy(() => import("pages/Invest"))
const Profile = lazy(() => import("pages/Profile"))
const CreateFund = lazy(() => import("pages/CreateFund"))
const Investor = lazy(() => import("pages/Investor"))
const Trader = lazy(() => import("pages/Trader"))
const Swap = lazy(() => import("pages/Swap"))
const Trades = lazy(() => import("pages/Trades")) // TODO: page is needed
const Wallet = lazy(() => import("pages/Wallet"))
const Success = lazy(() => import("pages/Success"))
const Notifications = lazy(() => import("pages/Notifications"))
const TokenSelect = lazy(() => import("pages/TokenSelect")) // TODO: my trader profile
// const Insurance = lazy(() => import("pages/Insurance"))

const PrivacyPolicy = lazy(() => import("pages/PrivacyPolicy"))

function Layout() {
  return <Outlet />
}

export default function Routes() {
  return (
    <Content>
      <Suspense fallback={null}>
        <CreateFundContext>
          <AnimatePresence exitBeforeEnter initial>
            <Switch>
              <Route element={<Layout />}>
                <Route path="welcome" element={<Welcome />} />

                <Route element={<RequireAuth />}>
                  <Route path="me/investor" element={<Investor />} />

                  <Route
                    path="me/trader/profile/:poolType/:poolAddress"
                    element={<Trader />}
                  />

                  <Route path="notifications" element={<Notifications />} />

                  <Route path="wallet" element={<Wallet />} />

                  <Route
                    path="investor/history/:type/:account"
                    element={<Trades />}
                  />

                  <Route
                    path="pool/history/:type/:address"
                    element={<Trades />}
                  />

                  {/* <Route path="insurance" element={<Insurance />} /> */}

                  <Route
                    path="select-token/:type/:poolAddress"
                    element={<TokenSelect />}
                  />

                  <Route
                    path="pool/swap/whitelist/:poolAddress/:outputTokenAddress"
                    element={<Swap />}
                  />

                  <Route
                    path="pool/invest/:poolType/:poolAddress"
                    element={<Invest />}
                  />
                  <Route
                    path="pool/profile/:poolType/:poolAddress"
                    element={<Profile />}
                  />

                  {/* REDESIGN */}
                  <Route path="create-fund" element={<CreateFund />} />
                  <Route path="success" element={<Success />} />

                  <Route path="/*" element={<TopMembers />} />
                </Route>

                <Route path="privacy-policy" element={<PrivacyPolicy />} />

                <Route path="*" element={<p>Not found</p>} />
              </Route>
            </Switch>
          </AnimatePresence>
        </CreateFundContext>
      </Suspense>
    </Content>
  )
}
