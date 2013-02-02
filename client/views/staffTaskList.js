Template.staffTaskList.helpers({
  tasks: function() {
    return Tasks.find();
  }
});