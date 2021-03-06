/* eslint-disable react/no-find-dom-node */
/* eslint-disable react/no-string-refs */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Posts } from '../api/posts.js';
import ReplyPost from './ReplyPost.js';
import marked from 'marked';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Post extends Component {

  handleSubmitPost(event){
    event.preventDefault();
    const text = ReactDOM.findDOMNode(this.refs.replyBody).value.trim();
    const type = "post";
    const title = text.substring(0, 19);
    const subTopicOf = "";
    const postedIn = "";
    const replyTo = this.props.post._id;

    Meteor.call("posts.insert", text, type, title, subTopicOf, postedIn, replyTo)

    ReactDOM.findDOMNode(this.refs.replyBody).value = '';

  }

  render() {
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
    [Roger Hardin](https://codepen.io/volcivar)

    An Image  
    ![sword](https://visualpharm.com/assets/988/Sword-595b40b65ba036ed117d1695.svg)
    `

    const { post, currentUser, posts } = this.props;
    const replies = posts.filter(reply => reply.replyTo == post._id);
    let postIdString = "";
    if (post) {postIdString = "/editpost:" + post._id;}
    
    if (post) {
      return (
        <div className="container">
          <div className="threadHeader">
            <h1 className="threadTitle">{post.title}</h1>
          </div>
          <div className="mainPost">
            <div className="postOwnerInfo">
              <span>{post.owner}</span>
              <img src="/warrior.jpg" />
            </div>
            <div className="postDetails">
              <div className="postTitle">
                <span>{post.title}</span>
                {currentUser && currentUser._id == post.ownerId && <Link to={postIdString}>Edit</Link>} 
                <hr></hr>
                </div>
              <div className="postBody" dangerouslySetInnerHTML={{__html: marked(post.text)}}></div>
            </div>
          </div>
          <div>
            {replies.length < 1 ? <div className="repliesList">Be the first to reply to this post!</div> :
              <div className="repliesList">
                {replies.map(function(reply) {
                  return <ReplyPost key={reply._id} post={reply} />
                })}
              </div>              
            }
          </div>
          <div className="replyPost">
            <form onSubmit={this.handleSubmitPost.bind(this)} >
              <h4>Post Your Reply</h4>
              <textarea className="replyBody" ref="replyBody" />
              <input type="submit" value="submit" />
            </form>          
          </div>
          <div className="markedGroup">
            <div className="markedHeading">
              <h4>You may use markdown to format your post:</h4>
            </div>
            <div className="markedArea">
              <div className="markdInst"><textarea>{markedownInstructionsOne}</textarea></div>
              <div className="markdInst"><textarea>{markedownInstructionsTwo}</textarea></div>
            </div>
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
    posts: Posts.find({}).fetch(),
    post: Posts.findOne({ _id }),
    currentUser: Meteor.user(),
  };
})(Post);

Post.propTypes = {
  post: PropTypes.object,
  currentUser: PropTypes.object,
  posts: PropTypes.array,
};