/*global Meteor:true, Template:true, Invitations:true, Session:true,
  Helpers:true, Teams:true, _:true */
"use strict";

Template.invitations.invitation = function() {
  var invitation = Invitations.findOne({_id: Session.get('invitationId')});
  return invitation;
};

Template.invitations.team = function() {
  var invite = Template.invitations.invitation();
  if (invite) {
    return Teams.findOne({_id: invite.team});
  }
};

Template.invitations.rendered = function() {
  if (!Meteor.userId()) {
    Helpers.showSuccess("Thanks for trying to join a team on Focus. " +
                        "Please sign in and you'll be automatically " +
                        "added to your team.");
    return;
  }
  var invite = Template.invitations.invitation();
  console.log(Invitations.find().fetch());
  if (invite) {
    console.log(invite);
    var team = Teams.findOne({_id: invite.team});
    if (_.contains(team.invitationsUsed, invite._id)) {
      Helpers.showError('Sorry, that invitation has already been used');
      return;
    }
    console.log(team);
    console.log("adding user to team");
    var mod = {$push: {members: Meteor.userId(), invitationsUsed: invite._id}};
    Teams.update(team._id, mod, function(err) {
      if (err) {
        console.log(err);
        Helpers.showError('Sorry, something went wrong adding you to ' +
                          'that team', 4000);
        return;
      }
      Meteor.Router.to('/teams/' + team._id);
      Helpers.showSuccess("Awesome! You're now a part of " + team.name);
    });
  } else {
    console.log("no invite");
    //Meteor.Router.to('/teams');
    Helpers.showError("Sorry, that invitation is not valid");
  }
};
