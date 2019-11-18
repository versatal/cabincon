import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Routes } from '../imports/startup/routes.js';

import '../imports/startup/accounts-config.js';
 
Meteor.startup(() => {
  render(Routes(), document.getElementById('app'));
});
