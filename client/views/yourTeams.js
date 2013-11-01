/*global Template:true, Meteor:true, Teams:true, $:true, Helpers:true */
"use strict";

var userId = Meteor.userId();

Template.yourTeams.teams = function() {
  return Teams
    .find({$or: [{owner: userId}, {member: userId}]})
    .fetch();
};

var events = {};

events['click #createTeam'] = function() {
  $('#modalCont').html(Meteor.render(function() {
    return Template.createTeam();
  }));
};

events['click .deleteTeam'] = function() {
  var team = this;
  var message = "If you delete this team, it will be gone permanently";
  Helpers.confirm(message, function() {
    Teams.remove(team._id, function(err) {
      if (err) {
        Helpers.showError("Could not delete " + team.name, 4000);
      } else {
        Helpers.showSuccess("Deleted " + team.name, 3000);
      }
    });
  });
};

Template.yourTeams.events(events);
