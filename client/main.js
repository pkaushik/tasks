Meteor.startup(function() {
  // users  
  Meteor.subscribe("directory", function() {
    Router = new Router();
    Backbone.history.start();
  });
  
  // tasks
  Meteor.subscribe("tasks");
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