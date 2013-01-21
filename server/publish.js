Meteor.publish("tasks", function() {
  return Tasks.find({$or: [{managerId: this.userId}, {staffId: this.userId}]});
});

Meteor.publish("directory", function() {
  return Meteor.users.find({}, {fields: {'profile': 1, 'username': 1}});
});


Meteor.publish("counts-by-status", function(statusName, statusLabel, status) {
  var self = this;
  var count = 0;
  var uuid = Meteor.uuid();
  
  var handle = Tasks.find({status: status}).observe({
    added: function() {
      count++;
      self.set("status-counts", uuid, {status: status, statusName: statusName, statusLabel: statusLabel, count: count});
      self.flush();
    },
    removed: function() {
      count--;
      self.set("status-counts", uuid, {status: status, statusName: statusName, statusLabel: statusLabel, count: count});
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


Meteor.publish("counts-by-staff", function(staffName, staffId) {
  var self = this;
  var count = 0;
  var uuid = Meteor.uuid();
  
  var handle = Tasks.find({staffId: staffId}).observe({
    added: function() {
      count++;
      self.set("staff-counts", uuid, {staffName: staffName, staffId: staffId, count: count});
      self.flush();
    },
    removed: function() {
      count--;
      self.set("staff-counts", uuid, {staffName: staffName, staffId: staffId, count: count});
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






