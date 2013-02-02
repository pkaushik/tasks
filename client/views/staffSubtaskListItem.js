Template.staffSubtaskListItem.events({
  'click .update-subtask-status':
    function(event, template) { 
      Meteor.call("updateSubtaskStatus", Session.get('taskId'), this.order, event.currentTarget.id, function(error) {
        if (error) {
          Global.alert('error', "Update Failed");
        }
      });
    }
});