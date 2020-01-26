import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Blogs } from '../api/posts.js';
import marked from 'marked';

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

    Meteor.call("blogs.insert", title, body, ownerId);

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
    const { currentUser } = this.props;
    console.log("state is " + this.state.title)
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
    };
  }
}

export default withTracker(() => {
  Meteor.subscribe('blogs');
  Meteor.subscribe('userData');

  return {
    currentUser: Meteor.user(),
  };
})(AddBlog);