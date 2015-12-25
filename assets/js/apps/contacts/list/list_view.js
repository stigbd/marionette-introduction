ContactManager.module("ContactsApp.List", function(List, ContactManager,
Bacbone, Marionette, $, _){
    List.Contact = Marionette.ItemView.extend({
        tagName: "li",
        template: "#contact-list-item",
        events: {
            "click li": "alertPhoneNumber"
        },

        alertPhoneNumber: function(){
            alert(this.model.escape("phoneNumber"));
        }
    });

    List.Contacts = Marionette.CollectionView.extend({
        tagName: "ul",
        childView: List.Contact
    });
});
