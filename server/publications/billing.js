Meteor.publishComposite("billing", function() {
  return {
    find: function() {
      return Billing.find({});
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



