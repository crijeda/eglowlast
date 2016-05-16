Template.users.rendered = function() {

};


if (Meteor.isClient) {

Template.ButtonShowUsers.events({
    'click .edit': function () {
// alert(this._id);
window.location = Router.url('users')+'/'+ this._id;

},
})};

Template.ShowProfile.events({
  'click .remove': function () {
    Meteor.users.remove(this._id);
    // alert(this._id);
    Router.go('users');
    
  },
     'click .cancel': function () {
    // alert(this._id);
    Router.go('users');
    
  }
});

Template.ShowProfile.helpers({

schema: function () {
        return Schema.createUserFormSchema;
    },
    RolesOptions: function () {
        return {
            "Admin": "Admin",
            "Influencer": "Influenciador",
            "Business": "Empresa"
        }
    }

});


Template.users.helpers({

    schema: function () {
        return Schema.createUserFormSchema;
    },
    RolesOptions: function () {
        return {
            "Admin": "Admin",
            "Influencer": "Influenciador",
            "Business": "Empresa"
        }
    }

});

// Template.ShowProfile.helpers({

//     schema: function () {
//         return Schema.createUserFormSchema;
//     }

// });


Template.login.events({

    'click .tw-login': function ( event, template ) {
        
        Meteor.loginWithTwitter(function(error){
            if(error){
                Router.go('login');

            } else {

                Router.go("home");
                var profile = Profile.find({userId:Meteor.userId()}).fetch();
                if(profile.length == 0){
                 Modal.show('exampleModal');   
                }
                
                var user = Meteor.users.find({_id:Meteor.userId()}).fetch();
                var screenname = user[0].services.twitter.screenName;
                var datatwitter = DataTwitter.find({screenname: screenname}).fetch();
                // var screenname2 = user[0].services.instagram.username;
                // var datainstagram = DataInstagram.find({screenname: screenname2}).fetch();

                if(screenname.length > 0 && datatwitter.length == 0){

                    Meteor.call('twregister');
                    alert('User Register Successfull');
                    Meteor.call('createTwitterData');

                }

                // if (datainstagram.length > 0){

                    
                //     Meteor.call('sincInstagram');
                //     Meteor.call('sincInstagramHistorical');
                //     Meteor.call('sincInstagramCommunity');

                  
                // }

                if (datatwitter.length > 0){

                    
                  Meteor.call('sincTwitter');
                  Meteor.call('sincTwitterHistorical');
                  Meteor.call('sincTwitterCommunity');

                }

            }
        });

    },
       'click .insta-login': function ( event, template ) {
        
       Meteor.loginWithInstagram(function (err) {
          if (err) {
            console.log('login failed', err);
            Router.go('login');
          } else {

                Router.go("home");
                var user = Meteor.users.find({_id:Meteor.userId()}).fetch();
                var screenname = user[0].services.instagram.username;
                var datainstagram = DataInstagram.find({screenname: screenname}).fetch();
                // var screenname2 = user[0].services.twitter.screenName;
                // var datatwitter = DataTwitter.find({screenname: screenname2}).fetch();

                // alert(screenname.length);
                // alert (datainstagram.length);

                if(screenname.length > 0 && datainstagram.length == 0){

                    Meteor.call('instaregister');
                    alert('User Register Successfull');
                    Meteor.call('createInstagramData');

                }

                 if (datainstagram.length > 0){

                    
                    Meteor.call('sincInstagram');
                    Meteor.call('sincInstagramHistorical');
                    Meteor.call('sincInstagramCommunity');

                  
                }

                // if (datatwitter.length > 0){

                    
                //   Meteor.call('sincTwitter');
                //   Meteor.call('sincTwitterHistorical');
                //   Meteor.call('sincTwitterCommunity');

                // }
 
            }
      });

    },
    'submit form': function(event){
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();


        Meteor.loginWithPassword(email, password, function(error){
            if(error){
                Router.go('loginf');

            } else {
                Router.go("home");
                // Meteor.call('sincTwitter');
            }
        });
    }
});
Template.loginf.events({
    
    'click .tw-login': function ( event, template ) {
        
        Meteor.loginWithTwitter(function(error){
            if(error){
                Router.go('login');

            } else {

                Router.go("home");
            }
        });

    },
    'submit form': function(event){
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();

        Meteor.loginWithPassword(email, password, function(error){
            if(error){
                Router.go('loginf');

            } else {
                Router.go("home");
                Meteor.call('sincTwitter');
            }
        });
    }
});

Template.loginbrand.events({

    'click .tw-login': function ( event, template ) {
        
        Meteor.loginWithTwitter(function(error){
            if(error){
                Router.go('login');

            } else {

                Router.go("home");
                var profile = Profile.find({userId:Meteor.userId()}).fetch();
                if(profile.length == 0){
                 Modal.show('exampleModal');   
                }
                
                var user = Meteor.users.find({_id:Meteor.userId()}).fetch();
                var screenname = user[0].services.twitter.screenName;
                var datatwitter = DataTwitter.find({screenname: screenname}).fetch();
                // var screenname2 = user[0].services.instagram.username;
                // var datainstagram = DataInstagram.find({screenname: screenname2}).fetch();

                if(screenname.length > 0 && datatwitter.length == 0){

                    Meteor.call('twregister');
                    alert('User Register Successfull');
                    Meteor.call('createTwitterData');

                }

                // if (datainstagram.length > 0){

                    
                //     Meteor.call('sincInstagram');
                //     Meteor.call('sincInstagramHistorical');
                //     Meteor.call('sincInstagramCommunity');

                  
                // }

                if (datatwitter.length > 0){

                    
                  Meteor.call('sincTwitter');
                  Meteor.call('sincTwitterHistorical');
                  Meteor.call('sincTwitterCommunity');

                }

            }
        });

    },
       'click .insta-login': function ( event, template ) {
        
       Meteor.loginWithInstagram(function (err) {
          if (err) {
            console.log('login failed', err);
            Router.go('login');
          } else {

                Router.go("home");
                var user = Meteor.users.find({_id:Meteor.userId()}).fetch();
                var screenname = user[0].services.instagram.username;
                var datainstagram = DataInstagram.find({screenname: screenname}).fetch();
                // var screenname2 = user[0].services.twitter.screenName;
                // var datatwitter = DataTwitter.find({screenname: screenname2}).fetch();

                // alert(screenname.length);
                // alert (datainstagram.length);

                if(screenname.length > 0 && datainstagram.length == 0){

                    Meteor.call('instaregister');
                    alert('User Register Successfull');
                    Meteor.call('createInstagramData');

                }

                 if (datainstagram.length > 0){

                    
                    Meteor.call('sincInstagram');
                    Meteor.call('sincInstagramHistorical');
                    Meteor.call('sincInstagramCommunity');

                  
                }

                // if (datatwitter.length > 0){

                    
                //   Meteor.call('sincTwitter');
                //   Meteor.call('sincTwitterHistorical');
                //   Meteor.call('sincTwitterCommunity');

                // }
 
            }
      });

    },
    'submit form': function(event){
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();


        Meteor.loginWithPassword(email, password, function(error){
            if(error){
                Router.go('loginf');

            } else {
                Router.go("home");
                // Meteor.call('sincTwitter');
            }
        });
    }
});
