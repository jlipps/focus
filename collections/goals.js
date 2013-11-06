/*global Meteor:true, Goals:true, Teams:true */

Goals = new Meteor.Collection("goals");

var allowTeamOwner = function(userId, goal) {
  var team = Teams.findOne({_id: goal.team});
  return team && team.owner == userId;
};

Goals.allow({
  insert: allowTeamOwner,
  update: allowTeamOwner,
  remove: allowTeamOwner
});

Goals.before.insert(function(userId, goal) {
  goal.createdAt = Date.now();
});



