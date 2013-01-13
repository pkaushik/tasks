Meteor.publish("tasks", function() {
  return Tasks.find({$or: [{managerId: this.userId}, {workerId: this.userId}]});
});

Meteor.publish("directory", function() {
  return Meteor.users.find({}, {fields: {'profile': 1}});
});
