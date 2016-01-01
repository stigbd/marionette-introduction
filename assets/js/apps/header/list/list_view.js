ContactManager.module("HeaderApp.List", function(List, ContactManager,
    Bacbone, Marionette, $, _){

        List.Header = Marionette.ItemView.extend({
            template: "#header-link",
            tagName: "li",

            events: {
                "click a": "navigate"
            },

            navigate: function(e) {
                e.preventDefault();
                this.trigger("navigate", this.model);
            }
        });

        List.Headers = Marionette.CompositeView.extend({
            template: "#header-template",
            className: "navbar navbar-inverse navbar-fixed-top",
            childView: List.Header,
            childViewContainer: "ul",

            events: {
                "click a.brand": "brandClicked"
            },

            brandClicked: function(e) {
                e.preventDefault();
                this.trigger("brand:clicked");
            }
        });
    });
