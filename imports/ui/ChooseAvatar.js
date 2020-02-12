import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

class ChooseAvatar extends Component {

  changeAvatar(e) {
    e.preventDefault();

    Meteor.call("userData.editAvatar", this.props.currentUser._id, "/warrior.jpg")    
  }

  changeThisAvatar(e, url) {
    e.preventDefault();

    Meteor.call("userData.editAvatar", this.props.currentUser._id, url)    
  }

  render() {
    const { currentUser } = this.props; 
    return (  
      <div className="container">
        {currentUser ?
          <div className="avatarChooser">
          <div><span>Your current avatar: </span></div>
          <div>
            <img className="avatar" src={currentUser.avatar} />
          </div>
          <div className="avatarList">
            <div>
              <img className="avatar" src="/bard.jpg" onClick={(e) => this.changeThisAvatar(e, "/bard.jpg")}/>
            </div>
            <div>
              <img className="avatar" src="/cleric.jpg" onClick={(e) => this.changeThisAvatar(e, "/cleric.jpg")}/>
            </div>
            <div>
              <img className="avatar" src="/monk.jpg" onClick={(e) => this.changeThisAvatar(e, "/monk.jpg")}/>
            </div>
            <div>
              <img className="avatar" src="/ranger.jpg" onClick={(e) => this.changeThisAvatar(e, "/ranger.jpg")}/>
            </div>
            <div>
              <img className="avatar" src="/rogue.jpg" onClick={(e) => this.changeThisAvatar(e, "/rogue.jpg")}/>
            </div>
            <div>
              <img className="avatar" src="/warrior.jpg" onClick={(e) => this.changeThisAvatar(e, "/warrior.jpg")}/>
            </div>
            <div>
              <img className="avatar" src="/wizard.jpg" onClick={(e) => this.changeThisAvatar(e, "/wizard.jpg")}/>
            </div>
          </div>        
        </div>
        :
          <div>Loading...</div>
        }
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('userData');

  return {
    currentUser: Meteor.user(),
  };
})(ChooseAvatar);

ChooseAvatar.propTypes = {
  currentUser: PropTypes.object,
};