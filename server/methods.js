/*global Meteor:true, Invitations:true, _:true */

var methods = {};

methods.sendInvitations = function(invitations) {
  var errs = [];
  _.each(invitations, function(invitation) {
    try {
      Invitations.insert(invitation, function(err) {
        console.log(err);
      });
    } catch (err) {
      errs.push(err);
    }
  });
  return errs;
};

Meteor.methods(methods);
