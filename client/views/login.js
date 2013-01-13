Template.login.events = {
  'click #login': 
    function (event, template) { 
      Meteor.loginWithPassword(template.find('#username').value, template.find('#password').value, function(error) {
        template.find('#username').value = "";
        template.find('#password').value = "";
        if (error) {
          Global.alert('error', "Login Failed");
        } else {
          Global.start();
        }
      });
    }
}

Template.login.render = function() {
  $('#page').html(Meteor.render(Template.login));
}