Template.managerStaffList.helpers({
  name: function() {
    return Meteor.user().profile.name;
  },
  counts: function() {
    return StaffCounts.find().fetch();
  }
});

Template.managerStaffList.render = function() {   
  $('#page').html(Meteor.render(Template.managerStaffList));
}