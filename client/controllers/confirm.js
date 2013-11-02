/*global Template:true, Helpers:true, $:true */
"use strict";

Template.confirm.events({
  'click .btn-primary': function(evt, tpl) {
    this.onConfirmation();
    $(tpl.find('.modal')).modal('hide');
  }
});

Template.confirm.rendered = Helpers.onModalRendered;
