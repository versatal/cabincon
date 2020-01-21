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
import SubTopic from '../ui/SubTopic.js';
import NotFoundPage from '../ui/NotFoundPage.js';
import Post from '../ui/Post.js';
import EditPost from '../ui/EditPost.js';
import EditReply from '../ui/EditReply.js';
import EditTopic from '../ui/EditTopic.js';
import EditSubTopic from '../ui/EditSubTopic.js';

const browserHistory = createBrowserHistory();

export const Routes = () => (
  <Router history={browserHistory}>
    <Switch>
      <Route exact path="/" component={App}/>
      <div>
        <Navigation />
        <Switch>
          <Route exact path="/blog" component={Blog}/>
          <Route exact path="/forum" component={Forum}/>
          <Route exact path="/schedule" component={Schedule}/>
          <Route exact path="/admin" component={Admin}/>
          <Route exact path="/gamedetails:gameid" component={GameDetails}/>
          <Route exact path="/post:postid" component={Post}/>
          <Route exact path="/subtopic:subtopicid" component={SubTopic}/>
          <Route exact path="/editpost:postid" component={EditPost}/>
          <Route exact path="/editreply:postid" component={EditReply}/>
          <Route exact path="/edittopic:postid" component={EditTopic}/>
          <Route exact path="/editsubtopic:postid" component={EditSubTopic}/>
          <Route component={NotFoundPage}/>
        </Switch>
      </div>
    </Switch>
  </Router>  
)