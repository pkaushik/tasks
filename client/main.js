Meteor.startup(function() {
  // tasks - get all tasks associated
  Meteor.subscribe("tasks");
  
  // users  
  Meteor.subscribe("directory", function() {
    // profile is populated after login
    Router = new Router();
    Backbone.history.start();
    
    // counts 
    _.each(["R", "Y", "G"], function(status) {
      Meteor.autosubscribe(function () {
        Meteor.subscribe("counts-by-status", status);
      });
    });

    _.each(Meteor.users.find().fetch(), function(userObj) {
      Meteor.autosubscribe(function () {
        Meteor.subscribe("counts-by-worker", userObj.profile.name, userObj._id);
      });
      Meteor.subscribe("counts-by-worker", "Unassigned", "unassigned");
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