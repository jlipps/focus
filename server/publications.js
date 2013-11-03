/*global Meteor:true, Teams:true, Invitations:true */
"use strict";

Meteor.publish("teams", function(invitationId) {
  var teams = [];
  var invitedTeam = Invitations.findOne({_id: invitationId});
  if (invitedTeams) {
    teams.push(
  var myTeams = Teams.find({$or: [{owner: this.userId},
                                  {members: {$all: [this.userId]}}
                                 ]},
                           {sort: {createdAt: -1}});
});

Meteor.publish("invitations", function(invitationId) {
  return Invitations.find({_id: invitationId});
});
