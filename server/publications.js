/*global Meteor:true, Teams:true*/
"use strict";

Meteor.publish("teams", function() {
  return Teams.find({$or: [{invited: this.userId},
                           {owner: this.userId},
                           {member: this.userId}]},
                    {sort: {createdAt: -1}});
});


