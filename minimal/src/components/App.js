import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import logo from '../logo.svg';
import '../styles/App.css';

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
           <h3>Welcome to React + GraphQL + Apollo minimal boilerplate</h3>
           <h3>{data.hello}</h3>
         </div>
       </div>
     );
   }
 }

const MY_QUERY = gql`
  query hello($name: String) {
    hello(name: $name)
  }`;

const AppWithData = graphql(MY_QUERY)(App); 
export default AppWithData;