ContactManager.module("ContactsApp.List", function(List, ContactManager,
    Backbone, Marionette, $, _){
        List.Controller = {
            listContacts: function(){
                var loadingView = new ContactManager.Common.Views.Loading();
                ContactManager.regions.main.show(loadingView);

                var fetchingContacts =
                ContactManager.request("contact:entities");
                $.when(fetchingContacts).done(function(contacts){

                    var contactsListView = new List.Contacts({
                        collection:contacts
                    });

                    contactsListView.on("childview:contact:delete",
                    function(childView, model) {
                        model.destroy();
                    });

                    contactsListView.on("childview:contact:show",
                    function(childView, model) {
                        ContactManager.trigger("contact:show", model.get("id"));
                    });

                    ContactManager.regions.main.show(contactsListView);
                });
            }
        };
    });
