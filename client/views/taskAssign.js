Template.taskAssign.helpers({
  tick: function(task, staffId) {
    return (task.staffId === staffId) ?  "✓" : "";
  }
});

Template.taskAssign.events({
  'click .update-task-assigned':
    function(event, template) { 
      var taskId = Session.get('taskId');
      Meteor.call("updateTaskAssigned", taskId, event.currentTarget.id, function(error) {
        Meteor.go('/tasks/' + taskId);
        if (error) {
          alertMessage('error', "Update Failed");
        }
      });
    }
});