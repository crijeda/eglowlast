
if (Meteor.isClient) {
  // This code only runs on the client
  Meteor.subscribe("users");
  Meteor.subscribe("profile");
  Meteor.subscribe("campaigns");
  Meteor.subscribe("brands");

  Meteor.users.allow({
    insert: function () { return true; },
    update: function () { return true; },
    remove: function () { return true; }
});

}


Template.influencerCampaigns.events({

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

        });

    }

});



Template.influencerCampaigns.helpers({

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

    campaigns: function () {
        // var array = [{name:"Hello World"}];
        var campaigns = Campaigns.find({user:Meteor.userId(), complete:false}).fetch();

        var len = campaigns.length;
         
        for (i = 0; i < len; i++) { 

        var brands2 = Brands.find({_id:campaigns[i].brands[0]}).fetch();

        campaigns[i].fileId = brands2[0].fileId;

        };

        return campaigns
    },
    totalprofit: function () {
        // var array = [{name:"Hello World"}];
        var campaigns = Campaigns.find({user:Meteor.userId(), complete:false}).fetch();

        var len = campaigns.length;
        var sum = 0;
         
        for (i = 0; i < len; i++) { 
        var sum = campaigns[i].budget + sum;
        
        };

        return sum
    },
    campaignsactive: function () {
    // var array = [{name:"Hello World"}];
    var campaigns = Campaigns.find({user:Meteor.userId(), complete:false}).fetch();

    return campaigns
    },
    percentcomplete: function () {
    // var array = [{name:"Hello World"}];
    var campaigns = Campaigns.find({_id:this._id}).fetch();

    var total = campaigns[0].posts.length;
    var sum = 0;

    for (i = 0; i < total; i++) { 

    if(campaigns[0].posts[i].status == true){

    var sum = sum + 1;

    }

    };

    var percentcomplete = sum/total;
    var percentcomplete = Math.round(percentcomplete * 100);
    return percentcomplete


    },

});

Template.influencerCampaignsDetail.helpers({

    campaigns: function () {
    // var array = [{name:"Hello World"}];
    var campaigns = Campaigns.find({_id:this._id}).fetch();
    var brands2 = Brands.find({_id:campaigns[0].brands[0]}).fetch();

    campaigns[0].fileId = brands2[0].fileId;

    return campaigns[0]
    },

    posts2: function () {
    // var array = [{name:"Hello World"}];
    var campaigns = Campaigns.find({_id:this._id}).fetch();

    var len = campaigns[0].posts.length;
             
    for (i = 0; i < len; i++) { 

    if(campaigns[0].posts[i].social == "Twitter"){

    campaigns[0].posts[i].social = "twitter-square";

    }

    if(campaigns[0].posts[i].social == "Instagram"){
        
    campaigns[0].posts[i].social = "instagram";

    }

    };



    return campaigns[0].posts
    },
    countposts: function () {
    // var array = [{name:"Hello World"}];
    var campaigns = Campaigns.find({_id:this._id}).fetch();

    return campaigns[0].posts.length;
    },
     percentcomplete: function () {
    // var array = [{name:"Hello World"}];
    var campaigns = Campaigns.find({_id:this._id}).fetch();

    var total = campaigns[0].posts.length;
    var sum = 0;

    for (i = 0; i < total; i++) { 

    if(campaigns[0].posts[i].status == true){

    var sum = sum + 1;

    }

    };

    var percentcomplete = sum/total;
    var percentcomplete = Math.round(percentcomplete * 100);
    return percentcomplete


    },
    totalprofit: function () {
    // var array = [{name:"Hello World"}];
    var campaigns = Campaigns.find({user:Meteor.userId(), complete:false}).fetch();

            var len = campaigns.length;
            var sum = 0;
             
            for (i = 0; i < len; i++) { 
            var sum = campaigns[i].budget + sum;
            
            };

    return sum
    },
    campaignsactive: function () {
    // var array = [{name:"Hello World"}];
    var campaigns = Campaigns.find({user:Meteor.userId(), complete:false}).fetch();

    return campaigns
    },

});


Template.influencerCampaignsComplete.helpers({

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
    campaigns: function () {
    // var array = [{name:"Hello World"}];
    var campaigns = Campaigns.find({user:Meteor.userId(), complete:true}).fetch();

            var len = campaigns.length;
             
            for (i = 0; i < len; i++) { 

            var brands2 = Brands.find({_id:campaigns[i].brands[0]}).fetch();

            campaigns[i].fileId = brands2[0].fileId;
            };

    return campaigns
    },
        totalprofit: function () {
    // var array = [{name:"Hello World"}];
    var campaigns = Campaigns.find({user:Meteor.userId(), complete:true}).fetch();

            var len = campaigns.length;
            var sum = 0;
             
            for (i = 0; i < len; i++) { 
            var sum = campaigns[i].budget + sum;
            
            };

    return sum
    },
    campaignsactive: function () {
    // var array = [{name:"Hello World"}];
    var campaigns = Campaigns.find({user:Meteor.userId(), complete:true}).fetch();

    return campaigns
    },
    percentcomplete: function () {
    // var array = [{name:"Hello World"}];
    var campaigns = Campaigns.find({_id:this._id}).fetch();

    var total = campaigns[0].posts.length;
    var sum = 0;

    for (i = 0; i < total; i++) { 

    if(campaigns[0].posts[i].status == true){

    var sum = sum + 1;

    }

    };

    var percentcomplete = sum/total;
    var percentcomplete = Math.round(percentcomplete * 100);
    return percentcomplete


    },

});

Template.influencerCampaignsDetailComplete.helpers({

    campaigns: function () {
    // var array = [{name:"Hello World"}];
    var campaigns = Campaigns.find({_id:this._id}).fetch();
    var brands2 = Brands.find({_id:campaigns[0].brands[0]}).fetch();

    campaigns[0].fileId = brands2[0].fileId;

    return campaigns[0]
    },

    posts2: function () {
    // var array = [{name:"Hello World"}];
    var campaigns = Campaigns.find({_id:this._id}).fetch();

    var len = campaigns[0].posts.length;
             
    for (i = 0; i < len; i++) { 

    if(campaigns[0].posts[i].social == "Twitter"){

    campaigns[0].posts[i].social = "twitter-square";

    }

    if(campaigns[0].posts[i].social == "Instagram"){
        
    campaigns[0].posts[i].social = "instagram";

    }

    };



    return campaigns[0].posts
    },
    countposts: function () {
    // var array = [{name:"Hello World"}];
    var campaigns = Campaigns.find({_id:this._id}).fetch();

    return campaigns[0].posts.length;
    },
     percentcomplete: function () {
    // var array = [{name:"Hello World"}];
    var campaigns = Campaigns.find({_id:this._id}).fetch();

    var total = campaigns[0].posts.length;
    var sum = 0;

    for (i = 0; i < total; i++) { 

    if(campaigns[0].posts[i].status == true){

    var sum = sum + 1;

    }

    };

    var percentcomplete = sum/total;
    var percentcomplete = Math.round(percentcomplete * 100);
    return percentcomplete


    },
    totalprofit: function () {
    // var array = [{name:"Hello World"}];
    var campaigns = Campaigns.find({user:Meteor.userId(), complete:true}).fetch();

            var len = campaigns.length;
            var sum = 0;
             
            for (i = 0; i < len; i++) { 
            var sum = campaigns[i].budget + sum;
            
            };

    return sum
    },
    campaignsactive: function () {
    // var array = [{name:"Hello World"}];
    var campaigns = Campaigns.find({user:Meteor.userId(), complete:true}).fetch();

    return campaigns
    },

});


Template.influencerOffers.helpers({

    campaigns: function () {
        
        var campaigns = Campaigns.find({user:Meteor.userId(), complete:false}).fetch();

        var len = campaigns.length;
         
        for (i = 0; i < len; i++) { 
            var brands2 = Brands.find({_id:campaigns[i].brands[0]}).fetch();
            campaigns[i].fileId = brands2[0].fileId;
        };

        return campaigns
    },

});