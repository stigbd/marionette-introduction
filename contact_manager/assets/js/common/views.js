/*global
ContactManager,
Spinner
*/
ContactManager.module("Common.Views", function (Views, ContactManager,
    Backbone, Marionette, $, _) {
  Views.Loading = Marionette.ItemView.extend({
    template: "#loading-view",
    title: "Loading Data",
    message: "Please wait, data is loading.",

    serializeData: function () {
      return {
        title: Marionette.getOption(this, "title"),
        message: Marionette.getOption(this, "message")
      };
    },

    onShow: function () {
      var opts = {
        lines: 13, // the number of lines to draw
        length: 20, // The lenght of each line
        widht: 10, // The line thickness
        radius: 30, // The radius of the inner circle
        corners: 1, // Corner roundess (0..1)
        rotate: 0, // The rotation offsett
        direction: 1, // 1: clockwise, -1: counterclockwise
        color: "#000", // #rgb or #rrggbb
        speed: 1, // Rounds per second
        trail: 60, // Afterglow percentage
        shadow: false, // Whether to render a shadow
        hwaccel: false, // Wether to use hardware acceleration
        className: "spinner", // The CSS class to assign to the spinner
        zIndex: 2e9, // The z-index (defaults to 2000000000)
        top: "230px", // Top position relative to parent in px
        left: "230px" // Left position relative to parent in px
      };
      var el = document.getElementById("spinner");
      new Spinner(opts).spin(el);
    }
  });
});
