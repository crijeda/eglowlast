Meteor.publishComposite("profile", function() {
  return {
    find: function() {
      return Profile.find({});
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



