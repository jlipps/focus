/*global Template:true, $:true, Helpers:true, Session:true, Goals:true */
"use strict";

var goalEvents = {};

var addGoal = function(goal, cb) {
  Goals.insert({goal: goalText, team: teamId}, function(err) {
};

goalEvents['submit #addGoalForm'] = goalEvents['click #addGoalBtn'] =
function (evt, tpt) {
  evt.preventDefault();
  var teamId = Session.get('teamId');
  var goalText = $('#goalText').val().trim();
  if (!goalText) {
    $('#goalErrors .message').text("You must enter text!");
    $('#goalErrors').show();
    return;
  }

  Goals.insert({goal: goalText, team: teamId}, function(err) {
    if (err) {
      console.log(err);
      Helpers.showError("Sorry, we ran into problems creating this goal", 4000);
    } else {
      Helpers.showSuccess("Goal added!", 3000);
    }
  });
  $(tpt.find('.modal')).modal('hide');
  return false;
};

Template.addGoal.events(goalEvents);

Template.addGoal.rendered = function() {
  Helpers.onModalRendered.bind(this)();
  $('#goalText').focus();
};


