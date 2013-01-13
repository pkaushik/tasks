Template.managerMenu.displayName = function() {
  return displayName(Meteor.user());
}

Template.managerMenu.render = function() {
  $('#page').html(Meteor.render(Template.managerMenu));
}