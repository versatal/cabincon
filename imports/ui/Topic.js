import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';

class Topic extends Component {

  deleteThisPost() {
    Meteor.call('posts.remove', this.props.post._id)
  }

  render() {
    const { currentUser, post } = this.props;
    let postIdString = "";
    if (post) {postIdString = "/edittopic:" + post._id;}

    if (post) {
      return (
        <div>
        {currentUser && currentUser.isAdmin && <button className="delete" onClick={this.deleteThisPost.bind(this)}>&times;</button>}
        <h1 className="forumTopic">{post.title} - </h1>
        <span>{post.text}</span>
        {currentUser && currentUser._id == post.ownerId && <Link className="editLink" to={postIdString}>Edit</Link>} 
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
})(Topic);