import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

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
        <div className="forumTopic">
          <div className="forumTopicId">
            {currentUser && currentUser.isAdmin && <button className="topicDelete" onClick={this.deleteThisPost.bind(this)}>&times;</button>}
            <h1>{post.title}</h1>
            {currentUser && currentUser._id == post.ownerId && <Link className="topicEditLink" to={postIdString}>Edit</Link>} 
          </div>
          <div className="forumTopicPosts">
            <span>Posts</span>
          </div>
          <div className="forumTopicLatest">
            <span>Latest</span>
          </div>
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

Topic.propTypes = {
  currentUser: PropTypes.object,
  post: PropTypes.object,
};