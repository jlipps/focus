/*global Meteor:true, Teams:true*/

/* structure:
 * {
 * }
 */

Teams = new Meteor.Collection("teams");

Teams.allow({
  insert: function(userId, team) {
    return Teams.find({name: team.name}).count() === 0;
  },
  update: function(userId, team, fieldNames, modifier) {
    if (team.owner === userId) return true;
    var addingMember = modifier['$push'] &&
                       modifier['$push'].members &&
                       modifier['$push'].invitationsUsed &&
                       fieldNames.length === 2;
    if (addingMember) {
      console.log("adding a member");
      var invitationId = modifier['$push'].invitationsUsed;
      var invitation = Invitations.findOne({_id: invitationId});
      console.log(invitation);
      return invitation && invitation.team === team._id;
    }
    return false;

  },
  remove: function(userId, team) {
    return team.owner === userId;
  }
});

Teams.before.insert(function(userId, team) {
  team.createdAt = Date.now();
  team.owner = userId;
  team.members = [userId];
  team.invitationsUsed = [];
  team.goals = [];
});


