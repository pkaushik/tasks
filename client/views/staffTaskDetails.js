Template.staffTaskDetails.show = function(options) {
  Session.set("selected-task", Tasks.findOne(options.id));
  return this;
}

Template.staffTaskDetails.task = function() {
  return Session.get("selected-task");
}

Template.staffTaskDetails.render = function() {  
  $('#page').html(Meteor.render(Template.staffTaskDetails));
  return this;
}