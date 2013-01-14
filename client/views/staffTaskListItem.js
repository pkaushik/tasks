Template.staffTaskListItem.helpers({
  isG: function() {
    return this.status === "G"
  },
  isR: function() {
    return this.status === "R"
  },
  isY: function() {
    return this.status === "Y"
  }
});
