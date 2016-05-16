Meteor.publish('users', function() {
  return [Meteor.users.find()];
});

Meteor.publish("userData", function () {
  if (this.userId) {
    return Meteor.users.find({_id: this.userId},
    	{fields: {'services': 1, 'others': 1}}
    );
  } else {
    this.ready();
  }
});