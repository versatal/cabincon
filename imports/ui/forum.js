import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Posts } from '../api/posts.js';
import Post from './Post.js'


class Forum extends Component {

  renderPosts() {
    return this.props.posts.map(function(post) {
      return <Post key={post._id} post={post}/>;
    });
  }

  handleSubmitPost(event){
    event.preventDefault();
    const text = ReactDOM.findDOMNode(this.refs.postBody).value.trim();

    Meteor.call("posts.insert", text)
  }

  render() {
    return (
      <div className="container">
        <h1>Forum</h1>
        {this.renderPosts()}
        <div>
        {this.props.currentUser ?
          <form className="slotAdd" onSubmit={this.handleSubmitPost.bind(this)} >
            <textarea className="postBody" ref="postBody" />
            <input type="submit" value="submit"></input>
          </form>
         :
         <span>Cannot make a new post</span>
        }
        </div>
      </div>
    )
  }
}

export default withTracker(() => {
  Meteor.subscribe('posts');
  Meteor.subscribe('userData');

  return {
    posts: Posts.find({}).fetch(),
    currentUser: Meteor.user(),
  };

})(Forum)