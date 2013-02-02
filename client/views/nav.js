Template.nav.events = {
  'click #logout': 
    function() {
      Meteor.logout(function(error) {
        Session.set("authorized", false);
        Meteor.go('/');
        if (error) {
          Global.alert('error', "Logout Failed");
        }
      });
    }
}