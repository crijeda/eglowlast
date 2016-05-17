
if (Meteor.isClient) {
  // This code only runs on the client
  Meteor.subscribe("users");
  Meteor.subscribe("profile");
  Meteor.subscribe("datatwitter");
  Meteor.subscribe("datainstagram");

  Meteor.users.allow({
    insert: function () { return true; },
    update: function () { return true; },
    remove: function () { return true; }
});

}

// Template.homeInfluencer.onCreated(function() {
//   this.subscribe('users');
// });

Template.myCommunitySection.events({

    'click .instaconnectCommunity': function (event) {
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
                      { $set: {  "services" : { "instagram" : instagram, "twitter" : twitter }}});

                    Meteor.users.remove({_id:Meteor.userId()});


            }
      );
        
    },
    'click .connectCommunity': function (event) {
        event.preventDefault();
        var tw = Meteor.user().services.twitter;
        if(tw){
            Meteor.call('sincTwitterCommunity');
        }
        var insta = Meteor.user().services.instagram;
        if(insta){
            Meteor.call('sincInstagramCommunity');
        }
        
        // if ()
        // Meteor.call('sincTwitterCommunity');
        // console.log("Hello World");
    }

});

// Template.historicalStatsSection.events({

//     'click .twconnectHistorical': function (event) {
//         event.preventDefault();
//         Meteor.call('sincTwitterHistorical');
//         // console.log("Hello World");
//     }

// });



Template.myCommunitySection.helpers({

    activetw: function () {

        var tw = Meteor.user().services.twitter;
        if(tw){
        return "active"
        }
        var insta = Meteor.user().services.instagram;
        if(insta){
        return null
        }
        
    },
     activeinsta: function () {


        var tw = Meteor.user().services.twitter;
        if(tw){
        return null
        }
        var insta = Meteor.user().services.instagram;
        if(insta){
        return "active"
        }
        
    },
       from: function () {
       var lastweek = moment().subtract(1, 'month').format("DD-MM-YYYY");
       return lastweek
       
        
    },
       to: function () {
       var today = moment().format("DD-MM-YYYY");
       return today   
    },


});

Template.twitterCommunity.helpers({

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
    totalgender: function () {

        var profile = Profile.find({userId:Meteor.userId()}).fetch();
        // var twitteraccount = profile[0].twitteracccount;
        var screenname = Meteor.user().services.twitter.screenName;
        var datatwitter = DataTwitter.find({screenname:screenname}).fetch();
        var female = datatwitter[0].profilecommunity[0].GenderDistribution[0].Female;
        var male = datatwitter[0].profilecommunity[0].GenderDistribution[0].Male;
        var totalgender = female + male;
        return totalgender
    },
    percentgender: function () {

        var profile = Profile.find({userId:Meteor.userId()}).fetch();
        // var twitteraccount = profile[0].twitteracccount;
        var screenname = Meteor.user().services.twitter.screenName;
        var datatwitter = DataTwitter.find({screenname:screenname}).fetch();
        var followers = datatwitter[0].profilestatistics[0].qtyfollowers;
        var female = datatwitter[0].profilecommunity[0].GenderDistribution[0].Female;
        var male = datatwitter[0].profilecommunity[0].GenderDistribution[0].Male;
        var percentgender = (female + male)/followers;
        var percentgender = Math.round(percentgender * 100);
        return percentgender
    },
    percentmale: function () {

        var profile = Profile.find({userId:Meteor.userId()}).fetch();
        // var twitteraccount = profile[0].twitteracccount;
        var screenname = Meteor.user().services.twitter.screenName;
        var datatwitter = DataTwitter.find({screenname:screenname}).fetch();
        var female = datatwitter[0].profilecommunity[0].GenderDistribution[0].Female;
        var male = datatwitter[0].profilecommunity[0].GenderDistribution[0].Male;
        var percentmale = male/(male+female);
        var percentmale = Math.round(percentmale * 100);
        return percentmale
    },
    percentfemale: function () {

        var profile = Profile.find({userId:Meteor.userId()}).fetch();
        // var twitteraccount = profile[0].twitteracccount;
        var screenname = Meteor.user().services.twitter.screenName;
        var datatwitter = DataTwitter.find({screenname:screenname}).fetch();
        var female = datatwitter[0].profilecommunity[0].GenderDistribution[0].Female;
        var male = datatwitter[0].profilecommunity[0].GenderDistribution[0].Male;
        var percentfemale = female/(male+female);
        var percentfemale = Math.round(percentfemale * 100);
        return percentfemale
    },
    datainstagram: function () {

        var profile = Profile.find({userId:Meteor.userId()}).fetch();
        var screenname = Meteor.user().services.instagram.username;
        var datainstagram = DataInstagram.find({screenname:screenname}).fetch();
        return datainstagram[0]
    },

});
Template.instagramCommunity.helpers({

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
    totalgender: function () {

        var profile = Profile.find({userId:Meteor.userId()}).fetch();
        // var twitteraccount = profile[0].twitteracccount;
        var screenname = Meteor.user().services.instagram.username;
        var datainstagram = DataInstagram.find({screenname:screenname}).fetch();
        var female = datainstagram[0].profileCommunity[0].GenderDistribution[0].Female;
        var male = datainstagram[0].profileCommunity[0].GenderDistribution[0].Male;
        var totalgender = female + male;
        return totalgender
    },
    percentgender: function () {

        var profile = Profile.find({userId:Meteor.userId()}).fetch();
        // var twitteraccount = profile[0].twitteracccount;
        var screenname = Meteor.user().services.instagram.username;
        var datainstagram = DataInstagram.find({screenname:screenname}).fetch();
        var female = datainstagram[0].profileCommunity[0].GenderDistribution[0].Female;
        var male = datainstagram[0].profileCommunity[0].GenderDistribution[0].Male;
        var followers = datainstagram[0].profilestatistics[0].qtyfollowers;
        var percentgender = (female + male)/followers;
        var percentgender = Math.round(percentgender * 100);
        return percentgender
    },
    percentmale: function () {

        var profile = Profile.find({userId:Meteor.userId()}).fetch();
        // var twitteraccount = profile[0].twitteracccount;
        var screenname = Meteor.user().services.instagram.username;
        var datainstagram = DataInstagram.find({screenname:screenname}).fetch();
        var female = datainstagram[0].profileCommunity[0].GenderDistribution[0].Female;
        var male = datainstagram[0].profileCommunity[0].GenderDistribution[0].Male;
        var percentmale = male/(male+female);
        var percentmale = Math.round(percentmale * 100);
        return percentmale
    },
    percentfemale: function () {

        var profile = Profile.find({userId:Meteor.userId()}).fetch();
        // var twitteraccount = profile[0].twitteracccount;
        var screenname = Meteor.user().services.instagram.username;
        var datainstagram = DataInstagram.find({screenname:screenname}).fetch();
        var female = datainstagram[0].profileCommunity[0].GenderDistribution[0].Female;
        var male = datainstagram[0].profileCommunity[0].GenderDistribution[0].Male;
        var percentfemale = female/(male+female);
        var percentfemale = Math.round(percentfemale * 100);
        return percentfemale
    },
    datainstagram: function () {

        var profile = Profile.find({userId:Meteor.userId()}).fetch();
        var screenname = Meteor.user().services.instagram.username;
        var datainstagram = DataInstagram.find({screenname:screenname}).fetch();
        return datainstagram[0]
    },

});

Template.twitterCommunity.pielocation = function() {

     var profile = Profile.find({userId:Meteor.userId()}).fetch();
     // var twitteraccount = profile[0].twitteracccount;
     var screenname = Meteor.user().services.twitter.screenName;
     var datatwitter = DataTwitter.find({screenname:screenname}).fetch();
     var location = datatwitter[0].profilecommunity[0].LocationDistribution;

    return {
        chart: {
            type: 'bar'
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: _.pluck(location,'Location'),
            color:'transparent',
            title: {
                text: null
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: '',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        tooltip: {
            valueSuffix: ' Personas'
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        legend: {
            enabled:false,
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -40,
            y: 80,
            floating: true,
            borderWidth: 1,
            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
            shadow: true
        },
        credits: {
            enabled: false
        },
        series: [{
            name: 'Personas',
            data: _.pluck(location,'Qty'),
            color: '#4e7283'
        }]

    };
};

Template.twitterCommunity.pieProfesions = function() {

     var profile = Profile.find({userId:Meteor.userId()}).fetch();
     // var twitteraccount = profile[0].twitteracccount;
     var screenname = Meteor.user().services.twitter.screenName;
     var datatwitter = DataTwitter.find({screenname:screenname}).fetch();
     var professions = datatwitter[0].profilecommunity[0].Professions;

        var data = new Array();
     var len = professions.length;
     
    for (i = 0; i < len; i++) { 
     data.push({
        name: professions[i].Profesion,
        y: professions[i].Qty,
        color: '#4e7283',
    });

    }

    return {
chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false
        },
        title: {
            text: '',
            align: 'center',
            verticalAlign: 'middle',
            y: 40
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                center: ['55%', '10%'],
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        credits: {
            enabled: false
        },
        series: [{
            type: 'pie',
            name: 'Personas',
            innerSize: '50%',
            data: data
        }]

    };
};