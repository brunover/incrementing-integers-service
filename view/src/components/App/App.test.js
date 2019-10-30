import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { BrowserRouter } from "react-router-dom"
import { Auth0Provider } from "../../utils/react-auth0-spa"
import config from "../../utils/auth_config.json"

it("App renders without crashing", () => {
  const div = document.createElement("div")
  // A function that routes the user to the right place
  // after login
  const onRedirectCallback = appState => {
    window.history.replaceState(
      {},
      document.title,
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    )
  }
  ReactDOM.render(
    <Auth0Provider
      domain={config.domain}
      client_id={config.clientId}
      redirect_uri={window.location.origin}
      onRedirectCallback={onRedirectCallback}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Auth0Provider>,
    div
  )
  ReactDOM.unmountComponentAtNode(div)
})
