Template.staffTaskList.tasks = function() {
  return Tasks.find({}).fetch();
}

Template.staffTaskList.render = function() {   
  $('#page').html(Meteor.render(Template.staffTaskList));
  return this;
}