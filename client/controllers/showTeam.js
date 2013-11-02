/*global Template:true, Meteor:true, Teams:true, $:true, Helpers:true,
   Session:true */
"use strict";

Template.showTeam.team = function() {
  return Teams.findOne({_id: Session.get('teamId')});
};

var events = {};

var sendInvitation = function (evt, tpt) {
  var emails = $('#inviteEmails').val();
  var teamId = Session.get('teamId');
  // do stuff with emails
  var invitationCodes = [];
  var update = {$push: {invitationCodes: invitationCodes}, $each: true};
  Teams.update(teamId, update, function(err) {
    $(tpt.find('.modal')).modal('hide');
    if (err) {
      Helpers.showError("Sorry, we ran into problems sending the invitations", 4000);
    } else {
      Helpers.showSuccess("Invitations sent!", 3000);
    }
  });
};

events['click #inviteMembers'] = function() {
  $('#modalCont').html(Meteor.render(function() {
    return Template.inviteMembers();
  }));
};

Template.yourTeams.events(events);

