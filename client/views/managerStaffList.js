Template.managerStaffList.UNASSIGNED_TASK_COUNT = function() {
  return TaskCollection.getCountForUnassigned();
}

Template.managerStaffList.ASSIGNED_TASK_COUNTS = function() {
  var staffCollection = StaffCollection.fetch();
  _(staffCollection).each(function(staff){
    staff.COUNT = TaskCollection.getCountForStaff(staff._id); 
  });
  return staffCollection;
}

Template.managerStaffList.NAME = function() {
  return Session.get('name');
}

Template.managerStaffList.render = function() {   
  $('#page').html(Meteor.render(Template.managerStaffList));
}