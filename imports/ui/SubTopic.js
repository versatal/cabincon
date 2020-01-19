import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Posts } from '../api/posts.js';
import { withTracker } from 'meteor/react-meteor-data';
import PostLink from './PostLink.js'
import { Link } from 'react-router-dom';

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
    let postIdString = "";
    if (topic) {postIdString = "/editsubtopic:" + topic._id;}

    const markedownInstructionsOne = `
    Heading
    =======
    
    Sub-heading
    -----------
    
    Paragraphs are separated
    by a blank line.
    
    Leave 2 spaces at the end of a line to do a  
    line break
    `
    const markedownInstructionsTwo = `
    Text attributes:
    
    *italic*  
    **bold**  
    ~~strikethrough~~

    A Link  
    [Roger Hardin](https://www.freecodecamp.com/versatal)

    An Image  
    ![sword](https://visualpharm.com/assets/988/Sword-595b40b65ba036ed117d1695.svg)
    `

    if (topic) {
      return (
        <div className="container">
          <div className="subTopicHeader">
            <span className="subTopicTitle">{topic.title}:</span>
            <span className="subTopicText">{topic.text}</span>
            {currentUser && currentUser._id == topic.ownerId && <Link className="editLink" to={postIdString}>Edit</Link>} 
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
              <textarea className="topicalPostAddBody" id="postBody" ref="postBody" defaultValue="body - may use markdown" />
              <input type="submit" value="submit" />
            </form>
          </div>
          <div className="markedHeading">
            <h4>You may use markdown to format your post:</h4>
          </div>
          <div className="markedArea">
            <div className="markdInst"><textarea>{markedownInstructionsOne}</textarea></div>
            <div className="markdInst"><textarea>{markedownInstructionsTwo}</textarea></div>
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