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
          <ul className="mainMenu">
{/*         <li className="mainMenuItem"><Link className="menu-item" to="/news">News</Link></li>
            <li className="mainMenuItem"><Link className="menu-item" to="/setting">Setting</Link></li>
            <li className="mainMenuItem"><Link className="menu-item" to="/system">System</Link></li>
            <li className="mainMenuItem"><Link className="menu-item" to="/podcast">Podcast</Link></li>
    */}     <li className="mainMenuItem"><Link className="menu-item" to="#">Cabin Con</Link>
              <ul className="subMenu">
                <li className="subMenuItem"><Link className="menu-item" to="/">Countdown</Link></li>      
                <li className="subMenuItem"><Link className="menu-item" to="/schedule">Schedule</Link></li>      
              </ul>
            </li>      
            <li className="mainMenuItem"><Link className="menu-item" to="/bloglist">Blog</Link></li>      
            <li className="mainMenuItem"><Link className="menu-item" to="/forum">Forum</Link></li>      
            {currentUser && currentUser.isAdmin && <li className="mainMenuItem"><Link className="menu-item" to="/admin">Admin</Link></li>}      
          </ul>
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