import React, { Component } from "react"
import { serializeObj } from "../../utils/utils"
import { getUser, getInteger, patchInteger } from "../../utils/api"
import { Header, Loader } from "../components"
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
    this.fetchUser(1)
  }

  fetchUser = id => {
    return getUser(id)
      .then(data => {
        const user = data || []
        this.safeSetState({ isLoadingUser: false, user })
      })
      .catch(error => {
        console.error(error.response)
        this.safeSetState({ isLoadingUser: false, error })
      })
  }

  requestNewInteger = id => {
    this.safeSetState({ isLoadingInteger: true })
    getInteger(id)
      .then(res => {
        if (res.status === 200) {
          this.fetchUser(id)
          this.safeSetState({ isLoadingInteger: false })
        }
      })
      .catch(error => {
        console.error(error.response)
        this.safeSetState({ isLoadingInteger: false, error })
      })
  }

  resetInteger = id => {
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
    patchInteger(id, serializeObj({ current }))
      .then(res => {
        if (res.status === 200) {
          this.fetchUser(id)
          this.safeSetState({ isLoadingInteger: false })
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
                        onClick={() => this.requestNewInteger(user.id || 0)}>
                        Request New Integer
                      </Button>
                      <Button
                        glyph='refresh'
                        onClick={() => this.resetInteger(user.id || 0)}>
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
                              {isLoadingInteger ? (
                                <Loader size='s' />
                              ) : (
                                <p className='fd-has-type-4'>
                                  {user.int_value || 0}
                                </p>
                              )}
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
