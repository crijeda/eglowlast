Template.statsSection.helpers({

	user: function () {
        var user = Meteor.users.find().fetch();
        return user[0]
    },

    datatwitter: function () {
        var profile = Profile.find({userId:Meteor.userId()}).fetch();
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