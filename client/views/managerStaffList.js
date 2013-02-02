Template.managerStaffList.helpers({
  name: function() {
    return Meteor.user().profile.name;
  },
  counts: function() {
    return StaffCounts.find().fetch();
  }
});