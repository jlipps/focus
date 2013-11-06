/*global Meteor:true, Teams:true, Invitations:true, Goals:true */
"use strict";

Meteor.publish("teams", function(invitationId) {
  var teams, invitationTeamId = -1;
  var invitation = Invitations.findOne({_id: invitationId});
  if (invitation) {
    invitationTeamId = invitation.team;
  }
  teams = Teams.find({$or: [{owner: this.userId},
                            {members: {$all: [this.userId]}},
                            {_id: invitationTeamId}
                           ]},
                     {sort: {createdAt: -1}});
  return teams;
});

Meteor.publish("invitations", function(invitationId) {
  return Invitations.find({_id: invitationId});
});

Meteor.publish("users", function(teamId) {
  var team = Teams.findOne({_id: teamId});
  if (team) {
    return Meteor.users.find({_id: {$in: team.members}});
  }
  return [];
});

Meteor.publish("goals", function(teamId) {
  var team = Teams.findOne({_id: teamId});
  if (team) {
    return Goals.find({_id: {$in: team.goals}});
  }
  return [];
});
