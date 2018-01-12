import React from 'react'
import { graphql, compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import gql from 'graphql-tag'


class DetailPage extends React.Component {
  render() {
    if (this.props.postQuery.loading) {
      return (
        <div className="flex w-100 h-100 items-center justify-center pt7">
          <div>Loading (from {process.env.REACT_APP_GRAPHQL_ENDPOINT})</div>
        </div>
      )
    }

    const { post } = this.props.postQuery

    return (
      <div className="w-100 justify-center pa6">
        <div
          className="close absolute right-0 top-0 pointer"
          onClick={this.props.history.goBack}
        >
          <img src={require('../assets/close.svg')} alt="" />
        </div>
        <div className="items-center black-80 fw3 title ">
          {post.title}
          <div className="flex black-80 fw3 text mt2 content">
            {post.text}
          </div>
        </div>
        </div>
    )
  }
}

const POST_QUERY = gql`
  query PostQuery($id: ID!) {
    post(id: $id) {
      id
      title
      text
    }
  }
`

const DetailPageWithGraphQL = graphql(POST_QUERY, {
    name: 'postQuery', // name of the injected prop: this.props.postQuery...
    options: props => ({
      // https://www.apollographql.com/docs/react/basics/queries.html#options-from-props
      variables: {
        id: props.match.params.id,
      },
    }),
  })(DetailPage)

export default withRouter(DetailPageWithGraphQL)
