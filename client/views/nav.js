Template.nav.helpers({
  navClassFor: function (name) {
    return Session.equals('nav', name) ? 'active' : '';
  }
});

Template.nav.events = {
  'click #logout': function() {
    Meteor.logout(function(error) {
      Meteor.go('/');
      if (error) {
        Global.alert('error', "Logout Failed");
      }
    });
  }
}