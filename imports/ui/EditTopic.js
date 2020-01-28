import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Posts } from '../api/posts.js';

class EditTopic extends Component {

  handleEditTitleText(event){
    event.preventDefault();
    const text = ReactDOM.findDOMNode(this.refs.postBody).value.trim();
    const title = ReactDOM.findDOMNode(this.refs.postTitle).value.trim();
    const postIdString = "/post:" + this.props.post._id;

    Meteor.call("posts.editTitleText", this.props.post._id, title, text);
    this.props.history.push('/forum');

  }

  render() {
    const { post, currentUser, posts } = this.props;

    if (post) {
      return (
        <div className="container">
          <div className="topicEdit">
            <div className="topicEditHeader" >
              <h1>Edit Post</h1>
            </div>
            <form className="topicEditForm" onSubmit={this.handleEditTitleText.bind(this)} >
              <input className="topicEditTitle" type="text" ref="postTitle" defaultValue={this.props.post.title} />
              <textarea className="topicEditText" ref="postBody" defaultValue={this.props.post.text} />
              <input className="topicEditSubmit" type="submit" value="submit" />
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
})(EditTopic);