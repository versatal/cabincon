import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Posts } from '../api/posts.js';
import { withTracker } from 'meteor/react-meteor-data';
import PostLink from './PostLink.js'

class SubTopic extends Component {

  handleSubmitPost(event){
    event.preventDefault();
    const text = ReactDOM.findDOMNode(this.refs.postBody).value.trim();
    const type = "post";
    const title = ReactDOM.findDOMNode(this.refs.postTitle).value.trim();
    const subTopicOf = "";
    const postedIn = this.props.topic._id;

    Meteor.call("posts.insert", text, type, title, subTopicOf, postedIn)

    ReactDOM.findDOMNode(this.refs.postBody).value = 'body';
    ReactDOM.findDOMNode(this.refs.postTitle).value = 'title';

  }

  render() {
    const { topic, currentUser, posts } = this.props;
    const topicalPosts = posts.filter(post => post.postedIn == topic._id)
    if (topic) {
      return (
        <div className="container">
          <div className="subTopicHeader">
            <span className="subTopicTitle">{topic.title}:</span>
            <span className="subTopicText">{topic.text}</span>
          </div>
          <div className="topicalPostsList">
            {topicalPosts.map(function(post) {
              return <PostLink key={post._id} post={post}/>
            })}
          </div>
          <div>
            <form className="topicalPostAdd" onSubmit={this.handleSubmitPost.bind(this)} >
              <span>Post your response:</span>
              <input className="topicalPostAddTitle" id="postTitle" type="text" ref="postTitle" defaultValue="title" />
              <textarea className="topicalPostAddBody" id="postBody" ref="postBody" defaultValue="body" />
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
  Meteor.subscribe('userData');
  Meteor.subscribe('posts');

  return {
    posts: Posts.find({}).fetch(),
    topic: Posts.findOne({ _id }),
    currentUser: Meteor.user(),
  };
})(SubTopic);