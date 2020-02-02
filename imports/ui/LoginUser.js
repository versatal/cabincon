import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

export default class LoginUser extends Component {

  login(e) {
    e.preventDefault();
    Meteor.loginWithPassword (this.username.value, this.password.value,
      error => {
        console.log(error);
      }
    )
  }

  render() { 
    return (
      <div className="loginForm">
        <form onSubmit={this.login.bind(this)}>
          <input type="text" ref={input => (this.username = input)} />
          <input type="password" ref={input => (this.password = input)} />
          <button className="loginButton" type="submit">login</button>
        </form>
      </div>
    );
  }
}