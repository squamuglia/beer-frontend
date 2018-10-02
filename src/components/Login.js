import React, { Component } from 'react';
import { connect } from 'react-redux';

class Login extends Component {
  state = {
    email: '',
    password: ''
  };

  updateState = (key, value) => {
    this.setState(
      {
        ...this.state,
        [key]: value
      },
      () => console.log(this.state)
    );
  };

  storeToken = token => {
    localStorage.setItem('token', token);
    console.log('storing token');

    this.props.login();
  };

  checkLogIn = e => {
    console.log('logging in');
    e.preventDefault();

    fetch('http://localhost:3000/api/v1/sessions', {
      method: 'POST',
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(r => r.json())
      .then(r => this.storeToken(r.authentication_token))
      .catch(e => console.log(e));
  };

  render() {
    return (
      <div className="f aic jcc x h20">
        <div className="fa mw20">
          <form onSubmit={e => this.checkLogIn(e)}>
            <input
              type="text"
              name="email"
              placeholder="username"
              onChange={e => this.updateState('email', e.target.value)}
            />

            <input
              type="password"
              name="password"
              placeholder="password"
              onChange={e => this.updateState('password', e.target.value)}
            />
            <div
              className="px1 mt1 border ac button"
              onClick={e => this.checkLogIn(e)}
            >
              Submit
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const msp = state => {
  return {
    url: state.url
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
)(Login);
