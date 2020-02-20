import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Accounts } from 'meteor/accounts-base';
import PropTypes from 'prop-types';
import LoginUser from './LoginUser.js';
import RegisterUser from './RegisterUser.js';

class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPasswordError: "",
      newPasswordError: "",
      okMessage: "",
      loginToggle: true,
    }
  }

  onClose = e => {
    this.props.onClose && this.props.onClose(e);
  };

  toggleLoginRegister = e => {
    this.setState(prevState => ({
      loginToggle: !prevState.loginToggle
    }))
  }

  render() {
    //    const { currentUser } = this.props;
    if (!this.props.show) {
      return null
    }
    return (
      <div className="modal" id="modal">
        <div className="content">
          {/* eslint-disable-next-line react/prop-types */}
          <div>{this.props.children}
          </div>
          {this.state.loginToggle ? <LoginUser onClose={this.props.onclose}/> : <RegisterUser onClose={this.props.onclose}/>}
          <div className="loginRegisterModalControls">
            <button className="close" onClick={e => {this.onClose(e)}} >X</button>
            <button onClick={e => {this.toggleLoginRegister(e)} }>{this.state.loginToggle ? "Register" : "Login"}</button>
          </div>
        </div>
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('userData');

  return {
    currentUser: Meteor.user(),
  };
})(LoginModal);

LoginModal.propTypes = {
  currentUser: PropTypes.object,
  show: PropTypes.bool,
};