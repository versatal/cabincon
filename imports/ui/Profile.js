import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { Posts } from '../api/posts.js';

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
  Meteor.subscribe('posts');
  Meteor.subscribe('userData');

  return {
    posts: Posts.find({}).fetch(),
    currentUser: Meteor.user(),
  };
})(Profile);