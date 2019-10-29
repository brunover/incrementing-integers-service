import React, { Component } from "react"
import { Alert, Panel } from "fundamental-react"

// NoMatch renders a 404 page when the path does not match any route
export default class NoMatch extends Component {
  render() {
    return (
      <div>
        <Panel>
          <Panel.Body>
            <Alert type='warning'>
              <h3>Page not found - 404</h3>
              <p>{window.location.href}</p>
            </Alert>
          </Panel.Body>
        </Panel>
      </div>
    )
  }
}
