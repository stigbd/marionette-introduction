ContactManager.module("Entities", function(Entities,
    ContactManager, Backbone, Marionette, $, _) {
        Entities.Contact = Backbone.Model.extend({
            defaults: {
                firstName: "",
                phoneNumber: "No phone number!"
            }
        });

        Entities.ContactCollection = Backbone.Collection.extend({
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
            }
        });

        var contacts;

        var initializeContacts = function() {
            contacts = new Entities.ContactCollection([
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
        };

        var API = {
            getContactEntities: function() {
                if(contacts === undefined) {
                    initializeContacts();
                }
                return contacts;
            }
        };

        ContactManager.reqres.setHandler("contact:entities", function() {
            return API.getContactEntities();
        });
    });
