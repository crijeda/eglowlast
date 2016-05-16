Meteor.publishComposite("datainstagram", function() {
  return {
    find: function() {
      return DataInstagram.find({});
    }
    // ,
    // children: [
    //   {
    //     find: function(item) {
    //       return [];
    //     }
    //   }
    // ]
  }
});
