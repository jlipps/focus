/*global Template:true, Meteor:true, Teams:true, $:true, Helpers:true,
  Session:true, Invitations:true */
"use strict";

Template.showTeam.team = function() {
  var team = Teams.findOne({_id: Session.get('teamId')});
  return team;
};

Template.showTeam.members = function() {
  var team = Template.showTeam.team();
  if (team) {
    var members = Meteor.users.find({_id: {$in: team.members}},
        {sort: {username: 1}}).fetch();
    return members;
  }
};

var events = {};

events['click #inviteMembers'] = function() {
  $('#modalCont').html(Meteor.render(function() {
    return Template.inviteMembers();
  }));
};

Template.showTeam.events(events);
