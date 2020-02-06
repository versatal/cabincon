import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

class Profile extends Component {
  handleSubmitFirstName(event){
    event.preventDefault();

    Meteor.call("userData.editFirstName", this.props.currentUser._id, this.firstName.value)

  }
  render() {
    const { currentUser } = this.props;
    if (currentUser) {
      return (
        <div className="container">
          <div className="profileHeader">
            <h1>Profile Page</h1>
          </div>
          <div className="profileContent">
            <div className="userInfo">
              <h1>Your Info</h1>
              <div className="userItem"><span>Your username: {currentUser.username}</span></div>  
              <div className="userItem"><span>Your email: </span></div>  
              <div className="userItem"><button>Change Password</button></div>  
              <div className="userItem">
                <span>Your First Name: {currentUser.firstName}</span>
                <form onSubmit={this.handleSubmitFirstName.bind(this)}>
                  <input type="text" ref={input => (this.firstName = input)} />
                  <button type="submit">update</button>
                </form>
              </div>
              <div className="userItem"><span>Your Last Name: </span></div>  
              <div className="userItem userAvatar">
                <span>Your avatar: </span>
                <div>
                  <img className="avatar" src="/bard.jpg" />
                  <img className="avatar"  src="/cleric.jpg" />
                  <img className="avatar"  src="/monk.jpg" />
                  <img className="avatar"  src="/ranger.jpg" />
                  <img className="avatar"  src="/rogue.jpg" />
                  <img className="avatar"  src="/warrior.jpg" />
                  <img className="avatar"  src="/wizard.jpg" />
                </div>
              </div>
              <div className="userItem forumSigGroup">
                <span>Your Forum Signature</span>
                <textarea className="forumSignature" />
              </div>  
            </div>
            <div className="userGames">
              <h1>Your Games</h1>
              <div className="userItem"><span>Games you are running: </span></div>  
              <div className="userItem"><span>Games you are playing in: </span></div>  
            </div>            
            <div className="userPosts">
              <h1>Your Posts</h1>
              <div className="userItem"><span>Forum posts you have made: </span></div>  
              <div className="userItem"><span>Blog replies you have made: </span></div>  
            </div>            
          </div>
        </div>
      );
    } else {
      return (
        <div>Loading...</div>
      )
    }

  }
}



export default withTracker(() => {
  Meteor.subscribe('userData');

  return {
    currentUser: Meteor.user(),
  };
})(Profile);

Profile.propTypes = {
  currentUser: PropTypes.object,
};