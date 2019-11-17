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

const EmptyRow = styled.div`
grid-column: 1 / span ${props => props.cols};
grid-row: ${props => props.begin} / ${props => props.end};
background-color: red;
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
    return (
      <form className="slotAdd" onSubmit={this.addSlot.bind(this)}>
                <input type="hidden" ref="slotDay" value={num}></input>
                <input type="submit" value="Add Slot"></input>
      </form>
    )
  }

  render() {
    const { currentUser, thursdayCount, fridayCount, saturdayCount, sundayCount } = this.props;

    let fridayBumper = thursdayCount + 2;
    let saturdayBumper = thursdayCount + fridayCount + 2;
    let sundayBumper = thursdayCount + fridayCount + saturdayCount + 2;

    let fridayEnd = fridayCount + fridayBumper;
    let saturdayEnd =  saturdayCount + saturdayBumper;
    let sundayEnd =  sundayCount + sundayBumper;

    let columns = 5;

    if (thursdayCount < 1) {
      fridayBumper++;
      saturdayBumper++;
      sundayBumper++;
    }
    if (fridayCount < 1) {
      saturdayBumper++;
      sundayBumper++;
    }
    if (saturdayCount < 1) {
      sundayBumper++;
    }

    return (
      <div className="container">
        <header>

        </header>

        <GridLayout>
          {this.renderHeadings()}
          {thursdayCount > 0 ? this.renderGames(1, 2, thursdayCount + 2) :
            <EmptyRow begin={2} end={3} cols={columns}>Thursday
            {currentUser ? currentUser.isAdmin && this.submitSlot(1) : <span>Loading...</span>}             
            </EmptyRow>}
          {fridayCount > 0 ? this.renderGames(2, fridayBumper, fridayEnd) :
            <EmptyRow begin={fridayBumper} end={fridayBumper + 1} cols={columns}>Friday
            {currentUser ? currentUser.isAdmin && this.submitSlot(2) : <span>Loading...</span>}             
            </EmptyRow>}
          {saturdayCount > 0 ? this.renderGames(3, saturdayBumper, saturdayEnd) :
            <EmptyRow begin={saturdayBumper} end={saturdayBumper + 1} cols={columns}>Saturday
            {currentUser ? currentUser.isAdmin && this.submitSlot(3) : <span>Loading...</span>}             
            </EmptyRow>}
          {sundayCount > 0 ? this.renderGames(4, sundayBumper, sundayEnd) :
            <EmptyRow begin={sundayBumper} end={sundayBumper + 1} cols={columns}>Sunday
            {currentUser ? currentUser.isAdmin && this.submitSlot(4) : <span>Loading...</span>}             
            </EmptyRow>}
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