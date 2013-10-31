/*global Meteor:true, Accounts:true, Template:true, window:true */
"use strict";

var Teams = new Meteor.Collection("teams");
//var Goals = new Meteor.Collection("goals");
//var Tasks = new Meteor.Collection("tasks");

if (Meteor.isClient) {
  var userId = Meteor.userId();

  Accounts.ui.config({
    requestPermissions: {
      github: ['user']
    },
    passwordSignupFields: 'USERNAME_AND_EMAIL'
  });

  Meteor.subscribe("teams");

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
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });

  Meteor.publish("teams", function() {
    return Teams.find({$or: [{invited: this.userId},
                             {owner: this.userId},
                             {member: this.userId}]},
                      {sort: {createdAt: -1}});
  });
  Teams.allow({
    insert: function(userId, team) {
      console.log(Teams.find({name: team.name}).count());
      return Teams.find({name: team.name}).count() === 0;
    },
    remove: function(userId, team) {
      return team.owner === userId;
    }
  });
}


