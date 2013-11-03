/*global Meteor:true, Accounts:true, Session:true */
"use strict";

Accounts.ui.config({
  requestPermissions: {
    github: ['user']
  },
  passwordSignupFields: 'USERNAME_AND_EMAIL'
});

Meteor.subscribe("teams");
Meteor.subscribe("invitations", {_id: Session.get("invitationId")});
