/*global
ContactManager
*/
ContactManager.module("Entities", function (Entities,
  ContactManager, Backbone, Marionette, $, _) {
  Entities.Contact = Backbone.Model.extend({
    urlRoot: "contacts",
    defaults: {
      firstName: "",
      lastName: "",
      phoneNumber: ""
    },

    validate: function (attributes, options) {
      var errors = {};
      if (!attributes.firstName) {
        errors.firstName = "can't be blank";
      }
      if (!attributes.lastName) {
        errors.lastName = "can't be blank";
      } else {
        if (attributes.lastName.length < 2) {
          errors.lastName = "is too short";
        }
      }
      if (!_.isEmpty(errors)) {
        return errors;
      }
    },

    localStorage: new Backbone.LocalStorage("Contacts")
  });

  Entities.ContactCollection = Backbone.Collection.extend({
    url: "contacts",
    model: Entities.Contact,

    comparator: "firstName",
    localStorage: new Backbone.LocalStorage("Contacts")
  });

  Entities._initializeContacts = function () {
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
        lastName: "Tampen"
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
        lastName: "Artsy"
      },
      {
        id: 5,
        firstName: "Alice",
        lastName: "Smith"
      },
      {
        id: 6,
        firstName: "Charlie",
        lastName: "Campell",
        phoneNumber: "555-0129"
      }
    ]);
    contacts.forEach(function (contact) {
      contact.save();
    });
    return contacts.models;
  };

  var API = {
    getContactEntities: function () {
      var contacts = new Entities.ContactCollection();
      var defer = $.Deferred();
      contacts.fetch({
        success: function (data) {
          defer.resolve(data);
        }
      });
      var promise = defer.promise();
      $.when(promise).done(function (fetchedContacts) {
        if (contacts.length === 0) {
                        // if no contacts, create some

          var models = Entities._initializeContacts();
          contacts.reset(models);
        }
      });
      return promise;
    },
    getContactEntity: function (contactId) {
      var contact = new Entities.Contact({id: contactId});
      var defer = $.Deferred();
      setTimeout(function () {
        contact.fetch({
          success: function (data) {
            defer.resolve(data);
          },
          error: function (data) {
            defer.resolve(undefined);
          }
        });
      }, 2000);
      return defer.promise();
    }
  };

  ContactManager.reqres.setHandler("contact:entities", function () {
    return API.getContactEntities();
  });
  ContactManager.reqres.setHandler("contact:entity", function (id) {
    return API.getContactEntity(id);
  });
});
