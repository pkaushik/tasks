Template.modal.events({
  'click .done': function () {
    Session.set("showModal", false);
    return false;
  }
});

Template.modal.helpers({
  modalTitle: function() {
    return Session.get("modalTitle");
  },
  modalBody: function() {
    return Session.get("modalBody");
  }
})
