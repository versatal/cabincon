import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Comments } from '../api/comments.js';

class EditComment extends Component {

  handleUpdateComment(event){
    event.preventDefault();
    const body = ReactDOM.findDOMNode(this.refs.commentBody).value.trim();
    const returnTo = "/blog:" + this.props.comment.commentOf;

    Meteor.call("comments.update", this.props.comment._id, body);
    this.props.history.push(returnTo);

  }

  render() {
    const { comment, currentUser } = this.props;

    if (comment) {
      return (
        <div className="container">
          <div className="commentEdit">
            <form onSubmit={this.handleUpdateComment.bind(this)} >
              <h3>Edit Comment</h3>
              <textarea className="editCommentBody" ref="commentBody" defaultValue={comment.body} />
              <input type="submit" value="submit" />
            </form>          
          </div>
        </div>
      )  
    } else {
      return (
        <div className="container">Loading...</div>
      )
    };
  }
}

export default withTracker(({ location }) => {
  const _id = location.pathname.split(":")[1];
  Meteor.subscribe('comments');
  Meteor.subscribe('userData');

  return {
    comment: Comments.findOne({ _id }),
    currentUser: Meteor.user(),
  };
})(EditComment);