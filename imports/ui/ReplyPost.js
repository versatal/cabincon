import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import marked from 'marked';
import { Link } from 'react-router-dom';

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
          <div className="replyPostBody" dangerouslySetInnerHTML={{__html: marked(post.text)}}></div>
          <div className="postOwnerMenu"> - by {post.owner} <button className="delete" onClick={this.deleteThisPost.bind(this)}>&times;</button> 
            {currentUser && currentUser._id == post.ownerId && <Link to={postIdString}>Edit</Link>} 
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