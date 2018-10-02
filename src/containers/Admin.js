import React, { Component } from 'react';
import Login from '../components/Login';
import BeerMasterList from '../components/BeerMasterList';
import { connect } from 'react-redux';

class Admin extends Component {
  render() {
    return (
      <React.Fragment>
        <p>{this.props.loggedIn.toString()}</p>
        {this.props.loggedIn ? <BeerMasterList /> : <Login />}
      </React.Fragment>
    );
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
