Meteor.methods({
  'createUser2' : function(doc) {

    check(doc, Schema.createUserFormSchema);
    // `doc` will contains the field who are in the `Schema.createUserFormSchema`
    var newUser = Accounts.createUser({username: doc.username,
        email: doc.email,
        password: doc.password});
    Meteor.users.update(newUser, {$set: {roles: doc.roles, phone: doc.phone}});
  },
  'updateUser2' : function(doc) {

    check(doc, Schema.createUserFormSchema);
    // `doc` will contains the field who are in the `Schema.createUserFormSchema`
    var User = Meteor.userId();
 
    Meteor.users.update(User, {$set: {username: doc.username}});
  }
});