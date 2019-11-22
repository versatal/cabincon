import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledGameDay = styled.div`
  grid-row: ${props => props.begin} / ${props => props.end};
  background-color: rgba(255, 255, 255, 0.8);
`;

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

  joinThisGame(player) {
    Meteor.call('games.addPlayer', this.props.game._id, this.props.currentUser.username)
  }

  leaveThisGame(player) {
    Meteor.call('games.removePlayer', this.props.game._id, this.props.currentUser.username)
  }

  addSlot(event){
    event.preventDefault();
    const day = parseInt(ReactDOM.findDOMNode(this.refs.slotDays).value.trim());    
    Meteor.call('games.insert', "New Game", day)
  }
  genGameString(num, begin, end) {
    let text;
    switch(num) {
      case 1:
        text = "Thursday";
        break;
      case 2:
        text = "Friday";
        break;
      case 3:
        text = "Saturday";
        break;
      case 4:
        text = "Sunday";
        break;
      default:
        text = "Unknown";
    }
    return text;
  }

  render() {
    const { currentUser, game, beginCount, endCount, gameSlot, gameDay } = this.props;
    const gameidString = "/gamedetails:" + game._id;
    const gameString = this.genGameString(gameDay, beginCount, endCount);

    if (currentUser) {
      return (
        <React.Fragment>
          {gameSlot < 2 && <StyledGameDay begin={beginCount} end={endCount}>
          {gameString}
          </StyledGameDay>}
      
          <div className="gameTitle">
            {currentUser.isAdmin && <button className="delete" onClick={this.deleteThisGame.bind(this)}>x</button>}
            <Link to={gameidString} className="gameLink">{game.title}</Link>
          </div>
          
          <div className="shortDescription"><Link to={gameidString} className="gameLink">{game.description}</Link></div>
          
          {game.gameMaster ? 
            game.gameMaster == currentUser.username ? 
              <div className="gameDM">{game.gameMaster}<button className="btnClaim" onClick={this.unclaimThisGame.bind(this)}>Unclaim</button></div> : <div className="gameDM">{game.gameMaster}</div>
            : 
            <div className="gameDM"><button className="btnClaim" onClick={this.claimThisGame.bind(this)}>Claim</button></div>
          }

          <div className="gamePlayers">
            {game.players.length > 0 && <span className="gamePlayers">{game.players.join(' ')}</span>}
            {game.players.includes(currentUser.username) ? 
              <button className="leave" onClick={this.leaveThisGame.bind(this)}>Leave</button>
            : 
              <button className="join" onClick={this.joinThisGame.bind(this)}>Join</button>
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