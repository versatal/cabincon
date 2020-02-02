import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import LoginRegister from './LoginRegister.js';

class Navigation extends Component {
  render() {
    const { currentUser } = this.props;
    
    return (
      <div className='navBar'>
        <div><h1>BiggusGeekus</h1></div>
        <div className="menu">
          <LoginRegister />
{/*          <Link className="menu-item" to="/news">News</Link>
          <Link className="menu-item" to="/setting">Setting</Link>
          <Link className="menu-item" to="/system">System</Link>
          <Link className="menu-item" to="/podcast">Podcast</Link>
    */}        <Link className="menu-item" to="/">Cabin Con</Link>      
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

Navigation.propTypes = {
  currentUser: PropTypes.object,
};