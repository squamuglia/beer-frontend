import React, { Component } from 'react';
import Login from '../components/Login';
import BeerMasterList from '../components/BeerMasterList';

class Admin extends Component {
  state = {
    logIn: true
  };
  render() {
    if (!this.state.logIn) {
      return <Login />;
    } else {
      return <BeerMasterList />;
    }
  }
}

export default Admin;
