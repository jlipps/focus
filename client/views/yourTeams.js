/*global Template:true, Meteor:true, Teams:true, window:true, $:true */
"use strict";

var userId = Meteor.userId();

Template.yourTeams.teams = function() {
  return Teams
    .find({$or: [{owner: userId}, {member: userId}]})
    .fetch();
};

Template.yourTeams.events({
  'click #createTeam': function () {
    $('#modalCont').html(Meteor.render(function() {
      return Template.createTeam();
    }));
  },
  'click .deleteTeam': function() {
    Teams.remove(this._id, function(err) {
      if (err) console.log(err);
    });
  }
});
