import React, { Component } from 'react';
import Login from '../components/Login';
import BeerMasterList from '../components/BeerMasterList';
import { connect } from 'react-redux';

class Admin extends Component {
  checkLogin = props => {
    if (localStorage.getItem('token') || props) {
      return <BeerMasterList />;
    }
    return <Login />;
  };

  render() {
    return <div>{this.checkLogin(this.props.loggedIn)}</div>;
  }
}

const msp = state => {
  return {
    loggedIn: state.loggedIn
  };
};

const mdp = dispatch => {
  return {
    login: () => {
      dispatch({ type: 'LOGIN' });
    }
  };
};

export default connect(
  msp,
  mdp
)(Admin);
