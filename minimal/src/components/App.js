import React, { Component } from 'react'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import logo from '../logo.svg'
import '../styles/App.css'
import InputName from './InputName'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Query query={HELLO_QUERY}>
            {props => {
              console.log(props)
              const { data, loading, error, refetch } = props
              if (loading) {
                return <div>Loading</div>
              }

              if (error) {
                return <div>An unexpected error occurred</div>
              }

              return (
                <div>
                  <p>What's your name?</p>
                  <InputName
                    onSubmit={name => {
                      refetch({
                        name,
                      })
                    }}
                  />
                  <h3>{data.hello}</h3>
                </div>
              )
            }}
          </Query>
        </div>
      </div>
    )
  }
}

const HELLO_QUERY = gql`
  query HelloQuery($name: String) {
    hello(name: $name)
  }
`

export default App
