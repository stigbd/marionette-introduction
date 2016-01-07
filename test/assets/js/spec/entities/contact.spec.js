/*global
ContactManager
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
  });
});
