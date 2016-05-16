if (Meteor.isClient) {
  // This code only runs on the client
  Meteor.subscribe("users");
  Meteor.subscribe("profile");
  Meteor.subscribe("billing");

}

Template.influencerFacturation.helpers({


    schema: function () {
        return Schema.createUserFormSchema;
    },
    optionsbank: function () {
            return {
            "Banco Crédito e Inversiones":"Banco Crédito e Inversiones", 
            "Banco de Chile":"Banco de Chile", 
            "Banco Estado":"Banco Estado", 
            "Scotiabank":"Scotiabank", 
            "Itaú":"Itaú"}
    },
    optionsaccount: function () {
            return {
            "Cuenta Corriente":"Cuenta Corriente", 
            "Cuenta Vista":"Cuenta Vista", 
            "Cuenta de Ahorrro":"Cuenta de Ahorrro", 
           }
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
    Billing: function() {
    var billing = Billing.find({userId:Meteor.userId()}).fetch();
    return billing
    },

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
Billing.allow({
    insert: function () { return true; },
    update: function () { return true; },
    remove: function () { return true; }
});