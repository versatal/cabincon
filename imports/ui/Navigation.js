import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import AccountsUIWrapper from './accountsUIWrapper.js';

class Navigation extends Component {
  render() {
    const { currentUser } = this.props;
    
    return (
      <div className='navBar'>
        <div><h1>BiggusGeekus</h1></div>
        <div className="menu">
          <AccountsUIWrapper />
          <Link className="menu-item" to="/">Countdown</Link>      
          <Link className="menu-item" to="/schedule">Schedule</Link>      
          <Link className="menu-item" to="/bloglist">Blog</Link>      
          <Link className="menu-item" to="/forum">Forum</Link>      
          {currentUser && currentUser.isAdmin && <Link className="menu-item" to="/admin">Admin</Link>}      
        </div>
      </div>
    )
  }
}

export default withTracker(() => {
  Meteor.subscribe('userData');

  return {
    currentUser: Meteor.user(),
  };
})(Navigation);