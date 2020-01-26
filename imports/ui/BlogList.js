import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { Blogs } from '../api/blogs.js';
import BlogPreviews from './BlogPreviews.js';
import BlogArchive from './BlogArchive.js';

class Blog extends Component {
  renderBlogPreviews() {
    return this.props.blogs.map(function(blog) {
      return <BlogPreviews key={blog._id} blog={blog}/>      
    })            
  }
  
  render() {
    const { blogs, comments, currentUser } = this.props;
    
    return (
      <div className="container">
        <div className="blogMainHeader">
          <h1>BiggusBloggus</h1>
          {currentUser && currentUser.isAdmin && <Link className="blogCreateLink" to="/addblog">Create Blog</Link>}
        </div>
        <div className="blogAndForum">
          <div className="blogGroup">
            {blogs.length > 0 ? this.renderBlogPreviews() : <div>No Blogs posted yet</div>}
          </div>
          <BlogArchive />
        </div>
      </div>
    );
  }
}



export default withTracker(() => {
  Meteor.subscribe('userData');
  Meteor.subscribe('blogs');

  return {
    currentUser: Meteor.user(),
    blogs: Blogs.find({}).fetch(),
  };
})(Blog);