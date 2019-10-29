import React, { Component } from "react"
import { serializeObj } from "../../utils/utils"
import { getUser, getInteger, patchInteger } from "../../utils/api"
import { Header, Loader } from "../components"
import { Auth0Context } from "../../utils/react-auth0-spa"
import {
  Panel,
  PanelGrid,
  Tile,
  ActionBar,
  Status,
  Button
} from "fundamental-react"

export default class Dashboard extends Component {
  _isMounted = false

  // Assign Auth0 context to a static property
  static contextType = Auth0Context

  state = {
    isLoadingUser: true,
    isLoadingInteger: false,
    error: null,
    success: null,
    user: {}
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
    const { user } = this.context
    this.fetchUser(user)
  }

  fetchUser = authUser => {
    const email = authUser.email
    return getUser(serializeObj({ email }))
      .then(res => {
        const user = res.data || {}
        console.log(user)
        this.safeSetState({ isLoadingUser: false, user })
      })
      .catch(error => {
        console.error(error.response)
        this.safeSetState({ isLoadingUser: false, error })
      })
  }

  requestNewInteger = () => {
    this.safeSetState({ isLoadingInteger: true })
    getInteger(this.state.user.id || 0)
      .then(res => {
        console.log(res)
        console.log(this.state.user.id)
        if (res.status === 200) {
          this.safeSetState(prevState => {
            const user = prevState.user
            user.int_value = res.data
            return { isLoadingInteger: false, user }
          })
        }
      })
      .catch(error => {
        console.error(error.response)
        this.safeSetState({ isLoadingInteger: false, error })
      })
  }

  resetInteger = () => {
    let current = window.prompt(
      "Inform the new integer value (bigger than zero):"
    )
    if (!current) return
    current = current.trim()
    if (isNaN(current)) {
      alert("You must provide a number")
      return
    }
    current = Number(current)
    if (current < 0) {
      alert("You must provide a number bigger than zero")
      return
    }
    this.safeSetState({ isLoadingInteger: true })
    patchInteger(this.state.user.id || 0, serializeObj({ current }))
      .then(res => {
        if (res.status === 200) {
          this.safeSetState(prevState => {
            const user = prevState.user
            user.int_value = res.data
            return { isLoadingInteger: false, user }
          })
        }
      })
      .catch(error => {
        console.error(error.response)
        this.setState({ isLoadingInteger: false, error })
      })
  }

  render() {
    const { isLoadingUser, isLoadingInteger, error, user } = this.state

    return (
      <div className='fd-container fd-container--centered'>
        <Header user={user} />
        <div className='fd-container'>
          <div className='fd-has-margin-bottom-medium'>
            <div className='fd-container'>
              <Panel>
                <Panel.Body>
                  {/* Display a message if we encounter an error */}
                  {error && (
                    <Status type='error' glyph='message-error'>
                      {error.message}
                    </Status>
                  )}

                  {/* General info section */}
                  <ActionBar>
                    <ActionBar.Header
                      description='Request the next integer or reset the value of the current one'
                      title='Your personal integer'
                    />
                    <ActionBar.Actions>
                      <Button
                        glyph='add'
                        onClick={() => this.requestNewInteger()}>
                        Request New Integer
                      </Button>
                      <Button
                        glyph='refresh'
                        onClick={() => this.resetInteger()}>
                        Reset My Integer
                      </Button>
                    </ActionBar.Actions>
                  </ActionBar>

                  {/* Counters */}
                  {isLoadingUser ? (
                    // Loading data from api
                    <Loader />
                  ) : (
                    // Data was fetched
                    <PanelGrid cols={2}>
                      <Panel>
                        <Panel.Body>
                          <Tile>
                            <Tile.Content title='User'>
                              <p className='fd-has-type-4'>
                                {user.email || "No user"}
                              </p>
                            </Tile.Content>
                          </Tile>
                        </Panel.Body>
                      </Panel>
                      <Panel>
                        <Panel.Body>
                          <Tile>
                            <Tile.Content title='Current Integer'>
                              <p className='fd-has-type-4'>
                                {user.int_value || 0}
                                {isLoadingInteger && (
                                  <Loader size='s' type='synch' />
                                )}
                              </p>
                            </Tile.Content>
                          </Tile>
                        </Panel.Body>
                      </Panel>
                    </PanelGrid>
                  )}
                </Panel.Body>
              </Panel>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
