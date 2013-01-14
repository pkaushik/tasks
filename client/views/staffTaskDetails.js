Template.staffTaskDetails.helpers({
  task: function() {
    return Tasks.findOne(Session.get("selected-taskId"));
  }
}); 

Template.staffTaskDetails.render = function() {  
  $('#page').html(Meteor.render(Template.staffTaskDetails));
  return this;
}

Template.staffTaskDetails.select = function(options) {
  Session.set("selected-taskId", options.id);
  return this;
};