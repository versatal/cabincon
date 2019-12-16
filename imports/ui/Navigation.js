import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import AccountsUIWrapper from './accountsUIWrapper.js';

export default class Navigation extends Component {
  render() {
    return (
      <div className='navBar'>
        <div><h1>Cabin Con</h1></div>
        <div className="menu">
          <AccountsUIWrapper />
          <Link className="menu-item" to="/">Countdown</Link>      
          <Link className="menu-item" to="/schedule">Schedule</Link>      
{/*       <Link className="menu-item" to="/blog">blog</Link>      
          <Link className="menu-item" to="/forum">forum</Link>   */}   
          <Link className="menu-item" to="/admin">Secret Admin Stuff</Link>      
        </div>
      </div>
    )
  }
}