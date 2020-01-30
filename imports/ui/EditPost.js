/* eslint-disable react/no-find-dom-node */
/* eslint-disable react/no-string-refs */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Posts } from '../api/posts.js';
import PropTypes from 'prop-types';

class EditPost extends Component {

  handleEditTitleText(event){
    event.preventDefault();
    const text = ReactDOM.findDOMNode(this.refs.postBody).value.trim();
    const title = ReactDOM.findDOMNode(this.refs.postTitle).value.trim();
    const postIdString = "/post:" + this.props.post._id;

    Meteor.call("posts.editTitleText", this.props.post._id, title, text);
    this.props.history.push(postIdString);

  }

  render() {
    const { post } = this.props;

    if (post) {
      return (
        <div className="container">
          <div className="postEdit">
            <div className="postEditHeader">
              <h1>Edit Post</h1>
            </div>
            <form className="postEditForm" onSubmit={this.handleEditTitleText.bind(this)} >
              <input className="postEditTitle" type="text" ref="postTitle" defaultValue={this.props.post.title} />
              <textarea className="postEditText" ref="postBody" defaultValue={this.props.post.text} />
              <input className="postEditSubmit" type="submit" value="submit" />
            </form>          
          </div>
        </div>
      )  
    } else {
      return (
        <div className="container">Loading...</div>
      )
    }
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
})(EditPost);

EditPost.propTypes = {
  post: PropTypes.object,
  currentUser: PropTypes.object,
  history: PropTypes.object,
};