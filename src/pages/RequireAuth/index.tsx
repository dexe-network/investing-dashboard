import { useLocation, Navigate, Outlet } from "react-router-dom"
import { useWeb3React } from "@web3-react/core"
import TapBar from "components/TapBar"

function RequireAuth() {
  const { account } = useWeb3React()
  const location = useLocation()

  if (!account) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="welcome" state={{ from: location }} />
  }

  return (
    <>
      <Outlet />
      <TapBar />
    </>
  )
}

export default RequireAuth
