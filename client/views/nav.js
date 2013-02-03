Template.nav.events = {
  'click #logout': 
    function() {
      Meteor.logout(function(error) {
        Meteor.go('/');
        if (error) {
          Global.alert('error', "Logout Failed");
        }
      });
    }
}