/*global Meteor:true, Accounts:true, Session:true, Deps:true */
"use strict";

Accounts.ui.config({
  requestPermissions: {
    github: ['user']
  },
  passwordSignupFields: 'USERNAME_AND_EMAIL'
});

Deps.autorun(function() {
  Meteor.subscribe("teams", Session.get("invitationId"));
  Meteor.subscribe("invitations", Session.get("invitationId"));
  Meteor.subscribe("users", Session.get("teamId"));
  Meteor.subscribe("goals", Session.get("teamId"));
});
