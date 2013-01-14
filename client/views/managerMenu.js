Template.managerMenu.helpers({
  name: function() {
    return Meteor.user().profile.name;
  }
});

Template.managerMenu.render = function() {
  $('#page').html(Meteor.render(Template.managerMenu));
}