import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import Navigation from './Navigation.js';
import { withTracker } from 'meteor/react-meteor-data';

import { Games } from '../api/games.js';
 
import Game from './Game.js';
import AccountsUIWrapper from './accountsUIWrapper.js';
 
// App component - represents the whole app
class App extends Component {
  handleSubmit(event) {
    event.preventDefault();
 
    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
    const day = parseInt(ReactDOM.findDOMNode(this.refs.gameDay).value.trim());
 
    Meteor.call('games.insert', text, day)
 
    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }  
  renderGames(day) {
    return this.props.games.filter(game => game.day == day ).map((game) => (
      <Game key={game._id} game={game} />
    ));
  }
 
  render() {
    const { currentUser } = this.props;

    return (
      <div className="container">
        <header>
          <Navigation />

          <AccountsUIWrapper />

          {currentUser ?
            currentUser.isAdmin ? 
            <form className="new-game" onSubmit={this.handleSubmit.bind(this)} >
              <input
                type="text"
                ref="textInput"
                placeholder="Type to add new games"
              />
              <select name="day" ref="gameDay">
                <option value="1">Thursday</option>
                <option value="2">Friday</option>
                <option value="3">Saturday</option>
                <option value="4">Sunday</option>
              </select>
            </form> : <span></span>
            :
            <span>Loading...</span> 
          }

         </header>
 
        <ul>
          <li><h2>Thursday Open Games ({this.props.thursdayCount})</h2></li>
          {this.renderGames(1)}
          <li><h2>Friday Open Games ({this.props.fridayCount})</h2></li>
          {this.renderGames(2)}
          <li><h2>Saturday Open Games ({this.props.saturdayCount})</h2></li>
          {this.renderGames(3)}
          <li><h2>Sunday Open Games ({this.props.sundayCount})</h2></li>
          {this.renderGames(4)}
        </ul>
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('games');
  Meteor.subscribe('userData');

  return {
    games: Games.find({}).fetch(),
    thursdayCount: Games.find( { day: 1 } ).count(),
    fridayCount: Games.find( { day: 2 } ).count(),
    saturdayCount: Games.find( { day: 3 } ).count(),
    sundayCount: Games.find( { day: 4 } ).count(),
    currentUser: Meteor.user(),
  };
})(App);