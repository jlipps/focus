/*global Template:true, Meteor:true, Teams:true, $:true, Helpers:true,
  Session:true, Invitations:true */
"use strict";

Template.showTeam.team = function() {
  var team = Teams.findOne({_id: Session.get('teamId')});
  console.log(team.members);
  return team;
};

Template.showTeam.members = function() {
  var team = Template.showTeam.team();
  if (team) {
    return Meteor.users.find({_id: {$in: team.members}}).fetch();
  }
};

var events = {};

events['click #inviteMembers'] = function() {
  $('#modalCont').html(Meteor.render(function() {
    return Template.inviteMembers();
  }));
};

Template.showTeam.events(events);
