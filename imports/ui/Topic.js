import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

class Topic extends Component {

  deleteThisPost() {
    Meteor.call('posts.remove', this.props.post._id)
  }

  render() {
    const { currentUser, post } = this.props;

    if (post) {
      return (
        <div>
          <h1 className="forumTopicList">{post.title}</h1> 
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
})(Topic);