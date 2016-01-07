/*global
ContactManager
*/
ContactManager.module("AboutApp", function (AboutApp, ContactManager,
  Backbone, Marionette, $, _) {
  AboutApp.Router = Marionette.AppRouter.extend({
    appRoutes: {
      "about": "showAbout"
    }
  });
  var API = {
    showAbout: function () {
      AboutApp.Show.Controller.showAbout();
    }
  };
  ContactManager.on("about:show", function () {
    ContactManager.navigate("about");
    API.showAbout();
  });

  AboutApp.on("start", function () {
    /* eslint-disable no-new */
    new AboutApp.Router({
      controller: API
    });
  });
});
