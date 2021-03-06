import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { Posts } from '../api/posts.js';
import PropTypes from 'prop-types';

class SubTopicLink extends Component {

  deleteThisPost() {
    Meteor.call('posts.remove', this.props.post._id)
  }

  numberOfRelatedPosts(id) {
    return Posts.find( { postedIn: id } ).count()
  }

  latestPostOwner(id) {
    if (Posts.find( { postedIn: id }, {sort: {_id: 1}} ).fetch().length > 0) {
      return Posts.find( { postedIn: id }, {sort: {_id: 1}} ).fetch()[0].owner
    }
  }

  render() {
    const { currentUser, post } = this.props;
    const subTopicIdString = "/subTopic:" + post._id;

    if (post) {
      return (
        <div className="subTopicLink">
          <div className="subTopicLinkId">
            {currentUser && currentUser.isAdmin && <button className="subTopicLinkDelete" onClick={this.deleteThisPost.bind(this)}>&times;</button>}
            <div>
              <Link className="subTopicLinkTitle" to={subTopicIdString} >{post.title} </Link>
              <span className="subTopicLinkText">{post.text}</span>
            </div>
          </div>
          <span className="subTopicPosts">{this.numberOfRelatedPosts(post._id)}</span>
          {this.numberOfRelatedPosts(post._id) > 0 ? <span className="subTopicLatest">{this.latestPostOwner(post._id)}</span> : <span className="subTopicLatest">None</span>}        
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
})(SubTopicLink);

SubTopicLink.propTypes = {
  currentUser: PropTypes.object,
  post: PropTypes.object,
};