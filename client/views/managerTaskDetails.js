Template.managerTaskDetails.select = function(options) {
  Session.set("selected-taskId", options.id);
  return this;
}

// Template.managerTaskDetails.NAME = function() {
//   return TaskCollection.get(Session.get('task_id')).name;
// }
// 
// Template.managerTaskDetails.SUBTASKS = function() {
//   return TaskCollection.get(Session.get('task_id')).subtasks;
// }
// 
// Template.managerTaskDetails.ASSIGNED_NAME = function() {
//   var assigned = TaskCollection.get(Session.get('task_id')).assigned;
//   return assigned ? StaffCollection.getNameForId(assigned) : "Unassigned";
// }
