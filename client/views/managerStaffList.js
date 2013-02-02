Template.managerStaffList.helpers({
  counts: function() {
    return StaffCounts.find().fetch();
  }
});