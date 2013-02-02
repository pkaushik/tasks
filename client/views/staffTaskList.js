Template.staffTaskList.helpers({
  tasks: function() {
    return Tasks.find();
  }
});

// to make the URL match
Template.staffTaskList.rendered = function() {
  history.pushState({}, '', '/tasks')
}