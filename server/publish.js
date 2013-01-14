Meteor.publish("counts-by-status", function() {
  var self = this;
  var count = 0;
  var uuid = Meteor.uuid();
  
  var handle = Tasks.find({$or: [{managerId: this.userId}, {workerId: this.userId}]}).observe({
    added: function() {
      self.set("counts", uuid, {status: status, count: count});
      self.flush();
    },
    removed: function() {
      self.set("counts", uuid, {status: status, count: count});
      self.flush();
    }
  });
  
  // Observe only returns after the initial added callbacks have
  // run.  Now mark the subscription as ready.
  self.complete();
  self.flush();

  // stop observing the cursor when client unsubs
  self.onStop(function () {
    handle.stop();
  }); 
});


// Meteor.publish("green-tasks", function() {
//   return Tasks.find({$where: function(){ return _.all(this.subtasks, function(subtask) { return subtask.status === "G" })}});
// });
// 
// Meteor.publish("red-tasks", function() {
//   return Tasks.find({$where: function(){ return _.any(this.subtasks, function(subtask) { return subtask.status === "R" })}]});
// });



Meteor.publish("tasks", function() {
  return Tasks.find({$or: [{managerId: this.userId}, {workerId: this.userId}]});
});

Meteor.publish("directory", function() {
  return Meteor.users.find({}, {fields: {'profile': 1}});
});



