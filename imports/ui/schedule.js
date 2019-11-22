import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Games } from '../api/games.js';
import Game from './Game.js';
import styled from 'styled-components';

const GridLayout = styled.div`
display:grid;
grid-column-gap: 50px;
grid-template-columns: auto auto auto auto auto;
background-color: #2196F3;
padding: 10px;
`;

class Schedule extends Component {

  handleSubmit(event) {
    event.preventDefault();
 
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
    const day = parseInt(ReactDOM.findDOMNode(this.refs.gameDay).value.trim());
 
    Meteor.call('games.insert', text, day)
 
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  } 

  renderHeadings() {
    return <React.Fragment>
      <div>Game Day</div>
      <div>Game Title</div>
      <div>Game Description</div>
      <div>Game Master</div>
      <div>Players</div>
    </React.Fragment>
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

  submitSlot(num) {
    let numLine = "Add " + num + " Slot"; 
    return (
      <form className="slotAdd" onSubmit={this.addSlot.bind(this)}>
                <input type="hidden" ref="slotDay" value={num}></input>
                <input type="submit" value={numLine}></input>
      </form>
    )
  }

  render() {
    const { currentUser, thursdayCount, fridayCount, saturdayCount, sundayCount } = this.props;

    return (
      <div className="container">
        {
          currentUser ?
            currentUser.isAdmin &&
            <header>
              <span>Add slots</span>
              <form className="slotAdd" onSubmit={this.addSlot.bind(this)}>
                <select name="weekDays" ref="slotDay">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
                <input type="submit" value="submit"></input>
              </form>
            </header>
          : <span>Loading...</span>
        }

        <GridLayout>
          {this.renderHeadings()}
          <React.Fragment>
            {this.renderGames(1, 2, thursdayCount + 2)}
            {this.renderGames(2, thursdayCount + 2, thursdayCount + 2 + fridayCount)}
            {this.renderGames(3, thursdayCount + 2 + fridayCount, thursdayCount + 2 + fridayCount + saturdayCount)}
            {this.renderGames(4, thursdayCount + 2 + fridayCount + saturdayCount, thursdayCount + 2 + fridayCount + fridayCount + saturdayCount + sundayCount)}
          </React.Fragment>
        </GridLayout>
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
})(Schedule);