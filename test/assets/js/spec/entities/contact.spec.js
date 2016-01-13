/*global
ContactManager,
sinon,
$
*/
describe("Contact entity", function () {
  describe("Model", function () {
    describe("Default values", function () {
      before(function () {
        this.contact = new ContactManager.Entities.Contact();
      });
      after(function () {
        delete this.contact;
      });
      it("sets a default value of '' for firstName", function () {
        expect(this.contact.get("firstName")).to.equal("");
      });
      it("sets a default value of '' for lastName", function () {
        expect(this.contact.get("lastName")).to.equal("");
      });
      it("sets a default value of '' for phoneNumber", function () {
        expect(this.contact.get("phoneNumber")).to.equal("");
      });
    });
    describe("Validations", function () {
      beforeEach(function () {
        this.contact = new ContactManager.Entities.Contact({
          firstName: "John",
          lastName: "Doe",
          phoneNumber: "123-456-7890"
        });
      });
      afterEach(function () {
        delete this.contact;
      });
      it("accepts models with valid data", function () {
        expect(this.contact.isValid()).to.be.true;
      });
      it("refuses blank first names", function () {
        this.contact.set("firstName", "");
        expect(this.contact.isValid()).to.not.be.true;
      });
      it("refuses blank last names", function () {
        this.contact.set("lastName", "");
        expect(this.contact.isValid()).to.not.be.true;
      });
      it("refuses last names shorter than 2 characters", function () {
        this.contact.set("lastName", "A");
        expect(this.contact.isValid()).to.not.be.true;
      });
    });
  });
  describe("Collection", function () {
    before(function () {
      this.contacts = new ContactManager.Entities.ContactCollection();
    });
    after(function () {
      delete this.contacts;
    });
    it("is for Contact models", function () {
      expect(this.contacts.model).to.equal(ContactManager.Entities.Contact);
    });
    it("sorts models by firstName", function () {
      expect(this.contacts.comparator).to.equal("firstName");
    });
    describe("contact:entities request", function () {
      beforeEach(function () {
        var contact = new ContactManager.Entities.Contact();
        this.contactArray = [ contact ];
        sinon.stub(ContactManager.Entities, "ContactCollection")
        .returns(this.contacts);
      });
      afterEach(function () {
        delete this.contactArray;
        ContactManager.Entities.ContactCollection.restore();
      });

      it("fetches the collection of existing models",
      sinon.test(function (done) {
        var self = this;
        this.stub(this.contacts, "fetch", function (options) {
          return options.success(self.contactArray);
        });

        var fetchingContacts = ContactManager.request("contact:entities");
        $.when(fetchingContacts).done(function (fetchedContacts) {
          expect(self.contacts.fetch).to.have.been.called.once;
          expect(fetchedContacts).to.equal(self.contactArray);
          done();
        });
      }));
      it.only("creates new models if none exist, then returns them",
      sinon.test(function (done) {
        this.stub(this.contacts, "fetch", function (options) {
          return options.success([]);
        });
        this.stub(ContactManager.Entities, "_initializeContacts")
        .returns(this.contactArray);
        this.spy(this.contacts, "reset");

        var fetchingContacts = ContactManager.request("contact:entities");
        var self = this;
        $.when(fetchingContacts).done(function (fetchedContacts) {
          expect(ContactManager.Entities._initializeContacts)
          .to.have.been.called.once;
          expect(self.contacts.reset).to.have.been.calledWith(self.contactArray);
          done();
        });
      }));
    });
  });
});
