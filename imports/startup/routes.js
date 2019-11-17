import React from 'react';
import { Router, Route, Switch } from 'react-router';
import { createBrowserHistory } from 'history';
import Navigation from '../ui/Navigation.js';

import App from '../ui/App.js';
import Blog from '../ui/blog.js';
import Admin from '../ui/admin.js';
import Forum from '../ui/forum.js';
import Schedule from '../ui/schedule.js';
import GameDetails from '../ui/GameDetails.js';
import NotFoundPage from '../ui/NotFoundPage.js';

const browserHistory = createBrowserHistory();

export const Routes = () => (
  <Router history={browserHistory}>
    <div>
      <Navigation />
      <Switch>
        <Route exact path="/" component={App}/>
        <Route exact path="/blog" component={Blog}/>
        <Route exact path="/forum" component={Forum}/>
        <Route exact path="/schedule" component={Schedule}/>
        <Route exact path="/admin" component={Admin}/>
        <Route exact path="/gamedetails:gameid" component={GameDetails}/>
        <Route component={NotFoundPage}/>
      </Switch>
    </div>
  </Router>  
)