/*global Template:true, Meteor:true, Teams:true, $:true, Helpers:true,
  Session:true, Invitations:true */
"use strict";

Template.showTeam.team = function() {
  return Teams.findOne({_id: Session.get('teamId')});
};

var events = {};

events['click #inviteMembers'] = function() {
  $('#modalCont').html(Meteor.render(function() {
    return Template.inviteMembers();
  }));
};

Template.showTeam.events(events);
