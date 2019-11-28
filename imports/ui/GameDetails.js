import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Games } from '../api/games.js';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

class GameDetails extends Component {
  handleSubmit(e) {
    e.preventDefault();
    const title = ReactDOM.findDOMNode(this.refs.title).value.trim();
    const description = ReactDOM.findDOMNode(this.refs.description).value.trim();

    Meteor.call("games.setAll", this.props.game._id, title, description);
  }
  render() {
    const { game, currentUser } = this.props;
    if (game) {
      return (
        <div className="container">
          <div className="gameDetails">
            <h1>Game Details</h1>
            <h3>Game Title: {game.title}</h3>
            <h3>Game Master: {game.gameMaster}</h3>
            <h3>Day Scheduled: {game.day}</h3>
            <h3>Players: {game.players.join(", ")}</h3>
            <h3>Short Description: {game.description}</h3>
          </div>
          {currentUser ? game.gameMaster == currentUser.username ? 
            <form className="slotAdd" onSubmit={this.handleSubmit.bind(this)}>
              <input type="text" ref="title" defaultValue={game.title}></input>
              <input type="text" ref="description" defaultValue={game.description}></input>
              <input type="submit" value="submit"></input>
            </form> : <div>Cannot edit info</div>
            :
            <div>Loading...</div>
          }
        </div>
      )  
    } else {
      return (
        <div className="container">Loading...</div>
      )
    };
  }
}

export default withTracker(({ location }) => {
  const _id = location.pathname.split(":")[1];
  Meteor.subscribe('games');
  Meteor.subscribe('userData');

  return {
    game: Games.findOne({ _id }),
    currentUser: Meteor.user(),
  };
})(GameDetails);