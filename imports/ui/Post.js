import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

class Post extends Component {

  render() {
    const { currentUser, post } = this.props;
    console.log(post);

    if (currentUser) {
      return (
        <div>{post.text}</div>
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
})(Post);