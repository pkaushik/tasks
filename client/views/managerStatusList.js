Template.managerStatusList.helpers({
  name: function() {
    return Meteor.user().profile.name;
  },
  counts: function() {
    return StatusCounts.find().fetch();
  }
});