import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        deadline: '11 June, 2020', 
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    };
}

componentDidMount() {
  this.getTimeUntil(this.state.deadline);
  this.timerId = setInterval(() => this.getTimeUntil(this.state.deadline), 1000);
}

componentWillUnmount() {
  clearInterval(this.timerId);
}

leading0(num) {
    return num < 10 ? '0' + num : num;
}

getTimeUntil(deadline) {
    const time = Date.parse(deadline) - Date.parse(new Date());

    if(time < 0) {
        this.setState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    } else {
        const seconds = Math.floor((time/1000)%60);
        const minutes = Math.floor((time/1000/60)%60);
        const hours = Math.floor((time/(1000*60*60))%24);
        const days = Math.floor(time/(1000*60*60*24));

        this.setState({ days, hours, minutes, seconds });
    }
    
}
  render() {
    return (
      <div>
        <img className="hero-image" src="https://theplaylist.net/wp-content/uploads/2016/05/5-things-you-might-not-know-about-star-trek-ii-wrath-of-khan-30th-anniversary-1200x520.png" />
        <div className="Clock">
          <div className="Clock-title">Countdown to Cabin Con.  June 11 thru June 14 2020</div>
          <div className="Clock-face">
            <div className="Clock-days">{this.leading0(this.state.days)} Days</div>
            <div className="Clock-hours">{this.leading0(this.state.hours)} Hours</div>
            <div className="Clock-minutes">{this.leading0(this.state.minutes)} Minutes</div>
            <div className="Clock-seconds">{this.leading0(this.state.seconds)} Seconds</div>
          </div>
        </div>
        <div className="siteEntry">
          <Link className="entryLink" to="/schedule">Enter</Link>
        </div>
      </div>
    )
  }
}