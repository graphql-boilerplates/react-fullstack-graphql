import React, { Component } from 'react'
import { Lokka } from 'lokka'
import { Transport } from 'lokka-transport-http'
import LoginAuth0 from './LoginAuth0'
import Playground from './Playground'

const cid = 'FEwANg8Qaoq7f5uUibvQ6cwJIF4Mf3hr' // Change this
const domain = 'marktani.eu.auth0.com' // Change this
const graphcoolEndpoint = 'https://api.graph.cool/simple/v1/cizmlqn9jn0u101082zrfcl1a' // Change this

export default class App extends Component {

  state = {
    auth0IdToken: window.localStorage.getItem('auth0IdToken'),
  }

  _onLoginAuth0 = (auth0IdToken) => {
    window.localStorage.setItem('auth0IdToken', auth0IdToken)

    this.setState({ auth0IdToken })
    this._maybeCreateUser()
  }

  _maybeCreateUser = async () => {
    const headers = {
      'Authorization': `Bearer ${this.state.auth0IdToken}`
    }

    const transport = new Transport(graphcoolEndpoint, {headers})
    const api = new Lokka({ transport })

    // check if a user is already logged in
    const userResult = await api.query(`{
      user {
        id
      }
    }`)

    if (!userResult.user) {
      // need to create user
      try {
        await api.mutate(`{
          createUser(authProvider: {
            auth0: {
              idToken: "${this.state.auth0IdToken}"
            }
          }) {
            id
          }
        }`)
      } catch (e) {
        console.log('could not create user')
        // logout to clear a potential existing auth0 token that is invalid
        this._logout()
      }
    }
  }

  _logout = () => {
    this.setState({
      auth0IdToken: null,
    })
    window.localStorage.removeItem('auth0IdToken')
  }

  render() {
    return (
      <div className='flex flex-column h-100'>
        <div className='pa4 w-100'>
          {this.state.auth0IdToken &&
            <div className='pv3'>
              <span
                className='dib bg-red white pa3 pointer dim'
                onClick={this._logout}
              >
                Logout
              </span>
            </div>
          }
          {!this.state.auth0IdToken &&
            <div className='pv3'>
              <h3>Step 1:</h3>
              <LoginAuth0
                clientId={cid}
                domain={domain}
                onLogin={this._onLoginAuth0}
              />
            </div>
          }
          {this.state.auth0IdToken &&
            <div>
              <h4>Auth0 Id Token</h4>
              <textarea
                readOnly
                className='f6'
                value={this.state.auth0IdToken}
                cols={90}
                rows={4}
              />
            </div>
          }
        </div>
        <div className='h-50 w-100 mt4'>
          <div className='f4 i pa4'>Try to run this query before and after you're signed in with Auth0.<br />Also, try to access the `secretComment` field in both cases.</div>
          <Playground
            endpoint={graphcoolEndpoint}
            authToken={this.state.auth0IdToken}
          />
        </div>
      </div>
    )
  }
}
