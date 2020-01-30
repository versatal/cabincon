/* eslint-disable react/no-find-dom-node */
/* eslint-disable react/no-string-refs */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Blogs } from '../api/blogs.js';
import { Comments } from '../api/comments.js';
import marked from 'marked';
import { Link } from 'react-router-dom';
import Comment from './Comment.js';
import BlogArchive from './BlogArchive.js';
import PropTypes from 'prop-types';

class Blog extends Component {

  renderComments() {
    const comments = this.props.allComments.filter(comment => comment.commentOf == this.props.blog._id);
    
    if (comments.length > 0) {
      return comments.map(function(comment) {
        return (
          <Comment key={comment._id} comment={comment}/>
        )            
      })        
    } else {
      return <div>No Comments are Posted Yet</div>
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    const body = ReactDOM.findDOMNode(this.refs.commentBody).value.trim();
    const ownerId = this.props.currentUser._id;
    const commentOf = this.props.blog._id;
 
    Meteor.call('comments.insert', body, ownerId, commentOf)
 
    ReactDOM.findDOMNode(this.refs.commentBody).value = '';
  }

  deleteThisBlog() {
    Meteor.call('blogs.remove', this.props.blog._id)

    this.props.history.push("/bloglist");
  }

  render() {
    const { blog, currentUser  } = this.props;

    let blogIdString = "";
    if (blog) {blogIdString = "/editblog:" + blog._id;}
    
    if (blog) {
      return (
        <div className="container">
          <div className="blogHeader">
            <h1 className="blogTitle">{blog.title}</h1>
          </div>
          <div className="blogContainer">
            <div className="blogItem">
              <div className="blogItemHeader">
                {blog.ownerId == currentUser._id && <button onClick={this.deleteThisBlog.bind(this)}>X</button>}
                <span>Posted on: {blog.createdAt.toString()}</span>
                {blog.ownerId == currentUser._id && <Link className="blogEditLink" to={blogIdString}>Edit</Link>}                          
              </div>
              <div className="blogBodyGroup">
                <h4>{blog.title}</h4>
                <div className="blogBody" dangerouslySetInnerHTML={{__html: marked(blog.body)}}></div>
                <span>posted by: {Meteor.users.findOne(blog.ownerId) ? Meteor.users.findOne(blog.ownerId).username : "unknown"}</span>          
              </div>
              <h3 className="commentBlockTitle">Comments:</h3>
              <div className="commentBlock">
                {this.renderComments()}
              </div>
              <div className="addCommentBlock">
                <form onSubmit={this.handleSubmit.bind(this)}>
                  <h3>Please post a comment</h3>
                  <textarea ref="commentBody" />
                  <input type="submit" value="submit" />
                </form>
              </div>
            </div>
            <BlogArchive />
          </div>
        </div>
      )  
    } else {
      return (
        <div>Loading...</div>
      )
    }
  }
}

export default withTracker(({ location }) => {
  const _id = location.pathname.split(":")[1];
  Meteor.subscribe('blogs');
  Meteor.subscribe('userData');
  Meteor.subscribe('comments');

  return {
    blog: Blogs.findOne({ _id }),
    allComments: Comments.find({}).fetch(),
    currentUser: Meteor.user(),
  };
})(Blog);

Blog.propTypes = {
  blog: PropTypes.object,
  currentUser: PropTypes.object,
  history: PropTypes.object,
  allComments: PropTypes.array,
};