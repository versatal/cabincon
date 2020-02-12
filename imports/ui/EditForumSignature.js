import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';


class EditForumSignature extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signatureEdit: false,
      signatureDisabled: true,
    }
  }

  handleEditSignature(event){
    event.preventDefault();
    this.setState(prevState => ({
      signatureEdit: !prevState.signatureEdit,
      signatureDisabled: true
    }))

    Meteor.call("userData.editForumSignature", this.props.currentUser._id, this.signature.value)

  }

  toggleSignature(e) {
    e.preventDefault();
    this.setState(prevState => ({
      signatureEdit: !prevState.signatureEdit,
      signatureDisabled: !prevState.signatureDisabled
    }))
  }

  
  render() {
    const { currentUser } = this.props;

    return (
      <div className="userItem forumSigGroup sigTextarea">
        <form className="profileForm" onSubmit={this.handleEditSignature.bind(this)}>
          <div className="signatureHeader">
            <span>Forum Signature</span>
            <div className="profileFormTextareaEdit" onClick={this.toggleSignature.bind(this)}>{this.state.signatureEdit ? "cancel" : "edit"}</div>
          </div>
          <textarea className="forumSignature" disabled={this.state.signatureDisabled} placeholder={currentUser.signature} ref={textarea => (this.signature = textarea)} />
          {this.state.signatureEdit && <button className="profileFormTextareaSubmit" type="submit">update</button>}
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
})(EditForumSignature);

EditForumSignature.propTypes = {
  currentUser: PropTypes.object,
};