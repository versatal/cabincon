import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Posts } from '../api/posts.js';
import SubTopicLink from './SubTopicLink.js'
import Topic from './Topic.js';


class Forum extends Component {

  renderTopics() {
    const topics = this.props.posts.filter(post => post.type == "topic" ); 
    const subTopics = this.props.posts.filter(post => post.type == "subtopic" );
    if (topics.length < 1) {
      return <div>No Topics added yet</div>
    } else {
      return topics.map(function(post) {
        return <div className="topicGroup" key={post._id}>
                 <Topic post={post}/>
                 {subTopics.filter(sub => sub.subTopicOf == post._id).length > 0 ? 
                   subTopics.filter(sub => sub.subTopicOf == post._id).map(function(sub) {
                    return <SubTopicLink key={sub._id} post={sub}>{sub.title}</SubTopicLink>
                   })
                   :
                   <div>No Subtopics added</div>
                 }               
               </div>
      });  
    } 
  }

  handleSubmitPost(event){
    event.preventDefault();
    const text = ReactDOM.findDOMNode(this.refs.postBody).value.trim();
    const type = "post";
    const title = text.substring(0, 19);
    const subTopicOf = ""

    Meteor.call("posts.insert", text, type, title, subTopicOf)

    ReactDOM.findDOMNode(this.refs.postBody).value = '';

  }
  
  handleSubmitTopic(event){
    event.preventDefault();
    const text = ReactDOM.findDOMNode(this.refs.topicBody).value.trim();
    const type = "topic";
    const title = ReactDOM.findDOMNode(this.refs.topicTitle).value.trim();
    const subTopicOf = ""

    Meteor.call("posts.insert", text, type, title, subTopicOf)

    ReactDOM.findDOMNode(this.refs.topicBody).value = '';
    ReactDOM.findDOMNode(this.refs.topicTitle).value = '';

  }

  handleSubmitSubTopic(event){
    event.preventDefault();
    const text = ReactDOM.findDOMNode(this.refs.subTopicBody).value.trim();
    const type = "subtopic";
    const title = ReactDOM.findDOMNode(this.refs.subTopicTitle).value.trim();
    const subTopicOf = ReactDOM.findDOMNode(this.refs.subTopicOf).value.trim();

    Meteor.call("posts.insert", text, type, title, subTopicOf)

    ReactDOM.findDOMNode(this.refs.subTopicBody).value = '';
    ReactDOM.findDOMNode(this.refs.subTopicTitle).value = '';
  }

  render() {
    const { currentUser } = this.props;
    return (
      <div className="container">
        <div className="forumHeader">
          <h1>Cabin Con Forum</h1>
        </div>
        <div className="forumTopicList">
          {this.renderTopics()}
        </div>
          {currentUser &&
            currentUser.isAdmin && 
            <div className="forumAdmin">
              <form className="topicAdd" onSubmit={this.handleSubmitTopic.bind(this)} >
                <h4>New Topic</h4>
                <input className="postTitle" type="text" ref="topicTitle" />
                <textarea className="postBody" ref="topicBody" />
                <input type="submit" value="submit"></input>
              </form>
              <form className="subTopicAdd" onSubmit={this.handleSubmitSubTopic.bind(this)} >
                <h4>New Sub Topic</h4>
                <select ref="subTopicOf">
                  {this.props.posts.filter(post => post.type == "topic" ).map(function(post) {
                    return <option key={post._id} value={post._id}>{post.title}</option>
                  })}
                </select>
                <input className="postTitle" type="text" ref="subTopicTitle" />
                <textarea className="postBody" ref="subTopicBody" />
                <input type="submit" value="submit"></input>
              </form>
            </div>
          }
      </div>
    )
  }
}

export default withTracker(() => {
  Meteor.subscribe('posts');
  Meteor.subscribe('userData');

  return {
    posts: Posts.find({}).fetch(),
    currentUser: Meteor.user(),
  };

})(Forum)