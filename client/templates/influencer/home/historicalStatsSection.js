//trigger data historica
Template.historicalStatsSection.events({

    'click .connectHistorical': function (event) {
        event.preventDefault();
        var tw = Meteor.user().services.twitter;
        if(tw){
            Meteor.call('sincTwitterHistorical');
        }
        var insta = Meteor.user().services.instagram;
        if(insta){
            Meteor.call('sincInstagramHistorical');
        }
    },

});

Template.historicalStatsSection.helpers({
    from: function () {
       var lastweek = moment().subtract(1, 'month').format("DD-MM-YYYY");
       return lastweek
       
        
    },
    test: function () {
         var data = new Array();
         var screenname = Meteor.user().services.twitter.screenName;
         var datatwitter = DataTwitter.find({screenname:screenname}).fetch();
         var historicaldata = datatwitter[0].profileHistorical[0].HistoricalData;
         // 'external' data
         var len = historicaldata.length;
     
    for (i = 0; i < len; i++) { 
     data.push({
        favorites_count: historicaldata[i].favorites_count,
        followers_count: historicaldata[i].followers_count
    });
    return data 
    }},

       to: function () {
       var today = moment().format("DD-MM-YYYY");
       return today   
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

    //se debe obtener ultima fecha para este
    datatwitter: function () {

        var profile = Profile.find({userId:Meteor.userId()}).fetch();
        // var twitteraccount = profile[0].twitteracccount;
        var screenname = Meteor.user().services.twitter.screenName;
        var datatwitter = DataTwitter.find({screenname:screenname}).fetch();
        return datatwitter[0]
    },
    deltafollowers: function () {

        var profile = Profile.find({userId:Meteor.userId()}).fetch();
        var screenname = Meteor.user().services.twitter.screenName;
        var datatwitter = DataTwitter.find({screenname:screenname}).fetch();
        var historicaldata = datatwitter[0].profileHistorical[0].HistoricalData;
        var len = historicaldata.length-1;
        var first = historicaldata[0].followers_count;
        var last = historicaldata[len].followers_count;
        var delta = last - first;
        if (delta<0){
        return  delta  
        }
        else{
        return "+"+delta
        }
        
    },
    deltafollowing: function () {

        var profile = Profile.find({userId:Meteor.userId()}).fetch();
        var screenname = Meteor.user().services.twitter.screenName;
        var datatwitter = DataTwitter.find({screenname:screenname}).fetch();
        var historicaldata = datatwitter[0].profileHistorical[0].HistoricalData;
        var len = historicaldata.length-1;
        var first = historicaldata[0].friends_count;
        var last = historicaldata[len].friends_count;
        var delta = last - first;
        if (delta<0){
        return  delta  
        }
        else{
        return "+"+delta
        }
        
    },
     deltafavs: function () {

        var profile = Profile.find({userId:Meteor.userId()}).fetch();
        var screenname = Meteor.user().services.twitter.screenName;
        var datatwitter = DataTwitter.find({screenname:screenname}).fetch();
        var historicaldata = datatwitter[0].profileHistorical[0].HistoricalData;
        var len = historicaldata.length-1;
        var first = historicaldata[0].favorites_count;
        var last = historicaldata[len].favorites_count;
        var delta = last - first;
        if (delta<0){
        return  delta  
        }
        else{
        return "+"+delta
        }
        
    },
    deltalisted: function () {

        var profile = Profile.find({userId:Meteor.userId()}).fetch();
        var screenname = Meteor.user().services.twitter.screenName;
        var datatwitter = DataTwitter.find({screenname:screenname}).fetch();
        var historicaldata = datatwitter[0].profileHistorical[0].HistoricalData;
        var len = historicaldata.length-1;
        var first = historicaldata[0].listed_count;
        var last = historicaldata[len].listed_count;
        var delta = last - first;
        if (delta<0){
        return  delta  
        }
        else{
        return "+"+delta
        }
        
    },
      reach: function () {

        var profile = Profile.find({userId:Meteor.userId()}).fetch();
        var screenname = Meteor.user().services.twitter.screenName;
        var datatwitter = DataTwitter.find({screenname:screenname}).fetch();
        var lasttweets = datatwitter[0].profileHistorical[0].LastTweets;
        var len = lasttweets.length-1;
        var sum = 0;
        for (i = 0; i < len; i++) { 
          sum += lasttweets[i].Reach;  
        };

        var avg = sum/len;
        return Math.round(avg, 0)
        
    },
     engagement: function () {

        var profile = Profile.find({userId:Meteor.userId()}).fetch();
        var screenname = Meteor.user().services.twitter.screenName;
        var datatwitter = DataTwitter.find({screenname:screenname}).fetch();
        var lasttweets = datatwitter[0].profileHistorical[0].LastTweets;
        var len = lasttweets.length-1;
        var sum = 0;
        for (i = 0; i < len; i++) { 
          sum += lasttweets[i].Reach;  
        };

        var avg = sum/len;
        var followers = datatwitter[0].profilestatistics[0].qtyfollowers;
        var eng = (avg/followers)-1;
        return Math.round(eng*100)/100
        
    },
    day: function () {

        var profile = Profile.find({userId:Meteor.userId()}).fetch();
        // var twitteraccount = profile[0].twitteracccount;
        var screenname = Meteor.user().services.twitter.screenName;
        var datatwitter = DataTwitter.find({screenname:screenname}).fetch();
        var day = datatwitter[0].profileHistorical[0].BestDayAndHour[0].BestDayOfWeek - 1;
        var week = ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'];
        return week[day]
    },
    hour: function () {

        var profile = Profile.find({userId:Meteor.userId()}).fetch();
        // var twitteraccount = profile[0].twitteracccount;
        var screenname = Meteor.user().services.twitter.screenName;
        var datatwitter = DataTwitter.find({screenname:screenname}).fetch();
        var hour = datatwitter[0].profileHistorical[0].BestDayAndHour[0].BestHour - 1;
        var time = [
                    '01:00',
                    '02:00',
                    '03:00',
                    '04:00',
                    '05:00',
                    '06:00',
                    '07:00',
                    '08:00',
                    '09:00',
                    '10:00',
                    '11:00',
                    '12:00',
                    '13:00',
                    '14:00',
                    '15:00',
                    '16:00',
                    '17:00',
                    '18:00',
                    '19:00',
                    '20:00',
                    '21:00',
                    '22:00',
                    '23:00',
                    '24:00',
                    ];
        return time[hour]
    },
    dayinsta: function () {

        var profile = Profile.find({userId:Meteor.userId()}).fetch();
        // var twitteraccount = profile[0].twitteracccount;
        var screenname = Meteor.user().services.instagram.username;
        var dataintagram = DataInstagram.find({screenname:screenname}).fetch();
        var day = dataintagram[0].profileHistorical[0].BestDayAndHour[0].BestDayOfWeek - 1;
        var week = ['Lunes','Martes','Miercoles','Jueves','Viernes','Sabado','Domingo'];
        return week[day]
    },
    hourinsta: function () {

        var profile = Profile.find({userId:Meteor.userId()}).fetch();
        // var instagramaccount = profile[0].instagramacccount;
        var screenname = Meteor.user().services.instagram.username;
        var datainstagram = DataInstagram.find({screenname:screenname}).fetch();
        var hour = datainstagram[0].profileHistorical[0].BestDayAndHour[0].BestHour - 1;
        var time = [
                    '01:00',
                    '02:00',
                    '03:00',
                    '04:00',
                    '05:00',
                    '06:00',
                    '07:00',
                    '08:00',
                    '09:00',
                    '10:00',
                    '11:00',
                    '12:00',
                    '13:00',
                    '14:00',
                    '15:00',
                    '16:00',
                    '17:00',
                    '18:00',
                    '19:00',
                    '20:00',
                    '21:00',
                    '22:00',
                    '23:00',
                    '24:00',
                    ];
        return time[hour]
    },

    datainstagram: function(){
        var profile = Profile.find({userId:Meteor.userId()}).fetch();
        // var twitteraccount = profile[0].twitteracccount;
        var screenname = Meteor.user().services.instagram.username;
        var datainstagram = DataInstagram.find({screenname:screenname}).fetch();
        return datainstagram[0]
    },
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

});


Template.wordcloudtw.rendered = function() {

 function wordCloud(selector) {

    var fill = d3.scale.linear()
                        .domain([0,1,2,3,4,5,6,10,15,20,100])
                        .range(["#0c0337", "#0c0337", "#0c0337", "#647f8a", "#647f8a", "#647f8a", "#bbb", "#bbb", "#bbb", "#aaa", "#aaa", "#aaa"]);

    //Construct the word cloud's SVG element
    var svg = d3.select(selector).append("svg")
        .attr("width", 500)
        .attr("height", 500)
        .attr("style","margin-left:30%")
        .append("g")
        .attr("transform", "translate(250,250)");


    //Draw the word cloud
    function draw(words) {
        var cloud = svg.selectAll("g text")
                        .data(words, function(d) { return d.text; })

        //Entering words
        cloud.enter()
            .append("text")
            .style("font-family", "Century Gothic")
            .style("fill", function(d, i) { return fill(i); })
            .attr("text-anchor", "middle")
            .attr('font-size', 1)
            .text(function(d) { return d.text; });

        //Entering and existing words
        cloud
            .transition()
                .duration(600)
                .style("font-size", function(d) { return d.size + "px"; })
                .attr("transform", function(d) {
                    return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                })
                .style("fill-opacity", 1);

        //Exiting words
        cloud.exit()
            .transition()
                .duration(200)
                .style('fill-opacity', 1e-6)
                .attr('font-size', 1)
                .remove();
    }


    //Use the module pattern to encapsulate the visualisation code. We'll
    // expose only the parts that need to be public.
    return {

        //Recompute the word cloud for a new set of words. This method will
        // asycnhronously call draw when the layout has been computed.
        //The outside world will need to call this function, so make it part
        // of the wordCloud return value.
        update: function(words) {
            d3.layout.cloud().size([500, 500])
                .words(words)
                .padding(5)
                .rotate(function() { return ~~(Math.random() * 2) * 90; })
                .font("Century Gothic")
                .fontSize(function(d) { return d.size; })
                .on("end", draw)
                .start();
        }
    }

}

//Some sample data - http://en.wikiquote.org/wiki/Opening_lines

        var screenname = Meteor.user().services.twitter.screenName;
         var datatwitter = DataTwitter.find({screenname:screenname}).fetch();
         var wordcloud = datatwitter[0].profileHistorical[0].WordCloud;
         
         var lenwc = wordcloud.length;

             var text="";
            for (i = 0; i < lenwc; i++) { 

              var text = text+" "+wordcloud[i]._word; 
            }
var words = [text]

//Prepare one of the sample sentences by removing punctuation,
// creating an array of words and computing a random size attribute.
function getWords(i) {
    return words[i]
            .replace(/[!\.,:;\?]/g, '')
            .split(' ')
            .map(function(d) {
                return {text: d, size: 10 + Math.random() * 60};
            })
}

//This method tells the word cloud to redraw with a new set of words.
//In reality the new words would probably come from a server request,
// user input or some other source.
function showNewWords(vis, i) {
    i = i || 0;

    vis.update(getWords(i ++ % words.length))
    setTimeout(function() { showNewWords(vis, i + 1)}, 20000)
}

//Create a new instance of the word cloud visualisation.
var myWordCloud = wordCloud('#my_canvas');

//Start cycling through the demo data
showNewWords(myWordCloud);


};

// Template.wordcloudinstagram.rendered = function() {
//     $(document).ready(function(){ 

//         //alert($('.chartbox').width())

//         var tags = new Array();
//          var screenname = Meteor.user().services.instagram.username;
//          var datainstagram = DataInstagram.find({screenname:screenname}).fetch();
//          var wordcloud = datainstagram[0].profileHistorical[0].WordCloud;
//          // 'external' data
//          var len = wordcloud.length;
         
//         for (i = 0; i < len; i++) { 
//             tags.push({
//                 key: wordcloud[i]._word,
//                 value: wordcloud[i]._count
//             });
//         }

//         var fill = d3.scale.category20b();

//         //alert($('.wordcloudInstaDiv').width())
//         var w = $('.wordcloudInstaDiv').width()
//             h = 200;

//         var max,
//                 fontSize;

//         var layout = d3.layout.cloud()
//             .timeInterval(Infinity)
//             .size([w, h])
//             .fontSize(function(d) {
//                 return fontSize(+d.value);
//             })
//             .text(function(d) {
//                 return d.key;
//             })
//             .on("end", draw);

//         var svg = d3.select("#my_canvas2").append("svg")
//             .attr("width", w)
//             .attr("height", h);

//         var vis = svg.append("g").attr("transform", "translate(" + [w >> 1, h >> 1] + ")");

//         update();

//         window.onresize = function(event) {
//             update();
//         };

//         function draw(data, bounds) {
//             //alert($('.wordcloudInstaDiv').width())
//             var w = $('.wordcloudInstaDiv').width()
//                 h = 200;

//             svg.attr("width", w).attr("height", h);

//             scale = bounds ? Math.min(
//                 w / Math.abs(bounds[1].x - w / 2),
//                 w / Math.abs(bounds[0].x - w / 2),
//                 h / Math.abs(bounds[1].y - h / 2),
//                 h / Math.abs(bounds[0].y - h / 2)) / 2 : 1;

//             var text = vis.selectAll("text")
//                 .data(data, function(d) {
//                     return d.text.toLowerCase();
//                 });
//             text.transition()
//                 .duration(1000)
//                 .attr("transform", function(d) {
//                     return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
//                 })
//                 .style("font-size", function(d) {
//                     return d.size + "px";
//                 });
//             text.enter().append("text")
//                 .attr("text-anchor", "middle")
//                 .attr("transform", function(d) {
//                     return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
//                 })
//                 .style("font-size", function(d) {
//                     return d.size + "px";
//                 })
//                 //.style("opacity", 1e-6)
//                 .transition()
//                 .duration(1000)
//                 .style("opacity", 1);
//             text.style("font-family", function(d) {
//                 return d.font;
//             })
//                 .style("fill", function(d) {
//                     return fill(d.text.toLowerCase());
//                 })
//                 .text(function(d) {
//                     return d.text;
//                 });

//             vis.transition().attr("transform", "translate(" + [w >> 1, h >> 1] + ")scale(" + scale + ")");
//         }

//         function update() {
//             layout.font('impact').spiral('archimedean');
//             fontSize = d3.scale['sqrt']().range([10, 100]);
//             if (tags.length){
//                 fontSize.domain([+tags[tags.length - 1].value || 1, +tags[0].value]);
//             }
//             layout.stop().words(tags).start();
//         }


//     }, false);

// };

// Template.historicalStatsSection.wctw = function() {

//      var data = new Array();
//          var screenname = Meteor.user().services.twitter.screenName;
//          var datatwitter = DataTwitter.find({screenname:screenname}).fetch();
//          var wordcloud = datatwitter[0].profileHistorical[0].WordCloud;
//          // 'external' data
//          var len = wordcloud.length;
     
//     for (i = 0; i < len; i++) { 
//      data.push({
//         name: wordcloud[i]._word,
//         y: wordcloud[i]._count,
//         color: '#4e7283'
//     });

//     }

//     return {
//         chart: {
//             plotBackgroundColor: '#ececfb',
//             plotBorderWidth: null,
//             plotShadow: false,
//             type: 'pie'
//         },
//         title: {
//             text: ''
//         },
//         credits: {
//             enabled: false
//         },
//         tooltip: {
//             pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
//         },
//         plotOptions: {
//             pie: {
//                 allowPointSelect: true,
//                 cursor: 'pointer',
//                 dataLabels: {
//                     enabled: true,
//                     format: '<b>{point.name}</b>: {point.percentage:.1f} %',
//                     style: {
//                         color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
//                     }
//                 }
//             }
//         },
//         series: [{
//             name: 'Brands',
//             colorByPoint: true,
//             data: data,
//         }]
//     };
// };
// Template.historicalStatsSection.wcinsta = function() {

//      var data = new Array();
//          var screenname = Meteor.user().services.instagram.username;
//          var datainstagram = DataInstagram.find({screenname:screenname}).fetch();
//          var wordcloud = datainstagram[0].profileHistorical[0].WordCloud;
//          // 'external' data
//          var len = wordcloud.length;
     
//     for (i = 0; i < len; i++) { 
//      data.push({
//         name: wordcloud[i]._word,
//         y: wordcloud[i]._count,
//         color: '#4e7283'
//     });

//     }

//     return {
//         chart: {
//             plotBackgroundColor: '#ececfb',
//             plotBorderWidth: null,
//             plotShadow: false,
//             type: 'pie'
//         },
//         title: {
//             text: ''
//         },
//         credits: {
//             enabled: false
//         },
//         tooltip: {
//             pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
//         },
//         plotOptions: {
//             pie: {
//                 allowPointSelect: true,
//                 cursor: 'pointer',
//                 dataLabels: {
//                     enabled: true,
//                     format: '<b>{point.name}</b>: {point.percentage:.1f} %',
//                     style: {
//                         color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
//                     }
//                 }
//             }
//         },
//         series: [{
//             name: 'Brands',
//             colorByPoint: true,
//             data: data,
//         }]
//     };
// };

Template.historicalStatsSection.twline = function() {

    var data = new Array();
    var data2 = new Array();
    var data3 = new Array();
    var screenname = Meteor.user().services.twitter.screenName;
    var datatwitter = DataTwitter.find({screenname:screenname}).fetch();
    var historicaldata = datatwitter[0].profileHistorical[0].HistoricalData;
    var len = historicaldata.length;


    var lasttweets = datatwitter[0].profileHistorical[0].LastTweets;

    var len2 = lasttweets.length-1;

    response2Dates = _.pluck(lasttweets,'createdAt')

    reachDates = _.map(response2Dates,function(e){
    return e.substring(8, 10) + "/" + e.substring(5, 7) + "/" +  e.substring(0, 4)
    })


     data3.push({
        reach: _.pluck(lasttweets,'Reach'),
        date:reachDates
     });

    responseDates = _.pluck(historicaldata,'Date')

    xAxisDates = _.map(responseDates,function(e){
    return e.substring(8, 10) + "/" + e.substring(5, 7) + "/" +  e.substring(0, 4)
    })
     data.push({
        favorites_count: _.pluck(historicaldata,'followers_count'),
        followers_count: _.pluck(historicaldata,'favorites_count'),
        date:xAxisDates
    });
    for (i = 0; i < len; i++) { 
    if(data[0].date[i]!=data[0].date[i-1] | i==0 ){

        if(_.indexOf(reachDates, data[0].date[i])>0){
            data2.push({
            favorites_count: data[0].favorites_count[i],
            followers_count:data[0].followers_count[i] ,
            reach: data[0].followers_count[i]+ data3[0].reach[_.indexOf(reachDates, data[0].date[i])],
            date:data[0].date[i]
            })

        }else{
            data2.push({
            favorites_count: data[0].favorites_count[i],
            followers_count:data[0].followers_count[i] ,
            reach: data[0].followers_count[i],
            date:data[0].date[i]
            })

        }
     

    };

    }

    // _.uniq(data[0].date)
    
    dataSeries = [
            {
                name: 'Followers',
                color: '#4e7283',
                // data: [12, 15, 25, 27, 10, 6, 5]
                data: _.pluck(data2,'followers_count')

            },{
                name: 'Reach',
                color: 'white',
                // data: [12, 15, 25, 27, 10, 6, 5]
                data: _.pluck(data2,'reach')

            }, 

            // {
            //     name: 'Favorites',
            //     color: '#4e7283',
            //     data: _.pluck(data2,'favorites_count')
            // }
        ];

    // responseDates = _.pluck(historicaldata,'Date')

    // xAxisDates = _.map(responseDates,function(e){
    //     return e.substring(8, 10) + "/" + e.substring(5, 7) + "/" +  e.substring(0, 4)
    // })

    return {
       
        title: {
            text: '',
            x: -20 //center
        },
        credits: {
            enabled: false
        },
        subtitle: {
            text: '',
            x: -20
        },
        xAxis: {
            categories: _.pluck(data2,'date'),
            gridLineWidth: 0,
        },
        yAxis: {
            title: {
                text: ''
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: ''
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: dataSeries
    };
};