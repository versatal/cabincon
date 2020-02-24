/* eslint-disable react/no-find-dom-node */
/* eslint-disable react/no-string-refs */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import marked from 'marked';
import PropTypes from 'prop-types';

class AddBlog extends Component {

  constructor(props) {
    super(props);

    this.state = ({
      title: "begin editing title here",
      body: "begin editing body here"
    })
  }

  handleAddBlog(event){
    event.preventDefault();

    const title = ReactDOM.findDOMNode(this.refs.blogTitle).value.trim();
    const body = ReactDOM.findDOMNode(this.refs.blogBody).value.trim();
    const ownerId = this.props.currentUser._id;
    const category = ReactDOM.findDOMNode(this.refs.blogCategory).value.trim();

    Meteor.call("blogs.insert", title, body, ownerId, category);

    this.props.history.push("/bloglist");
  }

  titleTextHandler(e) {
    e.preventDefault();
    this.setState({ title: ReactDOM.findDOMNode(this.refs.blogTitle).value.trim()});
  }

  bodyTextHandler(e) {
    e.preventDefault();
    this.setState({ body: ReactDOM.findDOMNode(this.refs.blogBody).value.trim()});
  }

  render() {
    if (Meteor.user) {
      return (
        <div className="container">
          <div className="blogEditorHeader">
            <h1>Blog Editor</h1>
          </div>
          <div className="editorPreviewGroup">
            <div className="blogEditor">
              <div className="editorGroupHeader">
                <h3>Edit Blog</h3>
              </div>
              <form className="blogEditorGroup" onSubmit={this.handleAddBlog.bind(this)} >
                <input className="blogEditorTitle" type="text" ref="blogTitle" onChange={this.titleTextHandler.bind(this)} defaultValue={this.state.title} />
                <textarea className="blogEditorBody" ref="blogBody" onChange={this.bodyTextHandler.bind(this)} defaultValue={this.state.body}/>
                <h4>Choose a category</h4>
                <select className="blogEditorCategory" ref="blogCategory" >
                  <option value="general">general</option>
                  <option value="rpg">rpg</option>
                  <option value="podcast">podcast</option>
                </select>
                <input type="submit" value="submit" />
              </form>          
            </div>
            <div className="blogEditPreview">
              <div className="editorGroupHeader">
                <h3>Preview Blog</h3>
              </div>
              <div className="blogEditTitlePreview">
                <span>{this.state.title}</span>
              </div>
              <div className="newBlogPreview" dangerouslySetInnerHTML={{__html: marked(this.state.body)}}></div>
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

export default withTracker(() => {
  Meteor.subscribe('blogs');
  Meteor.subscribe('userData');

  return {
    currentUser: Meteor.user(),
  };
})(AddBlog);

AddBlog.propTypes = {
  currentUser: PropTypes.object,
  history: PropTypes.object,
};