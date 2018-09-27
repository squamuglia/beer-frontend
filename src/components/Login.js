import React, { Component } from 'react';

class Login extends Component {
  state = {
    logIn: false
  };

  toggleLogIn = () => {
    this.setState({
      logIn: !this.state.logIn
    });
  };

  checkLogIn = e => {
    e.preventDefault();
    console.log('password', e.target);
  };

  render() {
    return (
      <div className="f aic jcc x h20">
        <div className="fa mw20">
          <form onSubmit={e => this.checkLogIn(e)}>
            <input
              type="text"
              name="password"
              placeholder="what's the password?"
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
