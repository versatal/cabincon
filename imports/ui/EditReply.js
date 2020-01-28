import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Posts } from '../api/posts.js';

class EditReply extends Component {

  handleEditTextOnly(event){
    event.preventDefault();
    const text = ReactDOM.findDOMNode(this.refs.postBody).value.trim();
    const postIdString = "/post:" + this.props.post.replyTo;

    Meteor.call("posts.editTextOnly", this.props.post._id, text);
    this.props.history.push(postIdString);

  }

  render() {
    const { post, currentUser, posts } = this.props;

    if (post) {
      return (
        <div className="container">
          <div className="replyEdit">
            <div className="replyEditHeader">
              <h1>Edit Reply</h1>
            </div>
            <form className="replyEditForm" onSubmit={this.handleEditTextOnly.bind(this)} >
              <textarea className="replyEditText" ref="postBody" defaultValue={this.props.post.text} />
              <input className="replyEditSubmit" type="submit" value="submit" />
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
  Meteor.subscribe('posts');
  Meteor.subscribe('userData');

  return {
    post: Posts.findOne({ _id }),
    currentUser: Meteor.user(),
  };
})(EditReply);