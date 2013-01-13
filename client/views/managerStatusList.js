Template.managerStatusList.statusCount = function(color) {
  return getTaskCountForStatus(color);
}

Template.managerStatusList.displayName = function() {
  return displayName(Meteor.user());
}

Template.managerStatusList.render = function() {   
  $('#page').html(Meteor.render(Template.managerStatusList));
}