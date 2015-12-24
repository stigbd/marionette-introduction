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
});
