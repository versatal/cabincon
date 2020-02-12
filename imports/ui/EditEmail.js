import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';


class EditEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailEdit: false,
      emailDisabled: true
    }
  }

  handleEditEmail(event){
    event.preventDefault();
    this.setState(prevState => ({
      emailEdit: !prevState.emailEdit,
      emailDisabled: true
    }))

    Meteor.call("userData.editEmail", this.props.currentUser._id, this.email.value)

  }

  toggleEmail(e) {
    e.preventDefault();
    this.setState(prevState => ({
      emailEdit: !prevState.emailEdit,
      emailDisabled: !prevState.emailDisabled
    }))
  }
  
  render() {
    const { currentUser } = this.props;

    return (
      <div className="userItem">
        <form className="profileForm" onSubmit={this.handleEditEmail.bind(this)}>
          <label htmlFor="email">Email: </label>
          <input type="text" disabled={this.state.emailDisabled} placeholder={currentUser.email} id="email" ref={input => (this.email = input)} />
          <div className="profileFormEdit" onClick={this.toggleEmail.bind(this)}>{this.state.emailEdit ? "cancel" : "edit"}</div>
          {this.state.emailEdit && <button className="profileFormSubmit" type="submit">update</button>}
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
})(EditEmail);

EditEmail.propTypes = {
  currentUser: PropTypes.object,
};