/*global Template:true, $:true, Helpers:true, Session:true, Teams:true,
  Meteor:true */
"use strict";

var goalEvents = {};
var getRandomColor = function() {
  return 'f0f0f0';
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
  var goal = {goal: goalText, user: Meteor.userId(), color: getRandomColor()};
  Teams.update(teamId, {$push: {goals: goal}}, function(err) {
    if (err) {
      Helpers.showError("Sorry, could not add that goal", 4000);
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


