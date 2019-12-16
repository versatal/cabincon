import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';

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
    const { currentUser, game } = this.props;
    const gameidString = "/gamedetails:" + game._id;

    if (currentUser) {
      return (
        <React.Fragment>

          <div className="gameItem">
            {currentUser.isAdmin && <button className="delete" onClick={this.deleteThisGame.bind(this)}>&times;</button>}
            <Link to={gameidString} className="gameLink">{game.title}</Link>
          </div>
          
          <div className="gameItem"><Link to={gameidString} className="gameLink">{game.description}</Link></div>
          
          <div className="gameItem">{game.gameSystem ? <span>{game.gameSystem}</span> : <span><Link to={gameidString} className="gameLink">click to edit</Link></span>}</div>

          {game.gameMaster ? 
            game.gameMaster == currentUser.username ? 
              <div className="gameItem">
                <span className="gameMaster">{game.gameMaster}</span>
                <button className="btnClaim" onClick={this.unclaimThisGame.bind(this)}>Unclaim</button>
              </div> 
              : 
              <div className="gameItem"><span className="gameMaster">{game.gameMaster}</span></div>
            : 
            <div className="gameItem"><button className="btnClaim" onClick={this.claimThisGame.bind(this)}>Claim</button></div>
          }

          <div className="gameItem">
            {game.players.length > 0 && <span className="gamePlayers">{game.players.join(', ')}</span>}
            {game.players.includes(currentUser.username) ? 
              <button className="leave" onClick={this.leaveThisGame.bind(this)}>Leave</button>
            : 
              <button className="join" onClick={this.joinThisGame.bind(this)}>Join</button>}        
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