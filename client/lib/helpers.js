/*global Helpers:true, $:true, window:true, Template:true, Meteor:true */
Helpers = {};

Helpers.onModalRendered = function() {
  $(this.find('.modal')).modal();
  $(this.find('.modal')).on('hidden', function() {
    $(this).parent().empty();
  });
};

var showMessage = function(type, msg, timeout) {
  $('#mainCont').prepend(Meteor.render(function() {
    return Template.message({type: type, message: msg});
  }));
  var msgDiv = $('#pageAlert');
  msgDiv.show();
  if (parseInt(timeout, 10) > 0) {
    var closeTimeout = setTimeout(function() {
      msgDiv.alert('close');
    }, timeout);
    msgDiv.alert().on('closed', function() {
      clearTimeout(closeTimeout);
    });
  }
};

Helpers.showError = function(msg, timeout) {
  showMessage('error', msg, timeout);
};

Helpers.showSuccess = function(msg, timeout) {
  showMessage('success', msg, timeout);
};

Helpers.handleEnter = function(e, fn) {
  if (e.charCode === 13) {
    e.stopPropagation();
    fn();
    return false;
  }
};
