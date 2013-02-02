Template.managerStatusList.helpers({
  counts: function() {
    return StatusCounts.find().fetch();
  }
});