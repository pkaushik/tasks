Template.staffTaskDetailsSubtask.tick = function(color) {
  return this.status === color ? "✓" : "";
};

Template.staffTaskDetailsSubtask.events = {
  'click .update-subtask-status':
    function(event, template) { 
      Meteor.call("updateSubtaskStatus", Session.get('selected-taskId'), this.order, event.currentTarget.id, function(error) {
        if (error) {
          Global.alert('error', "Update Failed");
        }
      });
    }
}