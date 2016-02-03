/*global
ContactManager
*/
describe("Common.Views.Loading", function () {
  it("displays a spinner in the '#spinner' node");

  describe("serializeData", function () {
    it("serializes default options properly", function () {
      var view = new ContactManager.Common.Views.Loading();
      var serializeData = view.serializeData();
      expect(serializeData.title).to.equal("Loading Data");
      expect(serializeData.message).to.equal("Please wait, data is loading.");
    });
    it("serializes provided options properly", function () {
      var options = {
        title: "Test title",
        message: "Test message"
      };
      var view = new ContactManager.Common.Views.Loading(options);
      var serializeData = view.serializeData();
      expect(serializeData.title).to.equal(options.title);
      expect(serializeData.message).to.equal(options.message);
    });
  });
});
