Router = Backbone.Router.extend({
  
  pages: {},
  
  pageExists: function (page) {
    if (Template[page] && Template[page]['render']) {
      return true;
    }
    return false;
  },
  
  actionExists: function (page, action) {
    if (Template[page] && Template[page][action] && Template[page]['render']) {
      return true;
    }
    return false;
  },

  routes: {
    ":page/:action?:params": "actionParamsPage",
    ":page/:action?:params/": "actionParamsPage",
    ":page/:action": "actionPage",
    ":page/:action/": "actionPage",
    ":page": "basicPage",
    ":page/": "basicPage",
    "": "start",
    "/": "start",
  },
  
  start: function() {
    // check if user is set....
    var user = Meteor.user();
    if (user && user.profile) {
      if (user.profile.role === "manager") {
        Router.navigateTo('managerMenu');
      } else {
        Router.navigateTo('staffTaskList');
      }
    } else {
      console.log("Router: page=login (default)");
      Router.navigateTo('login');
    }
  },
  
  basicPage: function(page) {
    console.log("Router: page=" + page);
    this.pageExists(page) && Template[page].render();
  },
  
  actionPage: function(page, action) {
    console.log("Router: page=" + page + " action=" + action);
    this.actionExists(page, action) && Template[page][action]().render();
  },
  
  actionParamsPage: function(page, action, params) {
    var hashes = params.split('&'), params = {};
    _(hashes).each(function(hash) {
      var h = hash.split('=');
      params[h[0]] = h[1];
    });
    console.log("Router: page=" + page + " action=" + action + " params=(see below)");
    console.log(params);
    this.actionExists(page, action) && Template[page][action](params).render();
  },
  
  navigateTo: function(page) {
    console.log('Router: about to navigate to: ' + page);
    this.navigate(page, { trigger: true });
  }
});