import React, { Component } from "react"
import escapeRegExp from "escape-string-regexp"
import { getStateByModel, getAllUsers, getUser } from "../../utils/api"
import { sortByKey } from "../../utils/utils"
import { Loader, AddUserBtn, UpdateUserState } from "../components"
import {
  Table,
  Panel,
  Tile,
  ActionBar,
  InputGroup,
  Icon,
  Status,
  Button,
  Popover,
  Menu
} from "fundamental-react"

export default class Users extends Component {
  _isMounted = false

  state = {
    isLoading: true,
    error: null,
    warning: null,
    query: "",
    users: [],
    blockedState: null,
    activeState: null
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
    this.fetchUserStates()
  }

  fetchUsers = () => {
    return getAllUsers()
      .then(data => {
        const users = data || []
        this.safeSetState({ isLoading: false, users })
      })
      .catch(error => {
        console.error(error.response)
        this.safeSetState({ isLoading: false, error })
      })
  }

  fetchUserStates = () => {
    return getStateByModel("user")
      .then(data => {
        const states = data || []
        const activeState = states.find(s => s.State === "active").Id || null
        const blockedState = states.find(s => s.State === "blocked").Id || null
        // Update the state with respective data
        this.safeSetState({
          isLoading: false,
          activeState,
          blockedState
        })
      })
      .catch(error => {
        console.error(error.response)
        this.safeSetState({ isLoading: false, error })
      })
  }

  updateQuery = query => {
    this.setState({ query: query.trim() })
  }

  clearQuery = async () => {
    await this.updateQuery("")
    const queryInput = document.querySelector(
      "#query-search > input[type=search]"
    )
    if (queryInput) queryInput.value = ""
  }

  updateUserState = () => {
    this.fetchUsers()
  }

  showUsersFound = showUsers => {
    const { blockedState, activeState } = this.state
    const tableHeaders = [
      "SAP ID",
      "First Name",
      "Last Name",
      "Email",
      "State",
      "Actions"
    ]
    const tableData = showUsers.map(user => {
      const isBlocked = Number(user.State) === blockedState
      return {
        rowData: [
          <div>
            <Icon glyph='person-placeholder' />
            &nbsp; {user.SapId}
          </div>,
          user.FirstName,
          user.LastName,
          <a href={`mailto:${user.Email}`}>{user.Email}</a>,
          <div key={`status_${user.Id}`}>
            {isBlocked ? (
              <div>
                <Icon className='fd-status-label--error' glyph='cancel' />
                <span className='fd-status-label--error'>&nbsp; Blocked</span>
              </div>
            ) : (
              <div>
                <Icon className='fd-status-label--success' glyph='accept' />
                <span className='fd-status-label--success'>&nbsp; Active</span>
              </div>
            )}
          </div>,
          <Popover
            id={`pop_${user.Id}`}
            control={<Button glyph='vertical-grip' option='light' />}
            body={
              <Menu>
                <Menu.List>
                  <UpdateUserState
                    isBlocked={isBlocked}
                    user={user}
                    activeState={activeState || 6}
                    blockedState={blockedState || 7}
                    onUpdateState={() => this.updateUserState()}
                  />
                  <Menu.Item onClick={() => alert(user.Id)}>
                    <Icon glyph='delete' />
                    &nbsp; Delete user
                  </Menu.Item>
                </Menu.List>
              </Menu>
            }
          />
        ]
      }
    })
    return <Table headers={tableHeaders} tableData={tableData} />
  }

  showNoUsers = () => {
    return (
      <Tile columnSpan={3} backgroundColor={1}>
        <Tile.Content title='No users found' />
      </Tile>
    )
  }

  addUser = userId => {
    this.safeSetState({ isLoading: true })
    getUser(userId)
      .then(data => {
        const user = data || {}
        this.safeSetState(prevState => ({
          isLoading: false,
          users: prevState.users.concat([user])
        }))
      })
      .catch(error => {
        console.error(error.response)
        this.safeSetState({ isLoading: false, error })
      })
  }

  render() {
    const { isLoading, error, query, users } = this.state

    // Filters users based on the query of search input
    let showUsers = users || []
    if (showUsers.length && query) {
      const match = new RegExp(escapeRegExp(query), "i")
      showUsers = users.filter(
        f => match.test(f.FirstName) || match.test(f.LastName)
      )
    }

    // Sort users alphabetically
    showUsers.sort(sortByKey("FirstName"))

    return (
      <div className='fd-container'>
        <Panel>
          <Panel.Body>
            {/* Display a message if we encounter an error */}
            {error && (
              <Status type='error' glyph='message-error'>
                {error.message}
              </Status>
            )}

            {/* users section (add users) */}
            <ActionBar>
              <ActionBar.Header
                title='Manage Users'
                description='Members that belong to your workspace'
              />
              <ActionBar.Actions>
                <AddUserBtn
                  onAddUser={user => {
                    this.addUser(user)
                  }}
                />
              </ActionBar.Actions>
            </ActionBar>

            {/* Search bar to filter users */}
            <InputGroup
              id='query-search'
              inputPlaceholder='Enter a user name to search...'
              inputType='search'
              onChange={event => this.updateQuery(event.target.value)}
              className='fd-has-margin-top-small'
            />

            {/* Clear Search Button */}
            {query && (
              <Button
                compact
                disabled={!query}
                glyph='clear-filter'
                option='light'
                className='fd-has-margin-top-tiny'
                onClick={this.clearQuery}>
                Clear search
              </Button>
            )}

            {/* users list */}
            {isLoading ? (
              // Loading data from api
              <Loader />
            ) : (
              // Data was fetched
              <div className='fd-has-margin-top-small' key='tree-view'>
                {showUsers.length > 0
                  ? this.showUsersFound(showUsers)
                  : this.showNoUsers()}
              </div>
            )}
          </Panel.Body>
        </Panel>
      </div>
    )
  }
}
