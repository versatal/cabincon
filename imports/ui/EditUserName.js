import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';


class EditUserName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameEdit: false,
      usernameDisabled: true,
    }
  }

  handleEditUsername(event){
    event.preventDefault();
    this.setState(prevState => ({
      usernameEdit: !prevState.usernameEdit,
      usernameDisabled: true
    }))

    Meteor.call("userData.editUsername", this.props.currentUser._id, this.username.value)

  }

  toggleUsername(e) {
    e.preventDefault();
    this.setState(prevState => ({
      usernameEdit: !prevState.usernameEdit,
      usernameDisabled: !prevState.usernameDisabled
    }))
  }

  
  render() {
    const { currentUser } = this.props;

    return (
      <div className="userItem">
        <form className="profileForm" onSubmit={this.handleEditUsername.bind(this)}>
          <label htmlFor="username">Username: </label>
          <input type="text" disabled={this.state.usernameDisabled} placeholder={currentUser.username} id="username" ref={input => (this.username = input)} />
          <div className="profileFormEdit" onClick={this.toggleUsername.bind(this)}>{this.state.usernameEdit ? "cancel" : "edit"}</div>
          {this.state.usernameEdit && <button className="profileFormSubmit" type="submit">update</button>}
        </form>
      </div>
    ) 
  }  
}

export default withTracker(() => {
  Meteor.subscribe('userData');

  return {
    currentUser: Meteor.user(),
  };
})(EditUserName);

EditUserName.propTypes = {
  currentUser: PropTypes.object,
};