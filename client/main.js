
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


function start(context, page) {
  var user = Meteor.user();
  console.log('1')
  if (user && user.profile) {
    console.log('2')
    if (user.profile.role === "manager") {
      console.log('3')
      // go to Manager Menu
    } else {
      // go to staffTaskList
    }
  } 
}

Meteor.pages({
  '/'                 : { to: 'login', before: [start] },
  '/managerMenu'      : { to: 'managerMenu' },
  '/staffTaskList'    : { to: 'staffTaskList' }
});

Handlebars.registerHelper("navClassFor", function (name, options) {
  return Session.equals("nav", name) ? "active" : "";
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