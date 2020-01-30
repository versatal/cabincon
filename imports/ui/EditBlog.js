/* eslint-disable react/no-find-dom-node */
/* eslint-disable react/no-string-refs */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Blogs } from '../api/blogs.js';
import PropTypes from 'prop-types';

class EditBlog extends Component {

  handleUpdateBlog(event){
    event.preventDefault();
    const title = ReactDOM.findDOMNode(this.refs.blogTitle).value.trim();
    const body = ReactDOM.findDOMNode(this.refs.blogBody).value.trim();

    Meteor.call("blogs.update", this.props.blog._id, title, body);
    this.props.history.push("/bloglist");

  }

  render() {
    const { blog } = this.props;

    if (blog) {
      return (
        <div className="container">
          <div className="blogUpdate">
            <div className="blogUpdateHeader">
              <h1>Update Post</h1>
            </div>
            <form onSubmit={this.handleUpdateBlog.bind(this)} >
              <input className="editBlogTitle" type="text" ref="blogTitle" defaultValue={blog.title} />
              <textarea className="editBlogBody" ref="blogBody" defaultValue={blog.body} />
              <input type="submit" value="submit" />
            </form>          
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
  Meteor.subscribe('blogs');
  Meteor.subscribe('userData');

  return {
    blog: Blogs.findOne({ _id }),
    currentUser: Meteor.user(),
  };
})(EditBlog);

EditBlog.propTypes = {
  blog: PropTypes.object,
  history: PropTypes.object,
};