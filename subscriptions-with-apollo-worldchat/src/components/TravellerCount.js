import React, { Component} from 'react'
import '../styles/TravellerCount.css'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const allTravellersCount = gql`
    query allTravellersCount {
        _allTravellersMeta {
            count
        }
    }
`

class TravellerCount extends Component {

  render() {

    if (this.props.allTravellersCountQuery.loading) {
      return <div className='Container'>Loading Travellers</div>
    }

    return (
      <div className='Container'>
        <div className='TravellerCount'>
          <img
            className='TravellerCountIcon'
            alt=''
            src={require('../assets/travellers.svg')}
          />
          <div className='TravellerCountNumber'>{this.props.allTravellersCountQuery._allTravellersMeta.count}</div>
          <div className='TravellerCountText'>travellers were here</div>
        </div>
      </div>
    )
  }

}

export default graphql(allTravellersCount, {name: "allTravellersCountQuery"}) (TravellerCount)
