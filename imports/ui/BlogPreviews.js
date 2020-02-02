import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Comments } from '../api/comments.js';
import marked from 'marked';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class BlogPreviews extends Component {

  previewText() {
    if (this.props.blog.body.length > 800) {
      return this.props.blog.body.substr(0, 800) + " ... ";
    } else {
      return this.props.blog.body + " ... "
    }
  }


  render() {
    const { blog } = this.props;
    let blogIdString = "";
    if (blog) {blogIdString = "/blog:" + blog._id;}

    if (blog) {
      return (
        <div className="blogPreviewItem">
          <div className="blogPreviewHeader">
            <h3>{blog.title}</h3>
          </div>
          <span>posted on: {blog.createdAt.toString()}</span>
          <div className="blogPreviewBody" dangerouslySetInnerHTML={{__html: marked(this.previewText())}}></div>
          <Link className="blogPreviewLink" to={blogIdString}>See full article</Link>          
        </div>
      )  
    } else {
      return (
        <div>Loading...</div>
      )
    }
  }
}

export default withTracker(() => {
  Meteor.subscribe('blogs');
  Meteor.subscribe('userData');

  return {
    allComments: Comments.find({}).fetch(),
    currentUser: Meteor.user(),
  };
})(BlogPreviews);

BlogPreviews.propTypes = {
  blog: PropTypes.object,
  allComments: PropTypes.array,
};