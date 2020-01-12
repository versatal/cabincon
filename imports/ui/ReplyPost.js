import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

class ReplyPost extends Component {

  deleteThisPost() {
    Meteor.call('posts.remove', this.props.post._id)
  }

  render() {
    const { currentUser, post } = this.props;
    const postIdString = "/post:" + post._id;

    if (post) {
      return (
        <div>{post.title} - {post.owner} <button className="delete" onClick={this.deleteThisPost.bind(this)}>&times;</button> </div>
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
})(ReplyPost);