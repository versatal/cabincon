import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Games } from '../api/games.js';
import Game from './Game.js';
import styled from 'styled-components';

const GridLayout = styled.div`
display:grid;
grid-template-columns: 20% 20% 20% 20% 20%;
background-color: #2196F3;
padding: 10px;
`;

const StyledDateHeader = styled.div`
  grid-column: 1 / span 5;
  background-color: #2196F3;
  height: 40px;
  text-align: center;
  padding: 0px;
  margin: 20px 0px;
`;

class Schedule extends Component {

  handleSubmit(event) {
    event.preventDefault();
 
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
    const day = parseInt(ReactDOM.findDOMNode(this.refs.gameDay).value.trim());
 
    Meteor.call('games.insert', text, day)
 
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  } 

  renderGames(day, begin, end) {
    let num = 0;
    return this.props.games.filter(game => game.day == day ).map(function(game) {
      num++;
      return <Game key={game._id} game={game} beginCount={begin} endCount={end} gameSlot={num} gameDay={day}/>;
    });
  }
  
  addSlot(event) {
    event.preventDefault();
    const day = parseInt(ReactDOM.findDOMNode(this.refs.slotDay).value.trim());    
    Meteor.call('games.insert', "New Game", day)
  }

  render() {
    const { currentUser, thursdayCount, fridayCount, saturdayCount, sundayCount } = this.props;

    if (currentUser) {
      return (
        <div className="container">
          
          {
            currentUser ?
              currentUser.isAdmin &&
              <header>
                <span>Add slots</span>
                <form className="slotAdd" onSubmit={this.addSlot.bind(this)}>
                  <select name="weekDays" ref="slotDay">
                    <option value="1">Thursday</option>
                    <option value="2">Friday</option>
                    <option value="3">Saturday</option>
                    <option value="4">Sunday</option>
                  </select>
                  <input type="submit" value="submit"></input>
                </form>
              </header>
            : <span>Loading...</span>
          }
  
          <GridLayout>
            <div className="colHeaders">Game Title</div>
            <div className="colHeaders">Game Description</div>
            <div className="colHeaders">Game System</div>
            <div className="colHeaders">Game Master</div>
            <div className="colHeaders">Players</div>
            <StyledDateHeader><p className="gameDayHeader">Thursday</p></StyledDateHeader>
            {this.renderGames(1, 3, thursdayCount + 3)}
            <StyledDateHeader><p className="gameDayHeader">Friday</p></StyledDateHeader>
            {this.renderGames(2, thursdayCount + 4, thursdayCount + 4 + fridayCount)}
            <StyledDateHeader><p className="gameDayHeader">Saturday</p></StyledDateHeader>
            {this.renderGames(3, thursdayCount + 5 + fridayCount, thursdayCount + 5 + fridayCount + saturdayCount)}
            <StyledDateHeader><p className="gameDayHeader">Sunday</p></StyledDateHeader>
            {this.renderGames(4, thursdayCount + 6 + fridayCount + saturdayCount, thursdayCount + 6 + fridayCount + fridayCount + saturdayCount + sundayCount)}
          </GridLayout>
        </div>
      );
  
    } else {
      return (
        <div className="container">
          <div className="signInMessage">
            <h1>Please sign in to view the schedule</h1>
          </div>
        </div>
      )
    }

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
})(Schedule);