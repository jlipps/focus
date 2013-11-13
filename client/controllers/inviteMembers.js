/*global Template:true, Meteor:true, Teams:true, $:true, Helpers:true,
  Session:true, Invitations:true, _:true */
"use strict";

var inviteEvents = {};

var sendInvitations = function(invitations, cb) {
  var n = 0;
  var errList = [];
  var next = function(err, invitation) {
    n++;
    if (err) {
      errList.push(invitation.email + ": could not send invitation, " +
                   "maybe one's already been sent?");
    }
    if (n == invitations.length) {
      cb(null, errList);
    }
  };
  if (invitations.length) {
    _.each(invitations, function(invitation) {
      Invitations.insert(invitation, function(err) {
        next(err, invitation);
      });
    });
  } else {
    next(null);
  }
};

inviteEvents['submit #inviteMembersForm'] =
inviteEvents['click #inviteMembersBtn'] = function (evt, tpt) {
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

  sendInvitations(invitations, function(err, errorList) {
    if (err) {
      console.log(err);
      Helpers.showError("Sorry, we ran into problems sending the invitations", 4000);
    } else {
      if (errorList.length) {
        Helpers.showError("Some invitations could not be sent: <br/>" +
                          errorList.join("<br/>"));
      } else {
        Helpers.showSuccess("Invitations sent!", 3000);
      }
    }
  });
  $(tpt.find('.modal')).modal('hide');
  return false;
};

Template.inviteMembers.events(inviteEvents);

Template.inviteMembers.rendered = function() {
  Helpers.onModalRendered.bind(this)();
  $('#inviteEmails').focus();
};

