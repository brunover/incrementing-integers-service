import React from "react"
import { useAuth0 } from "../../utils/react-auth0-spa"
import Routes from "../Routes/Routes"

const NavBar = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0()

  return (
    <div>
      {!isAuthenticated && loginWithRedirect({})}

      {isAuthenticated && <Routes />}
    </div>
  )
}

export default NavBar
