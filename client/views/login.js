Template.login.events({
  'click #login': 
    function (event, template) { 
      var u = template.find('#username').value;
      var p = template.find('#password').value;
      template.find('#username').value = "";
      template.find('#password').value = "";
      
      Meteor.loginWithPassword(u, p, function(error) {
        if (error) {
          Global.alert('error', "Login Failed");
        }
      });
    }
});