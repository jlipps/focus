/*global Meteor:true, Invitations:true, Teams:true, _:true */

Invitations = new Meteor.Collection("invitations");

Invitations.allow({
  insert: function(userId, invitation) {
    var ok = !!invitation.team;
    ok = ok && Teams.find({_id: invitation.team, owner: userId}).count() == 1;
    ok = ok && Invitations.find({
      email: invitation.email,
      team: invitation.team
    }).count() === 0;
    return ok;
  },
  update: function(userId, doc, fieldNames, modifier) {
    return _.contains(fieldNames, 'used') && fieldNames.length === 1;
  },
  remove: function(userId, invitation) {
    return true;
  }
});

if (Meteor.isServer) {

  Invitations.before.insert(function(userId, invitation) {
    invitation.createdAt = Date.now();
    invitation.sender = userId;
    invitation.used = false;
  });

  Invitations.after.insert(function(userId, invitation) {
    var sender = Meteor.users.findOne({_id: invitation.sender});
    var name = sender.username;
    if (sender.profile) {
      name = sender.profile.name;
    }
    console.log("Sending e-mail from " + name + " to " + invitation.email);
  });
}

