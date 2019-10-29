import React, { Component } from "react"
import PropTypes from "prop-types"
import serializeForm from "form-serialize"
import { getAllUsers, addUser } from "../../utils/api"
import { Loader } from "../components"
import {
  Modal,
  Button,
  Status,
  FormInput,
  FormItem,
  FormLabel,
  FormSet
} from "fundamental-react"

export default class AddUserBtn extends Component {
  _isMounted = false

  static propTypes = {
    history: PropTypes.object,
    onAddUser: PropTypes.func
  }

  state = {
    showModal: false,
    isLoading: true,
    error: null,
    success: null,
    warning: null,
    users: []
  }

  safeSetState(newStateObj) {
    if (this._isMounted) {
      this.setState(newStateObj)
    } else {
      console.warn(
        `State was not updated because component is unmounted`,
        newStateObj
      )
    }
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  componentDidMount() {
    this._isMounted = true
    getAllUsers()
      .then(data => {
        const users = data || []
        this.safeSetState({ isLoading: false, users })
      })
      .catch(error => {
        console.error(error.response)
        this.safeSetState({ isLoading: false, error })
      })
  }

  openModal = () => {
    this.safeSetState({ showModal: true })
    // Focus at the form input after the modal is loaded
    setTimeout(() => {
      document.querySelector("#sapId").focus()
    }, 200)
  }

  closeModal = () => {
    this.safeSetState({
      showModal: false,
      isLoading: false,
      error: null,
      success: null,
      warning: null
    })
  }

  submitForm = () => {
    document.querySelector("#submit-form").click()
  }

  handleSubmit = e => {
    e.preventDefault()
    const formValues = serializeForm(e.target, { hash: true })
    // Check if the any input is empty
    Object.entries(formValues).forEach(([key, value]) => {
      if (!value.trim()) {
        this.safeSetState({ warning: `You must provide the ${key}` })
        document.querySelector(`#${key}`).focus()
        return false
      }
    })
    // Serialize form as URL encoded and send request
    const requestData = serializeForm(e.target)
    this.safeSetState({ isLoading: true, warning: null })
    addUser(requestData)
      .then(res => {
        const userId = parseInt(res.data) || null
        // Check if the userId was passed correctly
        if (userId) {
          this.safeSetState({
            isLoading: false,
            success: true
          })
          if (this.props.onAddUser) {
            this.props.onAddUser(userId)
          }
        } else {
          // If a problem ocurred trying to parse the userId, informs the user
          this.safeSetState({
            isLoading: false,
            error:
              "A problem ocurred when trying to add a new user. Please try again later."
          })
        }
      })
      .catch(error => {
        console.error(error.response)
        this.safeSetState({ isLoading: false, error })
      })
  }

  showForm = () => {
    const { error, success, warning } = this.state
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
                User added successfully
              </Status>
            )}
          </div>
        ) : (
          // Show form if it was not submitted yet
          <div>
            <form onSubmit={this.handleSubmit}>
              <input type='hidden' name='uid' value='1' />
              <FormSet>
                <FormItem>
                  <FormLabel htmlFor='sapId'>SAP ID</FormLabel>
                  <FormInput
                    required
                    id='sapId'
                    name='sapId'
                    type='text'
                    maxLength='10'
                  />
                </FormItem>
                <FormItem>
                  <FormLabel htmlFor='firstName'>First name</FormLabel>
                  <FormInput
                    required
                    id='firstName'
                    name='firstName'
                    type='text'
                  />
                </FormItem>
                <FormItem>
                  <FormLabel htmlFor='lastName'>Last name</FormLabel>
                  <FormInput
                    required
                    id='lastName'
                    name='lastName'
                    type='text'
                  />
                </FormItem>
                <FormItem>
                  <FormLabel htmlFor='email'>Email</FormLabel>
                  <FormInput
                    required
                    size='40'
                    id='email'
                    name='email'
                    type='email'
                  />
                </FormItem>
              </FormSet>
              <input
                type='submit'
                id='submit-form'
                className='fd-has-display-none'
              />
            </form>

            {/* Show warning messages about the form */}
            {warning && (
              <Status type='warning' glyph='message-warning'>
                {warning}
              </Status>
            )}
          </div>
        )}
      </div>
    )
  }

  render() {
    const { showModal, isLoading, error, success } = this.state

    const showSubmitBtn = !error && !success
    return (
      <div>
        {/* Open Modal Button */}
        <Button glyph='add-employee' onClick={this.openModal}>
          Add user
        </Button>
        {/* Modal */}
        <Modal
          title='Add User'
          show={showModal}
          onClose={this.closeModal}
          actions={
            <div>
              <Button onClick={this.closeModal} type='standard'>
                Close
              </Button>

              {showSubmitBtn && (
                <Button
                  className='fd-has-margin-left-small'
                  onClick={this.submitForm}>
                  Add user
                </Button>
              )}
            </div>
          }>
          <div>
            {/* Form Content */}
            {isLoading ? (
              // Loading request
              <Loader />
            ) : (
              // New user form
              <div>{this.showForm()}</div>
            )}
          </div>
        </Modal>
      </div>
    )
  }
}
