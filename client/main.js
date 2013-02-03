// Subscriptions

Meteor.subscribe("tasks");
Meteor.subscribe("directory");

// helper

function alertMessage(type, message) {
  className = 'alert';
  if(type == 'warning' || type == 'info' || type == 'error') {
    className += ' alert-'+type
  }
  if(type == 'warning') {
    message = 'Warning: '+ message;
  }
  alert = $('<div class="' + className + '">  <button class="close" data-dismiss="alert">×</button>  ' + message + '</div>').alert();
  $('.page').prepend(alert);
}


// Paths

Meteor.pages({
  '/' : { to: 'login', as: 'login', before: [redirectWhenLoggedIn] },
  '/tasks' : { to: 'taskIndex', nav: 'tasks' },
  '/tasks/:_id' : { to: 'taskDetails', before: [setTask], nav: 'tasks' },
  '/tasks/:_id/assign' : { to: 'taskAssign', before: [setTask], nav: 'tasks' },
  '/profile' : { to: 'profile', nav: 'profile', before: [authorize] },
  '*' : 'login'
});


// Path helpers

function setTask(context) {
  Session.set("taskId", context.params._id);
}

function newTask(context) {
  Session.set("taskId", null);
}

function redirectWhenLoggedIn(context) {
  var user = Meteor.user();
  if (user && !Meteor.loggingIn()) {
      context.redirect(Meteor.taskIndexPath());
  } 
}

function authorize(context) {
  if (!Meteor.user()) {
    context.redirect('/login');
  }
}


// Template helpers

Handlebars.registerHelper('navClassFor', function (name) {
  return Session.equals('nav', name) ? 'active' : '';
});

Handlebars.registerHelper('task', function () {
  return Tasks.findOne(Session.get('taskId'));
});

Handlebars.registerHelper('tasks', function () {
  return Tasks.find();
});

Handlebars.registerHelper('displayName', function(id) {
  if (!id) {
    return Meteor.user().profile.name;
  } else if (id === "unassigned") {
    return "Unassigned";
  } else {
    return Meteor.users.findOne({_id: id}).profile.name;
  }
});

Handlebars.registerHelper('btn', function(status) {
  var btns = {
    'R' : 'btn-danger',
    'Y' : 'btn-warning',
    'G' : 'btn-success'
  }
  return btns[status] ? btns[status] : '';
});


