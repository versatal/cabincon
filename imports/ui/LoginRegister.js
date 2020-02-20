import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import RegisterUser from './RegisterUser.js';
import LoginUser from './LoginUser.js';
import { Link } from 'react-router-dom';
import LoginModal from "./LoginModal.js"

export default class LoginRegister extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      login: true,
      showForm: false,
      show: false
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

  showModal = e => {
    this.setState(prevState => ({
      show: !prevState.show
    }))
  }

  render() { 
    return (  
      <div className="userArea">
        {Meteor.user() ?
          <div className="userLableGroup">
            <ul className="mainMenuUser">
              <li className="mainMenuUserItem">
                <img className="userIcon" src="/roman-helmet.png"></img>
                <ul className="subMenuUser">
                  <li className="subMenuUserItem"><div className="userLable"><Link className="subMenuUserLink" to="/profile">{Meteor.user().username}</Link></div></li>
                  <li className="subMenuUserItem"><button onClick={() => Meteor.logout()}>logout</button></li>
                </ul>
              </li>
            </ul>                        
          </div> 
          : 
          <div className="loginRegisterGroup">
            <div className="loginRegisterGroupLabel">
{/*              <img className="userIcon" onClick={this.toggleForm.bind(this)} src="/user.png"></img> */}
              <img className="userIcon" onClick={this.showModal.bind(this)} src="/user.png"></img>
            </div>
            <LoginModal onClose={this.showModal} show={this.state.show}></LoginModal>
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