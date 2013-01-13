///////////////////////////////////////////////////////////////////////////////
// Tasks

Tasks = new Meteor.Collection("tasks");

// model permissions
Tasks.allow({
  insert: function (userId, task) {
    return false; // use createTask method
  },
  update: function (userId, tasks, fields, modifier) {
    return true;
  },
  remove: function (userId, tasks) {
    return ! _.any(tasks, function (task) {
      // deny if not the manger
      return task.managerId !== userId;
    });
  }
});

// model helper methods
var taskAssigned = function(task) {
   return task.assigned ? task.assigned : 'unassigned'
}

var taskStatus = function(task) {
  if (_.any(task.subtasks, function(subtask) { return subtask.status === "R" })) return "R";
  if (_.all(task.subtasks, function(subtask) { return subtask.status === "G" })) return "G";
  return "Y";
}



///////////////////////////////////////////////////////////////////////////////
// Meteor.users

var displayName = function (user) {
  if (user.profile && user.profile.name)
    return user.profile.name;
  return "unknown";
};


///////////////////////////////////////////////////////////////////////////////
// Meteor.methods

Meteor.methods({
  createTask : createTask,

  updateSubtaskStatus : function(taskId, subtaskOrder, newStatus) {
    var task = Tasks.findOne(taskId);
    var subtasks = task.subtasks;

    _.each(subtasks, function(subtask) { 
      if (subtask.order === subtaskOrder) {
        subtask.status = newStatus;
        return;
      }
    });

    Tasks.update(task._id, {$set: {subtasks: subtasks}});
  }
});

var createTask = function(options) {
  options = options || {};

  return Tasks.insert({
    managerId: options.managerId, //this.userId,
    name: options.name,
    subtasks: options.subtasks,
    workerId: options.workerId || ""
  });
}


