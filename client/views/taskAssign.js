Template.taskAssign.helpers({
  tick: function(task, staffId) {
    return (task.staffId === staffId) ?  "✓" : "";
  }
});

Template.staffSubtaskListItem.events({
  'click .update-task-assigned':
    function(event, template) { 
      Meteor.call("updateTaskAssigned", Session.get('taskId'), event.currentTarget.id, function(error) {
        if (error) {
          Global.alert('error', "Update Failed");
        }
      });
    }
});