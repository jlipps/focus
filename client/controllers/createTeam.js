/*global Template:true, Meteor:true, Teams:true, $:true, Helpers:true*/
"use strict";

var submitCreation = function (evt, tpt) {
  var team = {
    name: $('#createTeamField').val()
  };
  Teams.insert(team, function(err) {
    if (err) {
      Helpers.showError("Sorry, could not add that team", 4000);
    } else {
      Helpers.showSuccess("Team added!", 3000);
    }
  });
  $(tpt.find('.modal')).modal('hide');
};

Template.createTeam.events({
  'click .addTeamBtn': submitCreation,
  'keypress #createTeamField': function(evt, tpt) {
    Helpers.handleEnter(evt, function() {
      submitCreation(evt, tpt);
    });
  }
});

Template.createTeam.rendered = function() {
  Helpers.onModalRendered.bind(this)();
  $('#createTeamField').focus();
};
