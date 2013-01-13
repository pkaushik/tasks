Meteor.startup(function() { 
  Router = new Router();
  Backbone.history.start();
  
  Meteor.subscribe("tasks");
  Meteor.subscribe("directory", function(){
    Global.start();
  });
});

Global = { 
  start: function() {
    var user = Meteor.user();
    if (user) {
      if (user.profile.role === "manager") {
        Router.navigateTo('managerMenu');
      } else {
        Router.navigateTo('staffTaskList');
      }
    }
  }, 
  
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