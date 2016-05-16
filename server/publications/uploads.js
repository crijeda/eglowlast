Meteor.publishComposite("uploads", function() {
  return {
    find: function() {
      return Uploads.find({});
    }
  }
});
