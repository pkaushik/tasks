Meteor.publish("tasks", function() {
  return Tasks.find({$or: [{managerId: this.userId}, {workerId: this.userId}]});
});

Meteor.publish("directory", function() {
  return Meteor.users.find({}, {fields: {'profile': 1, 'username': 1}});
});


Meteor.publish("counts-by-status", function(status) {
  var self = this;
  var count = 0;
  var uuid = Meteor.uuid();
  
  var handle = Tasks.find({status: status}).observe({
    added: function() {
      count++;
      self.set("status-counts", uuid, {status: status, count: count});
      self.flush();
    },
    removed: function() {
      count--;
      self.set("status-counts", uuid, {status: status, count: count});
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


Meteor.publish("counts-by-worker", function(workerName, workerId) {
  var self = this;
  var count = 0;
  var uuid = Meteor.uuid();
  
  var handle = Tasks.find({workerId: workerId}).observe({
    added: function() {
      count++;
      self.set("worker-counts", uuid, {workerName: workerName, workerId: workerId, count: count});
      self.flush();
    },
    removed: function() {
      count--;
      self.set("worker-counts", uuid, {workerName: workerName, workerId: workerId, count: count});
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






