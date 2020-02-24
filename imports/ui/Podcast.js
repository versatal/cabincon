import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Blogs } from '../api/blogs.js';
import PropTypes from 'prop-types';
import BlogPreviews from './BlogPreviews.js';

class Podcast extends Component {

  renderBlogPreviews() {
    return this.props.blogs.map(function(blog) {
      return <BlogPreviews key={blog._id} blog={blog}/>      
    })            
  }

  render() {
    const { blogs } = this.props;

    return (
      <div className="container">
        <div className="blogMainHeader">
          <h1>The Biggus Geekus Podcast</h1>
        </div>
        <div className="blogAndForum">
          <div className="blogGroup">
            {blogs.length > 0 ? this.renderBlogPreviews() : <div>No Blogs posted yet</div>}
          </div>
        </div>
      </div>
    )
  }
}

export default withTracker(() => {
  Meteor.subscribe('userData');
  Meteor.subscribe('blogs');

  return {
    currentUser: Meteor.user(),
    blogs: Blogs.find({category: "podcast"}, {sort: {createdAt: -1}}).fetch(),
  };
})(Podcast);

Podcast.propTypes = {
  blogs: PropTypes.array,
  currentUser: PropTypes.object,
};