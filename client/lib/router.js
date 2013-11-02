/* global Meteor:true, Session:true, Teams:true */
"use strict";

var filters = {};
filters.checkLoggedIn = function(page) {
  if (Meteor.loggingIn()) {
    return 'loading';
  } else if (Meteor.user()) {
    return page;
  } else {
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
Meteor.Router.filter('checkLoggedIn');
Meteor.Router.filter('checkViewTeam', {only: ['showTeam']});

Meteor.Router.add({
  '/': 'yourTeams',
  '/teams/:id': function(teamId) {
    Session.set('teamId', teamId);
    return 'showTeam';
  }
});
