import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';

export default class LoginUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      errorMessage: "username/password incorrect"
    }
  }

  login(e) {
    e.preventDefault();

    Meteor.loginWithPassword (this.username.value, this.password.value,
      error => {
        if (error) {
          console.log(error);
          if (error.error == 403) {
            this.setState(prevState => ({
              error: !prevState.error
            }));           
          }
          this.username.value = "";
          this.password.value = "";
        } else {
          this.props.onClose && this.props.onClose(e);
        }
      }
    )
  }

  render() { 
    return (
      <div className="loginForm">
        <form onSubmit={this.login.bind(this)}>
          <h3>Login</h3>
          {this.state.error && <h4>{this.state.errorMessage}</h4>}
          <span>Username</span>
          <input type="text" ref={input => (this.username = input)} required/>
          <span>Password</span>
          <input type="password" ref={input => (this.password = input)} required/>
          <button className="loginButton" type="submit">login</button>
        </form>
      </div>
    );
  }
}

LoginUser.propTypes = {
  onClose: PropTypes.object
};