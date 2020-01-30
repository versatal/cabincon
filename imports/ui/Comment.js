import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import marked from 'marked';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Comment extends Component {

  deleteThisComment() {
    Meteor.call('comments.remove', this.props.comment._id)
  }

  render() {
    const { comment, currentUser  } = this.props;
    let commentIdString = "";
    if (comment) {commentIdString = "/editcomment:" + comment._id;}
    
    if (comment) {
      return (
        <div className="commentItem" key={comment._id}>
          <span>posted by {Meteor.users.findOne(comment.ownerId).username}</span>
          <div className="commentBody" dangerouslySetInnerHTML={{__html: marked(comment.body)}}></div>
          {comment.ownerId == currentUser._id &&
          <div className="commentControls">
            <button onClick={this.deleteThisComment.bind(this)}>delete</button>
            <Link className="commentEditLink" to={commentIdString}>edit</Link>
          </div>} 
        </div>
      )  
    } else {
      return (
        <div>Loading...</div>
      )
    }
  }
}

export default withTracker(() => {
  Meteor.subscribe('userData');
  Meteor.subscribe('comments');

  return {
    currentUser: Meteor.user(),
  };
})(Comment);

Comment.propTypes = {
  comment: PropTypes.object,
  currentUser: PropTypes.object,
};