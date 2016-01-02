/*jslint laxbreak: true */
ContactManager.module("HeaderApp.List", function(List, ContactManager,
    Backbone, Marionette, $, _){

        List.Controller = {
            listHeader: function() {
                var links = ContactManager.request("header:entities");
                var headers = new List.Headers({ collection:links });

                headers.on("brand:clicked", function() {
                    ContactManager.trigger("contacts:list");
                });

                headers.on("childview:navigate", function(childView, model) {
                    var trigger = model.get("navigationTrigger");
                    ContactManager.trigger(trigger);
                });

                ContactManager.regions.header.show(headers);
            }
        };
    });