import React, { Component } from "react"
import { getUser } from "../../utils/api"
import { Header, Loader } from "../components"
import { Panel, PanelGrid, Tile, ActionBar, Status } from "fundamental-react"

export default class Dashboard extends Component {
  _isMounted = false

  state = {
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
    this.fetchUsers()
  }

  fetchUsers = () => {
    return getUser(1)
      .then(data => {
        const user = data || []
        this.safeSetState({ isLoading: false, user })
      })
      .catch(error => {
        console.error(error.response)
        this.safeSetState({ isLoading: false, error })
      })
  }

  render() {
    const { isLoading, error, user } = this.state

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
                  </ActionBar>

                  {/* Counters */}
                  {isLoading ? (
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
                                {user.email || ""}
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
