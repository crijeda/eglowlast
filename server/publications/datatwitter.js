Meteor.publishComposite("datatwitter", function() {
  return {
    find: function() {
      return DataTwitter.find({});
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
