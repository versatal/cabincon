/* eslint-disable react/no-find-dom-node */
/* eslint-disable react/no-string-refs */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Game extends Component {

  deleteThisGame() {
    Meteor.call('games.remove', this.props.game._id)
  }

  claimThisGame() {
    Meteor.call('games.setClaimed', this.props.game._id)
  }

  unclaimThisGame() {
    Meteor.call('games.unsetClaimed', this.props.game._id)
  }

  joinThisGame() {
    Meteor.call('games.addPlayer', this.props.game._id, this.props.currentUser.username)
  }

  leaveThisGame() {
    Meteor.call('games.removePlayer', this.props.game._id, this.props.currentUser.username)
  }

  addSlot(event){
    event.preventDefault();
    const day = parseInt(ReactDOM.findDOMNode(this.refs.slotDays).value.trim());    
    Meteor.call('games.insert', "New Game", day)
  }

  render() {
    const { currentUser, gameSlot, game } = this.props;
    const gameidString = "/gamedetails:" + game._id;
    let gameItemClass = "gameItem";
    if (gameSlot % 2 == 0) {
      gameItemClass = "gameItemEven";
    }  

    if (currentUser) {
      return (
        <React.Fragment>

          <div className={gameSlot == 1 ? "gameItemOne" : gameItemClass}>
            {currentUser.isAdmin && <button className="delete" onClick={this.deleteThisGame.bind(this)}>&times;</button>}
            <Link to={gameidString} className="gameLink">{game.title}</Link>
          </div>
          
          <div className={gameSlot == 1 ? "gameItemOne" : gameItemClass}>
            <Link to={gameidString} className="gameLink">{game.description}</Link>
          </div>
          
          <div className={gameSlot == 1 ? "gameItemOne" : gameItemClass}>
            {game.gameSystem ? 
              <span><Link to={gameidString} className="gameLink">{game.gameSystem}</Link></span> 
              : 
              <span><Link to={gameidString} className="gameLink">GM Needed</Link></span>}
          </div>

          {game.gameMaster ? 
            game.gameMaster == currentUser.username ? 
            <div className={gameSlot == 1 ? "gameItemOne" : gameItemClass}>
                <span className="gameMaster">{game.gameMaster}</span>
                <button className="btnClaim" onClick={this.unclaimThisGame.bind(this)}>Unclaim</button>
              </div> 
              : 
              <div className={gameSlot == 1 ? "gameItemOne" : gameItemClass}><span className="gameMaster">{game.gameMaster}</span></div>
            : 
            <div className={gameSlot == 1 ? "gameItemOne" : gameItemClass}><button className="btnClaim" onClick={this.claimThisGame.bind(this)}>Claim</button></div>
          }

          <div className={gameSlot == 1 ? "gameItemOne" : gameItemClass}>
            {game.players.length > 0 && <span className="gamePlayers">{game.players.join(', ')}</span>}
            {
              game.gameMaster.length > 0 ? 
                game.players.includes(currentUser.username) ? 
                  <button className="leave" onClick={this.leaveThisGame.bind(this)}>Leave</button>
                  : 
                  <button className="join" onClick={this.joinThisGame.bind(this)}>Join</button>
              : <span>GM Needed</span>
            }        
          </div>
       </React.Fragment>
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
})(Game);

Game.propTypes = {
  game: PropTypes.object,
  currentUser: PropTypes.object,
  gameSlot: PropTypes.number
};