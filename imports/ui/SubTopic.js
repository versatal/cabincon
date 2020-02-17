import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Posts } from '../api/posts.js';
import { withTracker } from 'meteor/react-meteor-data';
import PostLink from './PostLink.js'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class SubTopic extends Component {

  handleSubmitPost(event){
    event.preventDefault();
    const text = this.postBody.value.trim();
    const type = "post";
    const title = this.postTitle.value.trim();
    const subTopicOf = "";
    const postedIn = this.props.topic._id;

    Meteor.call("posts.insert", text, type, title, subTopicOf, postedIn)

    this.postTitle.value = 'title';
    this.postBody.value = 'body - may use markdown';

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
              <input className="topicalPostAddTitle" id="postTitle" type="text" ref={input => (this.postTitle = input)} defaultValue="title" />
              <textarea className="topicalPostAddBody" id="postBody" ref={textarea => (this.postBody = textarea)} defaultValue="body - may use markdown" />
              <input type="submit" value="submit" />
            </form>
          </div>
          <div className="markedHeading">
            <h4>You may use markdown to format your post:</h4>
          </div>
          <div className="markedArea">
            <div className="markdInst"><textarea defaultValue={markedownInstructionsOne} readOnly></textarea></div>
            <div className="markdInst"><textarea defaultValue={markedownInstructionsTwo} readOnly></textarea></div>
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
  Meteor.subscribe('userData');
  Meteor.subscribe('posts');

  return {
    posts: Posts.find({}).fetch(),
    topic: Posts.findOne({ _id }),
    currentUser: Meteor.user(),
  };
})(SubTopic);

SubTopic.propTypes = {
  currentUser: PropTypes.object,
  posts: PropTypes.array,
  topic: PropTypes.object,
};