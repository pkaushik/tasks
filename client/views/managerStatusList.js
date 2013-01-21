Template.managerStatusList.helpers({
  name: function() {
    return Meteor.user().profile.name;
  },
  statusCount: function(status) {
    return Tasks.find({status: status}).fetch().length;
  }
});

Template.managerStatusList.render = function() {   
  $('#page').html(Meteor.render(Template.managerStatusList));
  return this;
}