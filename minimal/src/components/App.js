import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import logo from '../logo.svg';
import '../styles/App.css';


const MY_QUERY = gql`
query hello {
  hello(name: $name) {
    name
  }
}`;

class App extends Component {

   render() {

     let { data } = this.props

     if (data.loading) {
        return (<div>Loading</div>)
     }

     if(data.error) {
       return (<div>An unexpected error occurred</div>)
     }

     return (
       <div className="App">
         <div className="App-header">
           <img src={logo} className="App-logo" alt="logo" />
           <h2>Welcome to Apollo</h2>
           <h3>{data.hello.name}</h3>
         </div>
       </div>
     );
   }
 }

const AppWithData = graphql(MY_QUERY)(App); 
export default AppWithData;