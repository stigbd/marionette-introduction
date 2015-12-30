ContactManager.module("ContactsApp.List", function(List, ContactManager,
    Backbone, Marionette, $, _){
        List.Controller = {
            listContacts: function(){
                var loadingView = new ContactManager.Common.Views.Loading();
                ContactManager.regions.main.show(loadingView);

                var fetchingContacts =
                ContactManager.request("contact:entities");

                var contactsListLayout = new List.Layout();
                var contactsListPanel = new List.Panel();

                $.when(fetchingContacts).done(function(contacts){

                    var contactsListView = new List.Contacts({
                        collection:contacts
                    });

                    contactsListLayout.on("show", function(){
                        contactsListLayout.panelRegion.show(contactsListPanel);
                        contactsListLayout.contactsRegion.show(contactsListView);
                    });

                    contactsListPanel.on("contact:new", function(){
                        var newContact = new ContactManager.Entities.Contact();

                        var view = new ContactManager.ContactsApp.New.Contact({
                            model: newContact,
                            asModal: true
                        });

                        view.on("form:submit", function(data){
                            // since we don't get the id from a
                            // server, we need to set it:
                            if(contacts.length > 0) {
                                var highestId = contacts.max(function(c) {
                                    return c.id; }
                                ).get("id");
                                data.id = highestId + 1;
                            }
                            else {
                                data.id = 1;
                            }

                            if(newContact.save(data)) {
                                contacts.add(newContact);
                                ContactManager.regions.dialog.empty();
                                contactsListView.children.
                                findByModel(newContact).flash("success");
                            }
                            else {
                                view.triggerMethod("form:data:invalid",
                                newContact.validationError);
                            }
                        });
                        ContactManager.regions.dialog.show(view);
                    });

                    contactsListView.on("childview:contact:show",
                    function(childView, args) {
                        ContactManager.trigger("contact:show", args.model.get("id"));
                    });

                    contactsListView.on("childview:contact:edit",
                    function(childView, args) {
                        var model = args.model;
                        var view = new ContactManager.ContactsApp.Edit.Contact({
                            model: model,
                            asModal: true
                        });


                        view.on("form:submit", function(data) {
                            if(model.save(data)){
                                childView.render();
                                ContactManager.regions.dialog.empty();
                                childView.flash("success");
                            }
                            else {
                                view.triggerMethod("form:data:invalid",
                                model.validationError);
                            }
                        });
                        ContactManager.regions.dialog.show(view);
                    });

                    contactsListView.on("childview:contact:delete",
                    function(childView, args) {
                        args.model.destroy();
                    });


                    ContactManager.regions.main.show(contactsListLayout);
                });
            }
        };
    });
