Template.managerStatusList.helpers({
  name: function() {
    return Meteor.user().profile.name;
  },
  counts: function() {
    return StatusCounts.find().fetch();
  }
});

Template.managerStatusList.render = function() {   
  $('#page').html(Meteor.render(Template.managerStatusList));
  return this;
}