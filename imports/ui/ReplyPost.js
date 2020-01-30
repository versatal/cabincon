import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import marked from 'marked';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class ReplyPost extends Component {

  deleteThisPost() {
    Meteor.call('posts.remove', this.props.post._id)
  }

  render() {
    const { currentUser, post } = this.props;
    const postIdString = "/editreply:" + post._id;

    if (post) {
      return (
        <div className="replyGroup">
          <div className="postOwnerInfo">
            <span>{post.owner}</span>
            <img src="/warrior.jpg" />
          </div>
          <div className="replyPostDetails">
            <div className="replyPostBody" dangerouslySetInnerHTML={{__html: marked(post.text)}}></div>
            <div className="replyPostOwnerMenu"> - by {post.owner} 
              {currentUser && currentUser._id == post.ownerId && <button className="delete" onClick={this.deleteThisPost.bind(this)}>&times;</button>}  
              {currentUser && currentUser._id == post.ownerId && <Link to={postIdString}>Edit</Link>} 
            </div>        
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
})(ReplyPost);

ReplyPost.propTypes = {
  currentUser: PropTypes.object,
  post: PropTypes.object,
};