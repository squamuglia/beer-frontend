import React, { Component } from 'react';
import { connect } from 'react-redux';

class Logout extends Component {
  removeTokens = r => {
    console.log(r);

    localStorage.removeItem('token');
    localStorage.removeItem('email');
  };

  logout = () => {
    console.log('logout');
    fetch(this.props.url + '/api/v1/sessions', {
      method: 'DELETE',
      body: JSON.stringify({
        email: localStorage.getItem('email'),
        authentication_token: localStorage.getItem('token')
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(r => r.json())
      .then(r => this.removeTokens(r))
      .catch(e => console.log(e));

    this.props.logout();
  };

  render() {
    return (
      <p
        className="bottom right abs under pointer small logout"
        onClick={this.logout}
      >
        Logout
      </p>
    );
  }
}

function msp(state) {
  return {
    url: state.url,
    email: state.email
  };
}

function mdp(dispatch) {
  return {
    logout: () => {
      dispatch({ type: 'LOGOUT' });
    }
  };
}

export default connect(
  msp,
  mdp
)(Logout);
