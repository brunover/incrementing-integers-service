import React, { Component } from "react"
import PropTypes from "prop-types"
import { Shellbar } from "fundamental-react"

// Header contains the Shell bar component from Fiori Fundamentals
export default class Header extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired
  }

  // Given a email, return its initials letters capitalized.
  getInitials = email => {
    // If email is empty, return AN (anonymous)
    if (email && email.length === 0) {
      return "AN"
    }
    email = email.trim()
    if (email.length < 2) {
      // If email has 2 or less letters, returns it capitalized
      return email.toUpperCase()
    }
    const emailArr = email.split(" ")
    if (emailArr.length === 1) {
      // if it's a single word, return 1st and 2nd character
      return (emailArr[0].charAt(0) + "" + emailArr[0].charAt(1)).toUpperCase()
    } else {
      // else, get the initial character of the 1st and 2nd word
      return (emailArr[0].charAt(0) + "" + emailArr[1].charAt(0)).toUpperCase()
    }
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
            userName: user.email || "AN"
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
