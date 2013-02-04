///////////////////////////////////////////////////////////////////////////////
// Tasks

// Define Minimongo collection to match server/publish.js.
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
  },
  fetch: ['managerId']
});



///////////////////////////////////////////////////////////////////////////////
// Meteor.methods

Meteor.methods({
  createTask : function(options) {
    options = options || {};

    return Tasks.insert({
      managerId: options.managerId,
      status: options.status,
      name: options.name,
      subtasks: options.subtasks,
      staffId: options.staffId
    });
  },

  updateSubtaskStatus : function(taskId, subtaskOrder, subtaskStatus) {
    var task = Tasks.findOne(taskId);
    var idx = parseInt(subtaskOrder) - 1;
    var subtasks = task.subtasks;
    //TODO check subtask is valid subset of var allowed = ["Y", "G", "R"];
    subtasks[idx].status = subtaskStatus;
    
    var status = "Y";
    var g = 0;
    _.each(subtasks, function(subtask){
      if (subtask.status === "R") {
        status = "R"
      } else if (subtask.status === "G") {
        g++;
      }
    });
    
    if (g === task.subtasks.length) {
      status = "G";
    }

    Tasks.update(task._id, {$set: {subtasks: subtasks, status: status}});
  },
  
  updateTaskAssignment : function(taskId, staffId) {
    var task = Tasks.findOne(taskId);
    var staff = Meteor.users.find(staffId);
    if (!task || !staff) return;
    Tasks.update(task._id, {$set: {staffId: staffId}});
  }
});
