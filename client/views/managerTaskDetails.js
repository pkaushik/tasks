Template.managerTaskDetail.show = function(params) { 
  Session.set('task_id', params.id); 
  return this; 
}

Template.managerTaskDetail.NAME = function() {
  return TaskCollection.get(Session.get('task_id')).name;
}

Template.managerTaskDetail.SUBTASKS = function() {
  return TaskCollection.get(Session.get('task_id')).subtasks;
}

Template.managerTaskDetail.ASSIGNED_NAME = function() {
  var assigned = TaskCollection.get(Session.get('task_id')).assigned;
  return assigned ? StaffCollection.getNameForId(assigned) : "Unassigned";
}

Template.managerTaskDetail.render = function() {   
  $('#page').html(Meteor.render(Template.managerTaskDetail));
  return this;
}