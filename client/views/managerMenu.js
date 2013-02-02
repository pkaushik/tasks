Template.managerMenu.helpers({
  name: function() {
    return Meteor.user().profile.name;
  }
});