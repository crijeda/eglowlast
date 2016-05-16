if (Meteor.isClient) {
  // This code only runs on the client
  Meteor.subscribe("users");
  Meteor.subscribe("profile");

}

Template.influencerProfile.helpers({


    schema: function () {
        return Schema.createUserFormSchema;
    },
    RolesOptions: function () {
        return {
            "Admin": "Admin",
            "Influencer": "Influenciador",
            "Business": "Empresa"
        }
    },
    user: function () {

        var user = Meteor.users.find({_id:Meteor.userId()}).fetch();
        return user[0]
    },
     schema: function () {

        var schema = Schema.createUserFormSchema
        return schema
    },
    userid: function () {

        var user = Meteor.userId();
        return user
    },
    profile: function() {
    var profile = Profile.find({userId:Meteor.userId()}).fetch();
    return profile
    },
    s2Opts3: function () {
    return {placeholder: 'Ingresa tu profesión'};
    }

});

Meteor.users.allow({
    insert: function () { return true; },
    update: function () { return true; },
    remove: function () { return true; }
});
Profile.allow({
    insert: function () { return true; },
    update: function () { return true; },
    remove: function () { return true; }
});