import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { Blogs } from '../api/blogs.js';
import PropTypes from 'prop-types';

class BlogArchive extends Component {

  renderBlogArchive() {
    return this.props.blogs.map(function(blog) {
      let linkText = "/blog:" + blog._id;
      return <div key={blog._id} className="archiveItem">
               <Link className="archiveLink" to={linkText}>{blog.title}</Link>
               <span className="archivePostingDetails">Posted on {blog.createdAt.toDateString()} by {Meteor.users.findOne(blog.ownerId) ? Meteor.users.findOne(blog.ownerId).username : "unknown"}</span>
             </div>      
    })      
  }

  render() {
    return (
      <div className="blogArchive">
        <div className="blogArchiveHeader">
          <h3>Blog Archive</h3>
        </div>
        <div className="archiveList">
          {this.renderBlogArchive()}
        </div>
      </div>
    )
  }
}

export default withTracker(() => {
  Meteor.subscribe('userData');
  Meteor.subscribe('blogs');

  return {
    blogs: Blogs.find({}, {sort: {createdAt: -1}}).fetch(),
  };
})(BlogArchive);

BlogArchive.propTypes = {
  blogs: PropTypes.array,
};