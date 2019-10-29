import React from "react"
import "../../styles/App.css"
import { NavBar, Loader } from "../components"
import { useAuth0 } from "../../react-auth0-spa"

function App() {
  const { loading } = useAuth0()

  if (loading) {
    return <Loader />
  }

  return (
    <div className='App'>
      <header>
        <NavBar />
      </header>
    </div>
  )
}

export default App
