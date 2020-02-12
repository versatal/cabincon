import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import '../imports/api/games.js';
import '../imports/api/posts.js';
import '../imports/api/userData';
import '../imports/api/blogs';
import '../imports/api/comments';

Meteor.startup(() => {
  // code to run on server at startup
});

Accounts.onCreateUser((options,user) => {
  user.email = "";
  user.firstName = "please change";
  user.avatar = "/warrior.jpg";
  return user;
});