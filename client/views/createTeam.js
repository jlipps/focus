/*global Template:true, Meteor:true, Teams:true, $:true, Helpers:true*/
"use strict";

Template.createTeam.events({
  'click .addTeamBtn': function (evt, tpt) {
    var team = {
      name: $('#createTeamField').val(),
      owner: Meteor.userId(),
      createdAt: Date.now()
    };
    Teams.insert(team, function(err) {
      $(tpt.find('.modal')).modal('hide');
      if (err) {
        Helpers.showError("Sorry, could not add that team", 4000);
      } else {
        Helpers.showSuccess("Team added!", 3000);
      }
    });
  }
});

Template.createTeam.rendered = Helpers.onModalRendered;
