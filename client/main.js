// Subscriptions
Meteor.subscribe("directory");
Meteor.subscribe("tasks", function() {
  // Tasks.find().observe({
  //   added: function(doc) {
  //     console.log(doc);
  //     showModal('New Task!', doc.name); 
  //   },
  //   removed: function(doc) {
  //     console.log(doc);
  //     showModal('Task Reassigned!', doc.name);
  //   }
  // });
});



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




