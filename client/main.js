// Subscriptions

Meteor.subscribe("directory");
Meteor.subscribe("tasks");


// global helper functions

var showModal = function (title, body) {
  Session.set("modalTitle", title);
  Session.set("modalBody", body);
  Session.set("showModal", true);
};

var showAlert = function (type, message) {
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
  '/tasks' : { to: 'taskIndex', before: [authorize], nav: 'tasks' },
  '/tasks/:_id' : { to: 'taskDetails', before: [authorize, setTask], nav: 'tasks' },
  '/tasks/:_id/assign' : { to: 'taskAssign', before: [authorize, setTask], nav: 'tasks' },
  '/profile' : { to: 'profile', nav: 'profile', before: [authorize] },
  '/login': { to: 'login', as: 'login', before: [redirectWhenLoggedIn] },
  '*' : { to: 'login', as: 'login', before: [redirectWhenLoggedIn] }
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
    context.redirect('/tasks');
  }
}

function authorize(context) {
  if (!Meteor.user()) {
    context.redirect('/login');
  }
}




