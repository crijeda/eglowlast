Template.statsSection.helpers({

	user: function () {
        var user = Meteor.users.find().fetch();
        return user[0]
    },
    transnumber: function (x){

    if(x>999 && x<1000000){
        number = x/1000;
        return Math.round( number * 10 )/10 +" K"
    }
    if(x>999999 && x<1000000000){
        number = x/1000000;
        return Math.round( number * 10 )/10 +" M"
    }
    return x
    },
    transnumber2: function (x){

    if(x>999 && x<1000000){
        number = x/1000;
        return Math.round( number* 10 )/10  +"K"
    }
    if(x>999999 && x<1000000000){
        number = x/1000000;
        return Math.round( number) +"M"
    }
    return x
    },

    datatwitter: function () {
        var profile = Profile.find({userId:Meteor.userId()}).fetch();
        var screenname = Meteor.user().services.twitter.screenName;
        var datatwitter = DataTwitter.find({screenname:screenname}).fetch();
        return datatwitter[0]
    },
     writed: function () {
        var profile = Profile.find({userId:Meteor.userId()}).fetch();
        var screenname = Meteor.user().services.twitter.screenName;
        var datatwitter = DataTwitter.find({screenname:screenname}).fetch();
        var images = datatwitter[0].profilestatistics[0].images;
        var videos = datatwitter[0].profilestatistics[0].images;
        var qtytweets = datatwitter[0].profilestatistics[0].qtytweets;
        var text = qtytweets - videos - images;
        return text
        
    },

    datainstagram: function () {
        var profile = Profile.find({userId:Meteor.userId()}).fetch();
        var screenname = Meteor.user().services.instagram.username;
        var datainstagram = DataInstagram.find({screenname:screenname}).fetch();
        return datainstagram[0]
    },

    lastupdatetw: function () {
        var profile = Profile.find({userId:Meteor.userId()}).fetch();
        var screenname = Meteor.user().services.twitter.screenName;
        var datatwitter = DataTwitter.find({screenname:screenname}).fetch();
        var date = datatwitter[0].profilestatistics[0].lastupdate;
        return moment(date).format('DD-MM-YYYY HH:mm');
    },

    lastupdateinsta: function () {
        var profile = Profile.find({userId:Meteor.userId()}).fetch();
        var screenname = Meteor.user().services.instagram.username;
        var datainstagram = DataInstagram.find({screenname:screenname}).fetch();
        var date = datainstagram[0].profilestatistics[0].lastupdate;
        return moment(date).format('DD-MM-YYYY HH:mm');
    },

});