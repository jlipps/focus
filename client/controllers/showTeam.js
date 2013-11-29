/*global Template:true, Meteor:true, Teams:true, $:true,
  Session:true, Goals:true */
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

Template.showTeam.goals = function() {
  var team = Template.showTeam.team();
  if (team) {
    return team.goals;
  }
};

var events = {};

events['click #inviteMembers'] = function() {
  $('#modalCont').html(Meteor.render(function() {
    return Template.inviteMembers();
  }));
};

events['click #addGoal'] = function() {
  $('#modalCont').html(Meteor.render(function() {
    return Template.addGoal();
  }));
};

Template.showTeam.events(events);
