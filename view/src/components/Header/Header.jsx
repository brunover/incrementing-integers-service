import React, { Component } from "react"
import PropTypes from "prop-types"
import { Shellbar } from "fundamental-react"

// Header contains the Shell bar component from Fiori Fundamentals
export default class Header extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired
  }

  render() {
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
                alert("Signing out!")
              },
              glyph: "log",
              name: "Sign Out",
              size: "s"
            }
          ]}
        />
      </div>
    )
  }
}
