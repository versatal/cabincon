import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';


class EditFirstName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstNameEdit: false,
      firstNameDisabled: true,
    }
  }

  handleSubmitFirstName(event){
    event.preventDefault();
    this.setState(prevState => ({
      firstNameEdit: !prevState.firstNameEdit,
      firstNameDisabled: true
    }))

    Meteor.call("userData.editFirstName", this.props.currentUser._id, this.firstName.value)

  }

  toggleEdit(e) {
    e.preventDefault();
    this.setState(prevState => ({
      firstNameEdit: !prevState.firstNameEdit,
      firstNameDisabled: !prevState.firstNameDisabled
    }))
  }

  
  render() {
    const { currentUser } = this.props;

    return (
      <div className="userItem">
        <form className="profileForm" onSubmit={this.handleSubmitFirstName.bind(this)}>
          <label htmlFor="firstName">First Name: </label>
          <input type="text" disabled={this.state.firstNameDisabled} placeholder={currentUser.firstName} id="firstName" ref={input => (this.firstName = input)} />
          <div className="profileFormEdit" onClick={this.toggleEdit.bind(this)}>{this.state.firstNameEdit ? "cancel" : "edit"}</div>
          {this.state.firstNameEdit && <button className="profileFormSubmit" type="submit">update</button>}
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
})(EditFirstName);

EditFirstName.propTypes = {
  currentUser: PropTypes.object,
};