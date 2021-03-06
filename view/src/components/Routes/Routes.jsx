import React, { Component } from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import { Dashboard, NoMatch } from "../components"

export default class Routes extends Component {
  render() {
    return (
      <div>
        <Switch>
          {/* Dashboard */}
          <Redirect exact from='/' to='/dashboard' />
          <Route path='/dashboard' component={Dashboard} />
          {/* 'NoMatch' route should always be the last one (it acts as a 'default' case) */}
          <Route path='' component={NoMatch} />
        </Switch>
      </div>
    )
  }
}
