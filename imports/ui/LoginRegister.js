import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import RegisterUser from './RegisterUser.js';
import LoginUser from './LoginUser.js';
import { Link } from 'react-router-dom';

export default class LoginRegister extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      login: true,
      showForm: false
     }
  }

  toggleLogin(e) {
    e.preventDefault()
    this.setState(prevState => ({ login:  !prevState.login}))
  }

  toggleForm(e) {
    e.preventDefault()
    this.setState(prevState => ({ showForm:  !prevState.showForm}))
  }

  render() { 
    return (  
      <div className="userArea">
        {Meteor.user() ?
          <div className="userLableGroup">
            <div className="userLable"><Link to="/profile">{Meteor.user().username}</Link></div>
            <button onClick={() => Meteor.logout()}>logout</button>
          </div> 
          : 
          <div className="loginRegisterGroup">
            <div className="loginRegisterGroupLabel">
              <span onClick={this.toggleForm.bind(this)}>{this.state.showForm ?  "close" : "login/register"}</span>
            </div>
            {this.state.showForm && 
              <div className="loginRegister">
                {this.state.login ? <LoginUser /> : <RegisterUser />}            
                <div className="toggleLabel" onClick={this.toggleLogin.bind(this)}>
                  {this.state.login ? <span>Register</span> : <span>Login</span>}
                </div>
              </div>
            }  
          </div>
          }
      </div>
    );
  }
}