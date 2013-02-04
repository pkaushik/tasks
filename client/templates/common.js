// shared template helpers for

Handlebars.registerHelper('task', function () {
  return Tasks.findOne(Session.get('taskId'));
});

Handlebars.registerHelper('tasks', function () {
  return Tasks.find({}, {sort: {staffId: 1, name: 1}});
});

Handlebars.registerHelper('displayName', function(id) {
  if (!id) {
    return Meteor.user().profile.name;
  } else if (id === "unassigned") {
    return "Unassigned";
  } else {
    return Meteor.users.findOne({_id: id}).profile.name;
  }
});

Handlebars.registerHelper('btn', function(status) {
  var btns = {
    'R' : 'btn-danger',
    'Y' : 'btn-warning',
    'G' : 'btn-success'
  }
  return btns[status] ? btns[status] : '';
});