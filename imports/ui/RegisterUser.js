import React, { Component } from 'react';
import { Accounts } from 'meteor/accounts-base';
import PropTypes from 'prop-types';

export default class RegisterUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordMessage: "",
      usernameMessage: ""
    }
  }

  registerUser(e) {
    e.preventDefault();
    this.setState({
      passwordMessage: "",
      usernameMessage: ""
    })
  if (this.password.value == this.confirmPassword.value) {
      Accounts.createUser(
        {
          username: this.username.value,
          password: this.confirmPassword.value
        },
        error => {
          if (error) {
            console.log(error);
            this.setState({
              usernameMessage: "username already exists"
            })
            this.username.value = "";
            this.password.value = "";
            this.confirmPassword.value = "";
          } else {
            this.props.onClose && this.props.onClose(e);
          }
        }
      )  
    } else {
      this.setState({
        passwordMessage: "passwords do not match!!!"
      })
      this.password.value = "";
      this.confirmPassword.value = "";
    }
  }

  render() { 
    return (
      <div className="loginForm">
        <form onSubmit={this.registerUser.bind(this)}>
          <h3>Register</h3>
          <span>Enter Username</span>
          {this.state.usernameMessage.length > 0 && <div className="passwordMessage"><i>{this.state.usernameMessage}</i></div>}
          <input type="text" ref={input => (this.username = input)} required/>
          <span>Enter Password</span>
          <input type="password" ref={input => (this.password = input)} required/>
          <span>Confirm Password</span>
          <input type="password" ref={input => (this.confirmPassword = input)} required/>
          {this.state.passwordMessage.length > 0 && <div className="passwordMessage"><i>{this.state.passwordMessage}</i></div>}
          <button className="loginButton" type="submit">Reqister New User</button>
        </form>
      </div>
    );
  }
}
RegisterUser.propTypes = {
  onClose: PropTypes.object
};