import React, {Component} from 'react'
import './Banner.css'

export default class Banner extends Component {

  render() {
    return (
      <div className='Banner'>
        <img src={require('./assets/info.svg')} alt="info"/>
        <div className='InfoText'>This app is using <b>GraphQL Subscriptions</b> with <b>Apollo Client</b></div>
        <div
          className='ReadTutorialButton'
          onClick={() => this._openTutorial()}
        >Read Tutorial</div>
      </div>
    )
  }

  _openTutorial = () => {
    const win = window.open('https://www.graph.cool/docs/tutorials/worldchat-subscriptions-example-ui0eizishe', '_blank');
    win.focus();
  }

}
