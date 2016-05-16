Meteor.publishComposite("campaigns", function() {
  return {
    find: function() {
      return Campaigns.find({});
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