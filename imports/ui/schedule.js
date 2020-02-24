/* eslint-disable react/no-find-dom-node */
/* eslint-disable react/no-string-refs */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Games } from '../api/games.js';
import Game from './Game.js';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const GridLayout = styled.div`
display:grid;
grid-template-columns: 5% 19% 19% 19% 19% 19%;
padding: 0px 10px 10px 10px;
background-color: #5c5039;
`;

const StyledDateHeader = styled.div`
  grid-column: 1 / span 6;
  background-color: chocolate;
  height: 40px;
  text-align: center;
  padding: 0px;
  margin: 10px 0px 0px 0px;
  display: flex;
  padding-left: 3%;
`;

const StyledDayOneHeader = styled.div`
  grid-row: 2 / span 4;
  background-color: #753916;
  color: beige;
  text-align: center;
  padding: 0px;
  margin-top: 10px;
  writing-mode: vertical-lr;
  text-orientation: upright;
  display: flex;
`;

const StyledDayTwoHeader = styled.div`
  grid-row: 6 / span 4;
  background-color: #753916;
  color: beige;
  text-align: center;
  padding: 0px;
  margin-top: 10px;
  writing-mode: vertical-lr;
  text-orientation: upright;
  display: flex;
`;

const StyledDayThreeHeader = styled.div`
  grid-row: 10 / span 4;
  background-color: #753916;
  color: beige;
  text-align: center;
  padding: 0px;
  margin-top: 10px;
  writing-mode: vertical-lr;
  text-orientation: upright;
  display: flex;
`;

const StyledDayFourHeader = styled.div`
  grid-row: 14 / span 3;
  background-color: #753916;
  color: beige;
  text-align: center;
  padding: 0px;
  margin-top: 10px;
  writing-mode: vertical-lr;
  text-orientation: upright;
  display: flex;
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
          <header className="scheduleHeader">
            <div className="overlay">
              <div className="overlayContent">
                <span className="lineOne">CabinCon 2020</span>
                <span className="lineTwo">May 14 - May 17</span>
                <span className="lineThree">Truely The Best 4 Days In Gaming</span>
              </div>
            </div>
          </header>
          <GridLayout>
            <StyledDateHeader>
              <div className="colHeaders">Game Title</div>
              <div className="colHeaders">Game Description</div>
              <div className="colHeaders">Game System</div>
              <div className="colHeaders">Game Master</div>
              <div className="colHeaders">Players</div>            
            </StyledDateHeader>
            <StyledDayOneHeader><span className="verticalText">THURSDAY</span></StyledDayOneHeader>
            {this.renderGames(1, 3, thursdayCount + 3)}
            <StyledDayTwoHeader><span className="verticalText">FRIDAY</span></StyledDayTwoHeader>
            {this.renderGames(2, thursdayCount + 4, thursdayCount + 4 + fridayCount)}
            <StyledDayThreeHeader><span className="verticalText">SATURDAY</span></StyledDayThreeHeader>
            {this.renderGames(3, thursdayCount + 5 + fridayCount, thursdayCount + 5 + fridayCount + saturdayCount)}
            <StyledDayFourHeader><span className="verticalText">SUNDAY</span></StyledDayFourHeader>
            {this.renderGames(4, thursdayCount + 6 + fridayCount + saturdayCount, thursdayCount + 6 + fridayCount + saturdayCount + sundayCount)}
          </GridLayout>
          {
            currentUser ?
              currentUser.isAdmin &&
              <footer>
                <form className="slotAdd" onSubmit={this.addSlot.bind(this)}>
                  <span>Add slots</span>
                  <select name="weekDays" ref="slotDay">
                    <option value="1">Thursday</option>
                    <option value="2">Friday</option>
                    <option value="3">Saturday</option>
                    <option value="4">Sunday</option>
                  </select>
                  <input type="submit" value="submit"></input>
                </form>
              </footer>
            : <span>Loading...</span>
          }          
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

Schedule.propTypes = {
  currentUser: PropTypes.object,
  games: PropTypes.array,
  thursdayCount: PropTypes.number,
  fridayCount: PropTypes.number,
  saturdayCount: PropTypes.number,
  sundayCount: PropTypes.number,
};