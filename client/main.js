// Subscriptions

Meteor.subscribe("tasks", function() {
  _.each([
    {status: "R", statusLabel: "label-important", statusName: "Red"}, 
    {status: "Y", statusLabel: "label-warning", statusName: "Yellow"}, 
    {status: "G", statusLabel: "label-success", statusName: "Green"}
  ], function(statusObj) {
    Meteor.autosubscribe(function () {
      Meteor.subscribe("counts-by-status", statusObj.statusName, statusObj.statusLabel, statusObj.status);
    });
  });
});

Meteor.subscribe("directory", function() {
  _.each(Meteor.users.find().fetch(), function(userObj) {
    Meteor.autosubscribe(function () {
      Meteor.subscribe("counts-by-staff", userObj.profile.name, userObj._id);
    });
    Meteor.subscribe("counts-by-staff", "Unassigned", "unassigned");
  });
});


// Paths

Meteor.pages({
  '/' : { to: 'login', as: 'login', before: [redirectWhenLoggedIn] },
  '/tasks' : { to: 'staffTaskList', nav: 'tasks' },
  '/tasks/:_id' : { to: 'staffTaskDetails', before: [setTask], nav: 'tasks' },
  '*' : { to: 'login' }
});


// Path helpers

function setTask(context) {
  Session.set("taskId", context.params._id);
}

function redirectWhenLoggedIn(context) {
  var user = Meteor.user();
  if (user && !Meteor.loggingIn()) {
    if (user.profile.manager) {
      context.redirect(Meteor.managerMenuPath());
    } else {
      context.redirect(Meteor.staffTaskListPath());
    }
  } 
}


// Template helpers

Handlebars.registerHelper('navClassFor', function (name) {
  return Session.equals('nav', name) ? 'active' : '';
});

Handlebars.registerHelper('task', function () {
  return Tasks.findOne(Session.get('taskId'));
});





  

Global = {   
  alert: function(type, message) {
    className = 'alert';
    if(type == 'warning' || type == 'info' || type == 'error') {
      className += ' alert-'+type
    }
    if(type == 'warning') {
      message = 'Warning: '+message;
    }
    alert = $('<div class="'+className+'">  <button class="close" data-dismiss="alert">×</button>  '+message+'</div>').alert();
    $('#page').prepend(alert);
  }
}