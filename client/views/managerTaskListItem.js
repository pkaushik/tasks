Template.managerTaskListItem.helpers({
  workerName: function(workerId){
    console.log("workerName called with: " + workerId)
    if (workerId === "unassigned")
      return "Unassigned";
    else {
      return Meteor.users.findOne({_id: workerId}).profile.name;
    }
  }
});