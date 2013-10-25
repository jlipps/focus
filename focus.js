/*global Meteor:true, Accounts:true, Template:true */
"use strict";

var Teams = new Meteor.Collection("teams");
var Goals = new Meteor.Collection("goals");
var Tasks = new Meteor.Collection("tasks");

if (Meteor.isClient) {
  Accounts.ui.config({
    requestPermissions: {
      github: ['user']
    },
    passwordSignupFields: 'USERNAME_AND_EMAIL'
  });

  Meteor.subscribe("teams");

  Template.yourTeams.teams = function() {
    return Teams
      .find({$or: [{owner: Meteor.userId}, {member: Meteor.userId}]})
      .fetch();
  };

  Template.yourTeams.events({
    'click input' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log(this);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });

  Meteor.publish("teams", function() {
    return Teams.find({$or: [{invited: this.userId},
                             {owner: this.userId},
                             {member: this.userId}]});
  });
}
