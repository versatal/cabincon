/* eslint-disable react/no-find-dom-node */
/* eslint-disable react/no-string-refs */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Games } from '../api/games.js';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

class GameDetails extends Component {

  constructor(props) {
    super(props);
    this.state={
      disableTitle: true,
      disableDescription: true,
      disableSystem: true,
      disableDetails: true,
      disableSeats: true,
    }
  }

  handleEditTitle() {
    this.setState({disableTitle: !this.state.disableTitle})
  }

  handleEditDescription() {
    this.setState({disableDescription: !this.state.disableDescription})
  }

  handleEditSystem() {
    this.setState({disableSystem: !this.state.disableSystem})
  }

  handleEditDetails() {
    this.setState({disableDetails: !this.state.disableDetails})
  }

  handleEditSeats() {
    this.setState({disableSeats: !this.state.disableSeats})
  }

  handleSubmit(e) {
    e.preventDefault();
    const title = ReactDOM.findDOMNode(this.refs.title).value.trim();
    const description = ReactDOM.findDOMNode(this.refs.description).value.trim();
    const long = ReactDOM.findDOMNode(this.refs.long).value.trim();
    const seats = parseInt(ReactDOM.findDOMNode(this.refs.maxSeats).value.trim());
    const gameSystem = ReactDOM.findDOMNode(this.refs.gameSystem).value.trim();

    console.log(long);
    Meteor.call("games.setAll", this.props.game._id, title, description, long, seats, gameSystem);
    this.setState({
      disableTitle: true,
      disableDescription: true,
      disableSystem: true,
      disableDetails: true,
      disableSeats: true
    })
  }

  genDayLabel(day) {
    let dayLabel = "";
      
    switch (day) {
      case 1:
        dayLabel = "Thursday";
        break;
      case 2:
        dayLabel = "Friday";
        break;
      case 3:
        dayLabel = "Saturday";
        break;
      case 4:
        dayLabel = "Sunday";
        break;
      default:
        dayLabel = "NON";
        break;
    }
    return dayLabel  
  }

  render() {
    const { game, currentUser } = this.props;
    if (game) {
      return (
        <div className="container">
          <div className="mainHeader" >
            <h1>{game.title}</h1>
          </div>
          <div className="gameDetailsContent">
            <form className="gameDetailsContentForm" onSubmit={this.handleSubmit.bind(this)}>
                <div className="gameBlock">
                  <div className="gameBlockLeft"><label className="gameLabel">Game Title: </label></div>
                  <div className="gameBlockRight">
                    <input className="gameInput" type="text" disabled={this.state.disableTitle} ref="title" defaultValue={game.title}></input>
                    {currentUser && game.gameMaster == currentUser.username && 
                      <input className="gameButton" type="button" value="edit" onClick={this.handleEditTitle.bind(this)}/>
                    }
                  </div>
                </div>
                <div className="gameBlock">
                  <div className="gameBlockLeft"><label className="gameLabel">Description: </label></div>
                  <div className="gameBlockRight">
                    <input className="gameInput" type="text" disabled={this.state.disableDescription} ref="description" defaultValue={game.description}></input>
                    {currentUser && game.gameMaster == currentUser.username && 
                      <input className="gameButton" type="button" value="edit" onClick={this.handleEditDescription.bind(this)}/>
                    }
                  </div>
                </div>
                <div className="gameBlock">
                  <div className="gameBlockLeft"><span className="gameLabel">Game System:</span></div>
                  <div className="gameBlockRight">
                    <select className="gameSystemInput" ref="gameSystem" disabled={this.state.disableSystem}>
                      {game.gameSystem == "DnD 1e" ? <option value="DnD 1e" selected>DnD 1e</option> : <option value="DnD 1e">DnD 1e</option>}                  
                      {game.gameSystem == "DnD 2e" ? <option value="DnD 2e" selected>DnD 2e</option> : <option value="DnD 2e">DnD 2e</option>}                  
                      {game.gameSystem == "DnD 3e" ? <option value="DnD 3e" selected>DnD 3e</option> : <option value="DnD 3e">DnD 3e</option>}                  
                      {game.gameSystem == "DnD 3.5e" ? <option value="DnD 3.5e" selected>DnD 3.5e</option> : <option value="DnD 3.5e">DnD 3.5e</option>}                  
                      {game.gameSystem == "DnD 4e" ? <option value="DnD 4e" selected>DnD 4e</option> : <option value="DnD 4e">DnD 4e</option>}                  
                      {game.gameSystem == "DnD 5e" ? <option value="DnD 5e" selected>DnD 5e</option> : <option value="DnD 5e">DnD 5e</option>}                  
                      {game.gameSystem == "Pathfinder" ? <option value="Pathfinder" selected>Pathfinder</option> : <option value="Pathfinder">Pathfinder</option>}                  
                      {game.gameSystem == "Savage Worlds" ? <option value="Savage Worlds" selected>Savage Worlds</option> : <option value="Savage Worlds">Savage Worlds</option>}                  
                      {game.gameSystem == "13th Age" ? <option value="13th Age" selected>13th Age</option> : <option value="13th Age">13th Age</option>}                  
                      {game.gameSystem == "Homebrew" ? <option value="Homebrew" selected>Homebrew</option> : <option value="Homebrew">Homebrew</option>}                  
                      {game.gameSystem == "Other" ? <option value="Other" selected>Other</option> : <option value="Other">Other</option>}                  
                    </select>
                    {currentUser && game.gameMaster == currentUser.username && 
                      <input className="gameButton" type="button" value="edit" onClick={this.handleEditSystem.bind(this)}/>
                    }
                  </div>
                </div>
                <div className="gameBlock">
                  <div className="gameBlockLeft"><span className="gameLabel">Game Master:</span></div>
                  <div className="gameBlockRight"><span className="gameData"> {game.gameMaster}</span></div>
                </div>
                <div className="gameBlock">
                  <div className="gameBlockLeft"><span className="gameLabel">Day Scheduled:</span></div>
                  <div className="gameBlockRight"><span className="gameData"> {this.genDayLabel(game.day)}</span></div>
                </div>
                <div className="gameBlock">
                  <div className="gameBlockLeft"><span className="gameLabel">Max Seats:</span></div>
                  <div className="gameBlockRight">
                    <select className="gameSystemInput" ref="maxSeats" disabled={this.state.disableSeats}>
                      {game.maxSeats == 1 ? <option value="1" selected>1</option> : <option value="1">1</option>}
                      {game.maxSeats == 2 ? <option value="2" selected>2</option> : <option value="2">2</option>}
                      {game.maxSeats == 3 ? <option value="3" selected>3</option> : <option value="3">3</option>}
                      {game.maxSeats == 4 ? <option value="4" selected>4</option> : <option value="4">4</option>}
                      {game.maxSeats == 5 ? <option value="5" selected>5</option> : <option value="5">5</option>}
                      {game.maxSeats == 6 ? <option value="6" selected>6</option> : <option value="6">6</option>}
                      {game.maxSeats == 7 ? <option value="7" selected>7</option> : <option value="7">7</option>}
                      {game.maxSeats == 8 ? <option value="8" selected>8</option> : <option value="8">8</option>}
                      {game.maxSeats == 9 ? <option value="9" selected>9</option> : <option value="9">9</option>}
                      {game.maxSeats == 10 ? <option value="10" selected>10</option> : <option value="10">10</option>}
                    </select>
                    {currentUser && game.gameMaster == currentUser.username && 
                      <input className="gameButton" type="button" value="edit" onClick={this.handleEditSeats.bind(this)}/>
                    }
                  </div>
                </div>
                <div className="gameBlock">
                  <div className="gameBlockLeft"><span className="gameLabel">Players:</span></div>
                  <div className="gameBlockRight"><span className="gameData"> {game.players.join(", ")}</span></div>
                </div>
                <div>
                  <div className="gameBlock">
                    <div className="gameBlockLeft"><span className="gameLabel">Details:</span></div>
                    {currentUser && game.gameMaster == currentUser.username && 
                      <div className="gameBlockRight">
                        <input className="gameButton" type="button" value="edit" onClick={this.handleEditDetails.bind(this)}/>
                      </div>
                    }
                  </div>
                  <div className="longDescription"><textarea ref="long" defaultValue={game.longDescription} disabled={this.state.disableDetails}/></div>
                </div>              
                {currentUser && game.gameMaster == currentUser.username && <input className="gameSubmit" type="submit" value="submit"></input>}
              </form>
            <div className="gameResources">
              <div className="gameResourcesOverlay">
                <span>Content Under Construction</span>
              </div>
              <h3>Game Resources</h3>
              <div className="gamePosts"><h4>Forum Posts</h4></div>
              <div className="gameDocumentation"><h4>Documentation</h4></div>
            </div>
          </div>
        </div>
      )  
    } else {
      return (
        <div className="container">Loading...</div>
      )
    }
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

GameDetails.propTypes = {
  game: PropTypes.object,
  currentUser: PropTypes.object,
};