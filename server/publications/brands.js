Meteor.publishComposite("brands", function() {
  return {
    find: function() {
      return Brands.find({});
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



