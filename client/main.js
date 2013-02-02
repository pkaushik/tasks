// Subscriptions

Meteor.subscribe("tasks");
Meteor.subscribe("directory");


// Paths

Meteor.pages({
  '/' : { to: 'login', as: 'login', before: [redirectWhenLoggedIn] },
  '/tasks' : { to: 'taskIndex', nav: 'tasks' },
  '/tasks/:_id' : { to: 'taskDetails', before: [setTask], nav: 'tasks' },
  '*' : { to: 'login' }
});


// Path helpers

function setTask(context) {
  Session.set("taskId", context.params._id);
}

function redirectWhenLoggedIn(context) {
  var user = Meteor.user();
  if (user && !Meteor.loggingIn()) {
      context.redirect(Meteor.taskIndexPath());
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