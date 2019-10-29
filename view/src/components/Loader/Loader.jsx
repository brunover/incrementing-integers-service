import React, { Component } from "react"
import PropTypes from "prop-types"

export default class Loader extends Component {
  static propTypes = {
    display: PropTypes.bool,
    type: PropTypes.oneOf(["spin", "synch"]),
    size: PropTypes.oneOf(["s", "m", "l"]),
    animate: PropTypes.oneOf(["spin", "pulse"]),
    icon: PropTypes.string
  }

  static defaultProps = {
    display: true,
    type: "spin",
    size: "m",
    animate: "spin",
    icon: "synchronize"
  }

  renderSpinner = ({ size }) => {
    let sizeClass = ""
    if (size) {
      switch (size.toLowerCase()) {
        case "s": {
          sizeClass = "fd-loading-spinner--small"
          break
        }
        case "l": {
          sizeClass = "fd-loading-spinner--large"
          break
        }
        default: {
          sizeClass = ""
          break
        }
      }
    }
    return (
      <div
        className={`fd-loading-spinner ${sizeClass}`}
        aria-hidden='false'
        aria-label='Loading'></div>
    )
  }

  renderSynchronizer = ({ size, animate, icon }) => {
    return (
      <span
        className={`
          fd-has-margin-x-tiny 
          sap-icon--${icon} 
          sap-icon--${size} 
          sap-icon--animate-${animate}
        `}
      />
    )
  }

  render() {
    const { display, type } = this.props
    // If received the display "false" props, does not render the loader
    if (!display) return null
    // Check which type to render
    if (type.toLowerCase() === "synch") {
      // Synchronizer type
      return this.renderSynchronizer(this.props)
    } else {
      // Renders the default spinner if no type was passed via props
      return this.renderSpinner(this.props)
    }
  }
}
