/* global Meteor:true, Session:true, Teams:true, window:true, Helpers:true,
   Invitations:true */
"use strict";

var filters = {};
filters.checkLoggedIn = function(page) {
  if (Meteor.loggingIn()) {
    return 'loading';
  } else if (Meteor.userId()) {
    var nextUrl = Session.get('nextUrl');
    if (nextUrl) {
      Session.set('nextUrl', null);
      Meteor.Router.to(nextUrl);
    } else {
      return page;
    }
  } else {
    console.log("we have no login");
    Session.set('nextUrl', window.location.pathname);
    return 'signin';
  }
};

filters.checkViewTeam = function(page) {
  if (Teams.find({_id: Session.get('teamId')}).count()) {
    return page;
  }
  return 'notFound';
};

Meteor.Router.filters(filters);
Meteor.Router.filter('checkLoggedIn', {except: ['invitations']});
Meteor.Router.filter('checkViewTeam', {only: ['showTeam']});

Meteor.Router.add({
  '/': 'yourTeams',
  '/teams': 'yourTeams',
  '/teams/:id': function(teamId) {
    Session.set('teamId', teamId);
    return 'showTeam';
  },
  '/invitations/:id': function(invitationId) {
    console.log('hi');
    console.log("Setting invitationId to " + invitationId);
    Session.set('invitationId', invitationId);
    return 'invitations';
  },
  '/404': 'notFound'
});
