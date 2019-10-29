import React, { Component } from "react"
import PropTypes from "prop-types"
import { serializeObj } from "../../utils/utils"
import { patchUserState } from "../../utils/api"
import { Modal, Button, Status, Icon, Menu } from "fundamental-react"

export default class UpdateUserState extends Component {
  static propTypes = {
    onUpdateState: PropTypes.func,
    user: PropTypes.object.isRequired,
    isBlocked: PropTypes.bool.isRequired,
    activeState: PropTypes.number.isRequired,
    blockedState: PropTypes.number.isRequired
  }

  state = {
    showModal: false,
    success: null,
    error: null,
    userChangeObj: {}
  }

  updateUserState = (userId, oldState) => {
    const { activeState, blockedState } = this.props
    const state = oldState === activeState ? blockedState : activeState
    patchUserState(userId, serializeObj({ state }))
      .then(res => {
        if (res.status === 200) {
          this.setState({
            isLoading: true,
            success: true
          })
          // Call parent function to act accordingly
          if (this.props.onUpdateState) this.props.onUpdateState()
        }
      })
      .catch(error => {
        console.error(error.response)
        this.setState({ error })
      })
  }

  openModal = user => {
    document.addEventListener("keypress", this.handlePressEnter)
    this.setState({ userChangeObj: user, showModal: true })
  }

  closeModal = () => {
    document.removeEventListener("keypress", this.handlePressEnter)
    const { success, userChangeObj } = this.state
    const userId = userChangeObj.Id
    if (success) {
      this.setState({
        showModal: false,
        error: null,
        success: null,
        userChangeObj: {}
      })
    } else {
      this.setState({ showModal: false })
    }
    // Click in the popover to make it close
    const popoverBtn = document.querySelector(`#pop_${userId} button`)
    if (popoverBtn) {
      setTimeout(() => {
        popoverBtn.click()
      }, 100)
    }
  }

  handlePressEnter = e => {
    if (e.key === "Enter") {
      const submitBtn = document.querySelector(`#state-change-confirm-btn`)
      if (submitBtn) submitBtn.click()
    }
  }

  showForm = () => {
    const { userChangeObj, error, success } = this.state
    const { blockedState } = this.props
    return (
      <div>
        {error || success ? (
          <div>
            {/* Show success or error messages */}
            {error && (
              <Status type='error' glyph='message-error'>
                {error.message}
              </Status>
            )}

            {success && (
              <Status type='available' className='fd-status-label--success'>
                User status changed successfully
              </Status>
            )}
          </div>
        ) : (
          <div>
            <p>
              Are you sure you want to
              <span
                className={`fd-label fd-label--${
                  userChangeObj.State === blockedState ? "success" : "error"
                }`}>
                {userChangeObj.State === blockedState ? "unblock" : "block"}
              </span>
              this user?
            </p>
            <p>
              <strong>Name:</strong>&nbsp;
              {`${userChangeObj.FirstName} ${userChangeObj.LastName}`}
            </p>
            <p>
              <strong>Email:</strong>&nbsp;{userChangeObj.Email}
            </p>
            <p>
              <strong>SAP ID:</strong>&nbsp;{userChangeObj.SapId}
            </p>
          </div>
        )}
      </div>
    )
  }

  render() {
    const { showModal, userChangeObj, error, success } = this.state
    const { user, isBlocked } = this.props
    return (
      <div>
        {/* Pop over menu */}
        <Menu.Item onClick={() => this.openModal(user)}>
          <Icon glyph={isBlocked ? "accept" : "cancel"} />
          &nbsp; {isBlocked ? "Unblock user" : "Block user"}
        </Menu.Item>

        {/* Block/Unblock user confirmation modal */}
        <Modal
          title='Change user state'
          show={showModal}
          onClose={this.closeModal}
          actions={
            <div>
              {error || success ? (
                <Button onClick={this.closeModal} type='standard'>
                  Close
                </Button>
              ) : (
                <div>
                  <Button
                    onClick={this.closeModal}
                    type='standard'
                    className='fd-has-margin-right-small'>
                    No
                  </Button>

                  <Button
                    id='state-change-confirm-btn'
                    onClick={() =>
                      this.updateUserState(
                        userChangeObj.Id,
                        userChangeObj.State
                      )
                    }>
                    Yes
                  </Button>
                </div>
              )}
            </div>
          }>
          {this.showForm()}
        </Modal>
      </div>
    )
  }
}
