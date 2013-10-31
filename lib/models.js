/*global Meteor:true, Teams:true*/

Teams = new Meteor.Collection("teams");

Teams.allow({
  insert: function(userId, team) {
    return Teams.find({name: team.name}).count() === 0;
  },
  remove: function(userId, team) {
    return team.owner === userId;
  }
});

