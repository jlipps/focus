/*global Meteor:true, Accounts:true, Session:true */
"use strict";

Accounts.ui.config({
  requestPermissions: {
    github: ['user']
  },
  passwordSignupFields: 'USERNAME_AND_EMAIL'
});

Meteor.subscribe("teams", Session.get("invitationId"));
Meteor.subscribe("invitations", Session.get("invitationId"));
