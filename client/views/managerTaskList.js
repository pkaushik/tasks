Template.managerTaskList.helpers({
  tasks: function() {
    if (Session.get('filter')) {
      Session.set('filter', false);
      var field = Session.get('filter-field');
      var val = Session.get('filter-value');
      if (field === "status") {
        return Tasks.find({status: val}).fetch();
      }
      if (field === "assignedTo") {
        return Tasks.find({workerId: val}).fetch();
      }
      return Tasks.find().fetch();
    } else {
      return Tasks.find().fetch();
    }
  },
});

Template.managerTaskList.filter = function(options) { 
  Session.set('filter-field', options.field); 
  Session.set('filter-value', options.value); 
  Session.set('filter', true);
  return this; 
}