/*global Meteor:true, Goals:true, Teams:true */

/* structure:
 * {
 *   createdAt
 *   goal
 *   team (team id)
 *   color (hex string)
 * }
 */

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

var getRandomColor = function() {
  return 'f0f0f0';
};

Goals.before.insert(function(userId, goal) {
  goal.createdAt = Date.now();
  goal.color = getRandomColor();
});



