Meteor.startup(function() {
  // tasks - get all tasks associated
  Meteor.subscribe("tasks");
  
  // users  
  Meteor.subscribe("directory", function() {
    // profile is populated after login
    Router = new Router();
    Backbone.history.start();
    
    // counts 
    _.each([
      {status: "R", statusLabel: "label-important", statusName: "Red"}, 
      {status: "Y", statusLabel: "label-warning", statusName: "Yellow"}, 
      {status: "G", statusLabel: "label-success", statusName: "Green"}
    ], function(statusObj) {
      Meteor.autosubscribe(function () {
        Meteor.subscribe("counts-by-status", statusObj.statusName, statusObj.statusLabel, statusObj.status);
      });
    });

    _.each(Meteor.users.find().fetch(), function(userObj) {
      Meteor.autosubscribe(function () {
        Meteor.subscribe("counts-by-staff", userObj.profile.name, userObj._id);
      });
      Meteor.subscribe("counts-by-staff", "Unassigned", "unassigned");
    });
    
  });
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