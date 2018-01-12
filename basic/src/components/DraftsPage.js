import React from 'react'
import { Link } from 'react-router-dom'
import Post from '../components/Post'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class DraftsPage extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.location.key !== nextProps.location.key) {
      this.props.draftsQuery.refetch()
    }
  }

  render() {
    if (this.props.draftsQuery.loading) {
      return (
        <div className='flex w-100 h-100 items-center justify-center pt7'>
          <div>Loading (from {process.env.REACT_APP_GRAPHQL_ENDPOINT})</div>
        </div>
      )
    }

    return (
      <div className={'w-100 justify-center pa6'}>
        <div className='w-100' style={{ maxWidth: 1150 }}>
           <Link
            to='/'
            className='ma3 box new-post no-underline'
          >
            <div className='black-80 fw3 description no-underline' >View Feed</div>
          </Link>
          <Link
            to='/create'
            className='ma3 box new-post no-underline'
          >
            <div className='black-80 fw3 description no-underline' >+ Create New Draft</div>
          </Link>
          {this.props.draftsQuery.drafts &&
            this.props.draftsQuery.drafts.map(draft => (
              <Post
                key={draft.id}
                post={draft}
                refresh={() => this.props.draftsQuery.refetch()}
                isDraft={!draft.isPublished}
              />
            ))}
        </div>
        {this.props.children}
      </div>
    )
  }
}

const DRAFTS_QUERY = gql`
  query DraftsQuery {
    drafts {
      id
      text
      title
      isPublished
    }
  }
`

export default graphql(DRAFTS_QUERY, {
  name: 'draftsQuery', // name of the injected prop: this.props.feedQuery...
  options: {
    fetchPolicy: 'network-only',
  },
})(DraftsPage)
