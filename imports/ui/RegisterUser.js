import React, { Component } from 'react';
import { Accounts } from 'meteor/accounts-base';

export default class RegisterUser extends Component {

  registerUser(e) {
    e.preventDefault();
    Accounts.createUser(
      {
        username: this.username.value,
        password: this.password.value
      },
      error => {
        console.log(error);
      }
    )
  }

  render() { 
    return (
      <div className="loginForm">
        <form onSubmit={this.registerUser.bind(this)}>
          <input type="text" ref={input => (this.username = input)} />
          <input type="password" ref={input => (this.password = input)} />
          <button className="loginButton" type="submit">Reqister User</button>
        </form>
      </div>
    );
  }
}