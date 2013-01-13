Template.staffTaskDetails.show = function(options) {
  Session.set("selected-taskId", options.id);
  return this;
}

Template.staffTaskDetails.task = function() {
  return Tasks.findOne(Session.get("selected-taskId"));
}

Template.staffTaskDetails.render = function() {  
  $('#page').html(Meteor.render(Template.staffTaskDetails));
  return this;
}