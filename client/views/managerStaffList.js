Template.managerStaffList.helpers({
  name: function() {
    return Meteor.user().profile.name;
  },
  counts: function() {
    return WorkerCounts.find().fetch();
  }
});

Template.managerStaffList.render = function() {   
  $('#page').html(Meteor.render(Template.managerStaffList));
}