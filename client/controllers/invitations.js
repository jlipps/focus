/*global Meteor:true, Template:true, Invitations:true, Session:true,
  Helpers:true, Teams:true */
"use strict";

Template.invitations.invitation = function() {
  var invitation = Invitations.findOne({_id: Session.get('invitationId')});
  return invitation;
};

Template.invitations.rendered = function() {
  if (!Meteor.userId()) {
    Helpers.showSuccess("Thanks for trying to join a team on Focus. " +
                        "Please sign in and you'll be automatically " +
                        "added to your team.");
    return;
  }
  var invite = Invitations.findOne({_id: Session.get('invitationId')});
  if (invite) {
    console.log(invite);
    var team = Teams.findOne({_id: invite.team});
    console.log(team);
    console.log("adding user to team");
    Teams.update(team._id, {$push: {members: Meteor.userId()}}, function(err) {
      if (err) {
        Helpers.showError('Sorry, something went wrong adding you to ' +
                          'that team', 4000);
        return;
      }
      Invitations.remove(invite._id, function(err) {
        if (err) console.log("Invitation not removed :-(");
        //Meteor.Router.to('/teams/' + team._id);
        Helpers.showSuccess("Awesome! You're now a part of " + team.name);
      });
    });
  } else {
    console.log("no invite");
    //Meteor.Router.to('/teams');
    Helpers.showError("Sorry, that invitation is not valid");
  }
};
