import React, { Component } from "react"
import PropTypes from "prop-types"
import { Shellbar } from "fundamental-react"
import { Auth0Context } from "../../react-auth0-spa"

// Header contains the Shell bar component from Fiori Fundamentals
export default class Header extends Component {
  // Assign Auth0 context to a static property
  static contextType = Auth0Context

  static propTypes = {
    user: PropTypes.object.isRequired
  }

  render() {
    const { logout } = this.context
    const { user } = this.props

    return (
      <div className='fd-container'>
        <Shellbar
          logo={<img alt='Incrementing Integer Service' src='/logo.png' />}
          productTitle='Incrementing Integer Service'
          profile={{
            glyph: "settings",
            colorAccent: 4,
            initials: "...",
            userName: user.email || "No user"
          }}
          profileMenu={[
            {
              callback: () => {
                logout()
              },
              glyph: "log",
              name: "Log Out",
              size: "s"
            }
          ]}
        />
      </div>
    )
  }
}
