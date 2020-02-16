import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import EditEmail from './EditEmail.js';
import EditFirstName from './EditFirstName.js';
import EditUserName from "./EditUserName";
import EditForumSignature from "./EditForumSignature.js"
import Modal from "./Modal.js"
import { Link } from 'react-router-dom';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      show: false
    })
  }

  changeAvatar(e) {
    e.preventDefault();

    Meteor.call("userData.editAvatar", this.props.currentUser._id, "/warrior.jpg")    
  }

  showModal = e => {
    this.setState(prevState => ({
      show: !prevState.show
    }))
  }

  render() {
    const { currentUser } = this.props;
    if (currentUser) {
      return (
        <div className="container">
          <Modal onClose={this.showModal} show={this.state.show}>Change Your Password</Modal>
          <div className="profileHeader">
            <h1>Profile for {currentUser.username}</h1>
          </div>
          <div className="profileContent">
            <div className="userInfo">
              <h1>Your Info</h1>
              <EditUserName />  
              <EditEmail />  
              <div className="userItem">
                <button className="profileActionButton" onClick={this.showModal.bind(this)}>Change Password</button>
              </div>  
              <div className="userItem"><button className="profileActionButton">Delete Account</button></div>  
              <EditFirstName />
              <div className="userItem userAvatar">
                <div className="avatarHeader"><span>Your avatar: </span><Link to="/avatarchooser">change</Link></div>
                <div className="avatarBody">
                  <img className="avatar" src={currentUser.avatar} />
                </div>
              </div>
              <EditForumSignature /> 
            </div>
            <div className="userContent">
              <div className="userPosts">
                <h1>Your Posts</h1>
                <div className="userItem"><span>Forum posts you have made: </span></div>  
                <div className="userItem"><span>Blog replies you have made: </span></div>  
              </div>            
              <div className="userGames">
                <h1>Your Games</h1>
                <div className="userItem"><span>Games you are running: </span></div>  
                <div className="userItem"><span>Games you are playing in: </span></div>  
              </div>            
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