Template.managerTaskList.filter = function(params) { 
  Session.set('filter', params); 
  return this; 
}

Template.managerTaskList.TASKS = function() {
  var filter = Session.get('filter');
  Session.set('filter', null);
  return filter ? TaskCollection.filter(filter) : TaskCollection.fetch();
}

Template.managerTaskList.ASSIGNED_NAME = function(id) {
  return id ? StaffCollection.getNameForId(id) : "Unassigned";
}

Template.managerTaskList.render = function() {   
  $('#page').html(Meteor.render(Template.managerTaskList));
  return this;
}