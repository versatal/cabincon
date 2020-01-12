import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';

class SubTopicLink extends Component {

  deleteThisPost() {
    Meteor.call('posts.remove', this.props.post._id)
  }

  render() {
    const { currentUser, post } = this.props;
    const subTopicIdString = "/subTopic:" + post._id;

    if (post) {
      return (
        <div className="subTopicLink">
          <Link to={subTopicIdString} >{post.title}</Link> 
          {currentUser && currentUser.isAdmin && <button className="delete" onClick={this.deleteThisPost.bind(this)}>&times;</button>}
        </div>
      );
    } else {
      <div>Loading...</div>
    }

  }
}

export default withTracker(() => {
  Meteor.subscribe('userData');

  return {
    currentUser: Meteor.user(),
  };
})(SubTopicLink);