
if (Meteor.isClient) {
  // This code only runs on the client
  Meteor.subscribe("users");
  Meteor.subscribe("profile");
  Meteor.subscribe("datatwitter");
  Meteor.subscribe("datainstagram");
  Meteor.subscribe("brands");

  Meteor.users.allow({
    insert: function () { return true; },
    update: function () { return true; },
    remove: function () { return true; }
});

}


Template.influencerPreferences.events({

    'click .test': function (event) {
         setTimeout(function(){
            Modal.show('exampleModal')
        })
    },
    'click .sincTwitter': function (event) {
        event.preventDefault();
        Meteor.call('sincTwitter');
    },
      'click .sincInstagram': function (event) {
        event.preventDefault();
        Meteor.call('sincInstagram');
    },
    'click .instaconnect': function (event) {
        event.preventDefault();
        var olduserid = Meteor.userId();
        // console.log(olduserid);
        var user1 = Meteor.users.find({_id:Meteor.userId()}).fetch();
        var twitter = user1[0].services.twitter;

        Meteor.loginWithInstagram(function (err) {
          if (err) {
            console.log('login failed', err);

          }
                    var user2 = Meteor.users.find({_id:Meteor.userId()}).fetch();
                    var instagram = user2[0].services.instagram;
                     Meteor.users.update({_id:olduserid},
                      { $set: {  "services" : { "twitter": twitter, "instagram" : instagram }}});
                    console.log(twitter);
                    console.log(instagram);
                    Meteor.users.remove({_id:Meteor.userId()});


            }
      );
        
    },
    'click .twconnect': function (event) {
        event.preventDefault();
        var olduserid = Meteor.userId();
        // console.log(olduserid);
        var user1 = Meteor.users.find({_id:Meteor.userId()}).fetch();
        var instagram = user1[0].services.instagram;

        Meteor.loginWithTwitter(function (err) {
          if (err) {
            console.log('login failed', err);

          }
                    var user2 = Meteor.users.find({_id:Meteor.userId()}).fetch();
                    var twitter = user2[0].services.twitter;
                     Meteor.users.update({_id:olduserid},
                      { $set: {  "services" : { "instagram" : instagram, "twitter" : twitter }}});

                    Meteor.users.remove({_id:Meteor.userId()});


            }
      );
        
    }

});



Template.influencerPreferences.helpers({

    user: function () {

        var user = Meteor.users.find().fetch();
        return user[0]
    },

    profile: function () {

        var profile = Profile.find({userId:Meteor.userId()}).fetch();
        return profile[0]
    },
    screenname2: function () {

        var screenname = user[0].services.twitter.screenName;
        return screenname;
    },
    datatwitter: function () {

        var profile = Profile.find({userId:Meteor.userId()}).fetch();
        // var twitteraccount = profile[0].twitteracccount;
        var screenname = Meteor.user().services.twitter.screenName;
        var datatwitter = DataTwitter.find({screenname:screenname}).fetch();
        return datatwitter[0]
    },
    datainstagram: function () {

        var profile = Profile.find({userId:Meteor.userId()}).fetch();
        var screenname = Meteor.user().services.instagram.username;
        var datainstagram = DataInstagram.find({screenname:screenname}).fetch();
        return datainstagram[0]
    },
     brandsname: function () {
    // var array = [{name:"Hello World"}];
    var profile = Profile.find({userId:Meteor.userId()}).fetch();
    var brands = profile[0].brands;
    var brands2 = Brands.find({name:{$in: brands}}).fetch();
    // var brands2 = Brands.find().fetch();
    var brands2 = _.sortBy(brands2, "name");

    return brands2
    },

});