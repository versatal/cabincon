import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Accounts } from 'meteor/accounts-base';
import PropTypes from 'prop-types';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPasswordError: "",
      newPasswordError: "",
      okMessage: ""
    }
  }

  handlePasswordChange(e) {
    e.preventDefault();
    this.setState({
      oldPasswordError: "",
      newPasswordError: "",
      okMessage: ""
    })
    if (this.oldPassword.value.length < 1 || this.newPassword.value.length < 1) {
      if (this.oldPassword.value.length < 1) {
        this.setState({
          oldPasswordError: "old password missing"
        })
      } else if (this.newPassword.value.length < 1) {
        this.setState({
          newPasswordError: "old password missing"
        })
      }
    } else { 
      Accounts.changePassword(this.oldPassword.value, this.newPassword.value, error => {
        if (error) {
          this.setState({
            oldPasswordError: "old password is incorrect"
          })  
        } else {
          this.setState({
            okMessage: "Password changed successfully"
          })      
        }
      })  
    }
    this.oldPassword.value = ""
    this.newPassword.value = ""
  }

  onClose = e => {
    this.props.onClose && this.props.onClose(e);
  };

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
          <form onSubmit={this.handlePasswordChange.bind(this)}>
            <label htmlFor="oldPassword">Old Password</label>
            {this.state.oldPasswordError.length > 0 && <div>{this.state.oldPasswordError}</div> }
            <input type="password" id="oldPassword" ref={input => (this.oldPassword = input)}/>
            <label htmlFor="newPassword">New Password</label>
            {this.state.newPasswordError.length > 0 && <div>{this.state.newPasswordError}</div> }
            <input type="password" id="newPassword" ref={input => (this.newPassword = input)}/>
            <button type="submit">Change</button>
          </form>
          {this.state.okMessage.length > 0 && <div className="okMessage">{this.state.okMessage}</div>}
          <button className="close" onClick={e => {this.onClose(e)}} >X</button>
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
})(Modal);

Modal.propTypes = {
  currentUser: PropTypes.object,
  show: PropTypes.bool,
};