Meteor.publish("tasks", function() {
  return Tasks.find({$or: [{managerId: this.userId}, {staffId: this.userId}]});
});

Meteor.publish("directory", function() {
  return Meteor.users.find({}, {fields: {profile: 1, username: 1}});
});