/*global Meteor:true, Accounts:true */
"use strict";

Accounts.ui.config({
  requestPermissions: {
    github: ['user']
  },
  passwordSignupFields: 'USERNAME_AND_EMAIL'
});

Meteor.subscribe("teams");
