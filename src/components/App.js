import React, { Component } from 'react'
import '../asserts/App.css'
import { QueryRenderer, graphql } from 'react-relay'
import environment from '../Environment'
import PostListFilter from './PostListFilter'
import { ITEM_PER_PAGE } from '../constants'

class App extends Component {
  render() {
    return (
      <div className="App">
        <QueryRenderer
          environment={environment}
          query={graphql`
            query AppAllPostQuery($count: Int!, $cursor: String) {
              viewer {
                ...PostListFilter_viewer
              }
            }
          `}
          variables={{ cursor: null, count: ITEM_PER_PAGE }}
          render={({ error, props }) => {
            if (props) {
              return <PostListFilter viewer={props.viewer} />
            } else if (error) {
              return <div>{error.message}</div>
            }
            return <div>Loading</div>
          }}
        />
      </div>
    )
  }
}

export default App
