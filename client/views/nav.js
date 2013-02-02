Template.nav.events = {
  'click #logout': 
    function() {
      Meteor.logout(function(error) {
        if (error) {
          Global.alert('error', "Logout Failed");
        }
      });
    }
}