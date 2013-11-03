/*global Template:true, Meteor:true, Teams:true, $:true, Helpers:true,
  Session:true, Invitations:true */
"use strict";

var inviteEvents = {};

inviteEvents['submit #inviteMembersForm'] = function (evt, tpt) {
  evt.preventDefault();
  var teamId = Session.get('teamId');
  var emails = $('#inviteEmails').val().trim();
  if (!emails) {
    $('#inviteErrors .message').text("You must enter some e-mails!");
    $('#inviteErrors').show();
    return;
  }
  emails = emails.split(",");
  var invitations = [];
  for (var i = 0; i < emails.length; i++) {
    emails[i] = emails[i].trim();
    invitations.push({
      email: emails[i],
      team: teamId
    });
  }

  Meteor.call("sendInvitations", invitations, function(err, res) {
    $(tpt.find('.modal')).modal('hide');
    if (err) {
      console.log(err);
      Helpers.showError("Sorry, we ran into problems sending the invitations", 4000);
    } else {
      if (res.length) {
        var messages = res.pluck('message');
        Helpers.showError("Some invitations could not be sent: <br/>" +
                          messages.join("<br/>"));
      } else {
        Helpers.showSuccess("Invitations sent!", 3000);
      }
    }
  });
  return false;
};

inviteEvents['click #inviteBtn'] = inviteEvents['submit #inviteMembersForm'];

Template.inviteMembers.events(inviteEvents);

Template.inviteMembers.rendered = function() {
  Helpers.onModalRendered.bind(this)();
  $('#inviteEmails').focus();
};

