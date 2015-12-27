ContactManager.module("Entities", function(Entities,
    ContactManager, Backbone, Marionette, $, _) {

        Entities.Contact = Backbone.Model.extend({
            urlRoot: "contacts",
            defaults: {
                phoneNumber: ""
            },
            localStorage: new Backbone.LocalStorage("Contacts")
        });

        Entities.ContactCollection = Backbone.Collection.extend({
            url: "contacts",
            model: Entities.Contact,

            comparator: function(a, b) {
                var aFirstName = a.get("firstName");
                var bFirstName = b.get("firstName");
                if(aFirstName === bFirstName) {
                    var aLastName = a.get("lastName");
                    var bLastName = b.get("lastName");
                    if(aLastName === bLastName) { return 0; }
                    if(aLastName < bLastName) { return -1;}
                    else { return 1;}
                }
                else {
                    if(aFirstName < bFirstName) { return -1; }
                }
            },
            localStorage: new Backbone.LocalStorage("Contacts")
        });


        var initializeContacts = function() {
            var contacts = new Entities.ContactCollection([
                {
                    id: 1,
                    firstName: "Bob",
                    lastName: "Brigham",
                    phoneNumber: "555-0163"
                },
                {
                    id: 2,
                    firstName: "Alice",
                    lastName: "Tampen",
                },
                {
                    id: 3,
                    firstName: "Alice",
                    lastName: "Arten",
                    phoneNumber: "555-0184"
                },
                {
                    id: 4,
                    firstName: "Alice",
                    lastName: "Artsy",
                },
                {
                    id: 5,
                    firstName: "Alice",
                    lastName: "Smith",
                },
                {
                    id: 6,
                    firstName: "Charlie",
                    lastName: "Campell",
                    phoneNumber: "555-0129"
                }
            ]);
            contacts.forEach(function(contact){
                contact.save();
            });
            return contacts;
        };

        var API = {
            getContactEntities: function() {
                var contacts = new Entities.ContactCollection();
                contacts.fetch();
                if(contacts.length === 0) {
                    // if no contacts, create some
                    return initializeContacts();
                }
                return contacts;
            },
            getContactEntity: function(contactId){
                var contact = new Entities.Contact({id: contactId});
                contact.fetch();
                console.log("Fetched contact: ", contact);
                return contact;
            }
        };

        ContactManager.reqres.setHandler("contact:entities", function() {
            return API.getContactEntities();
        });
        ContactManager.reqres.setHandler("contact:entity", function(id) {
            return API.getContactEntity(id);
        });
    });
