import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

class Profile extends Component {

  render() {
    const { currentUser } = this.props;

    if (currentUser) {
      return (
        <div className="container">
          {currentUser.username}
        </div>
      );
    } else {
      <div>Loading...</div>
    }

  }
}



export default withTracker(() => {
  Meteor.subscribe('userData');

  return {
    currentUser: Meteor.user(),
  };
})(Profile);

Profile.propTypes = {
  currentUser: PropTypes.object,
};