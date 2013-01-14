Template.managerStatusList.helpers({
  name: function() {
    return Meteor.user().profile.name;
  },
  statusCount: function(status) {
    var sc = StatusCounts.findOne({status: status});
    if (sc) 
      return sc.count;
    else
      return 0;
  }
});

Template.managerStatusList.render = function() {   
  $('#page').html(Meteor.render(Template.managerStatusList));
  return this;
}