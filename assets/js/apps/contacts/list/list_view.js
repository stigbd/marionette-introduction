ContactManager.module("ContactsApp.List", function(List, ContactManager,
Bacbone, Marionette, $, _){
    List.Contact = Marionette.ItemView.extend({
        tagName: "tr",
        template: "#contact-list-item",
        events: {
            "click li": "alertPhoneNumber"
        },

        alertPhoneNumber: function(){
            alert(this.model.escape("phoneNumber"));
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
