Template.staffTaskList.helpers({
  tasks: function() {
    console.log('called!!' + Session.get("filter"));
    if (Session.get('filter')) {
      Session.set('filter', false);
      var field = Session.get('filter-field');
      var val = Session.get('filter-value');
      return Tasks.find({field: val}).fetch();
    } else {
      return Tasks.find().fetch();
    }
  },
});

Template.managerTaskList.render = function() {   
  $('#page').html(Meteor.render(Template.managerTaskList));
  return this;
}

Template.managerTaskList.filter = function(options) { 
  Session.set('filter-field', options.field); 
  Session.set('filter-value', options.value); 
  Session.set('filter', true);
  return this; 
}