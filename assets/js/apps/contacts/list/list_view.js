ContactManager.module("ContactsApp.List", function(List, ContactManager,
    Bacbone, Marionette, $, _){

        List.Contact = Marionette.ItemView.extend({
            tagName: "tr",
            template: "#contact-list-item",

            events: {
                "click": "highlightName",
                "click li": "alertPhoneNumber",
                "click button.js-delete": "deleteClicked"
            },

            highlightName: function() {
                this.$el.toggleClass("warning");
            },
            alertPhoneNumber: function(){
                alert(this.model.escape("phoneNumber"));
            },
            deleteClicked: function(e){
                e.stopPropagation();
                this.trigger("contact:delete", this.model);
            },

            remove: function(){
                var self = this;
                this.$el.fadeOut(function() {
                    Marionette.ItemView.prototype.remove.call(self);
                });
            }

        });

        List.Contacts = Marionette.CompositeView.extend({
            tagName: "table",
            className: "table table-hover",
            template: "#contact-list",
            childView: List.Contact,
            childViewContainer: "tbody"
        });
    });
