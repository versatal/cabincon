import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';

class PostLink extends Component {

  deleteThisPost() {
    Meteor.call('posts.remove', this.props.post._id)
  }

  render() {
    const { currentUser, post } = this.props;
    const postIdString = "/post:" + post._id;

    if (post) {
      return (
        <div className="topicalPostLink"><Link to={postIdString}>{post.title}</Link> - {post.owner} <button className="delete" onClick={this.deleteThisPost.bind(this)}>&times;</button> </div>
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
})(PostLink);