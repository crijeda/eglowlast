Template.profilesadmin.rendered = function() {

};


if (Meteor.isClient) {

Template.ButtonShowUsersProfiles.events({
    'click .edit': function () {
// alert(this._id);
window.location = Router.url('profilesadmin')+'/'+ this._id;

},
});

Template.sincTwSoap.events({
    'click .sinctw': function () {
    
    // alert(this.twitterAccount);
    Meteor.call('createTwitterData',this.twitterAccount);


},
});


};

Template.ShowProfileAdmin.events({
  'click .remove': function () {
    Profile.remove(this._id);
    // alert(this._id);
    Router.go('profilesadmin');
    
  },
     'click .cancel': function () {
    // alert(this._id);
    Router.go('profilesadmin');
    
  }
});

// Template.ShowProfileAdmin.helpers({

// schema: function () {
//         return Schema.createUserFormSchema;
//     },
//     RolesOptions: function () {
//         return {
//             "Admin": "Admin",
//             "Influencer": "Influenciador",
//             "Business": "Empresa"
//         }
//     }

// });


// Template.users.helpers({

//     schema: function () {
//         return Schema.createUserFormSchema;
//     },
//     RolesOptions: function () {
//         return {
//             "Admin": "Admin",
//             "Influencer": "Influenciador",
//             "Business": "Empresa"
//         }
//     }

// });


