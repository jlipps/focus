/*global Template:true, Meteor:true, Teams:true, window:true*/
"use strict";

var userId = Meteor.userId();

Template.yourTeams.teams = function() {
  return Teams
    .find({$or: [{owner: userId}, {member: userId}]})
    .fetch();
};

Template.yourTeams.events({
  'click input': function () {
    var teamName = window.prompt("What is your team called?");
    var team = {
      name: teamName,
      owner: userId,
      createdAt: Date.now()
    };
    Teams.insert(team, function(err) {
      if (err) {
        window.alert("Sorry, couldn't create a team with that name. " +
                     "One already exists");
      }
    });
  },
  'click .deleteTeam': function() {
    Teams.remove(this._id, function(err) {
      if (err) console.log(err);
    });
  }
});
