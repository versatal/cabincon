import React from 'react';
import { Router, Route, Switch } from 'react-router';
import { createBrowserHistory } from 'history';
import Navigation from '../ui/Navigation.js';

import App from '../ui/App.js';
import Blog from '../ui/Blog.js';
import BlogList from '../ui/BlogList.js';
import AddBlog from '../ui/AddBlog.js';
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
import EditBlog from '../ui/EditBlog.js';
import EditComment from '../ui/EditComment.js';

const browserHistory = createBrowserHistory();

export const Routes = () => (
  <Router history={browserHistory}>
    <Navigation />
    <Switch>
      <Route exact path="/" component={App}/>
      <Route exact path="/bloglist" component={BlogList}/> 
      <Route exact path="/blog:blogid" component={Blog}/>
      <Route exact path="/addblog" component={AddBlog}/>
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
      <Route exact path="/editblog:blogid" component={EditBlog}/> 
      <Route exact path="/editcomment:commentid" component={EditComment}/> 
      <Route component={NotFoundPage}/>
    </Switch>
  </Router>  
)