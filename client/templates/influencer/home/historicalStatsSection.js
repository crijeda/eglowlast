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

    //se debe obtener ultima fecha para este
    datatwitter: function () {

        var profile = Profile.find({userId:Meteor.userId()}).fetch();
        // var twitteraccount = profile[0].twitteracccount;
        var screenname = Meteor.user().services.twitter.screenName;
        var datatwitter = DataTwitter.find({screenname:screenname}).fetch();
        return datatwitter[0]
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
    $(document).ready(function(){ 

        var tags = new Array();
        var screenname = Meteor.user().services.twitter.screenName;
        var datatwitter = DataTwitter.find({screenname:screenname}).fetch();
        var wordcloud = datatwitter[0].profileHistorical[0].WordCloud;
        // 'external' data
        var len = wordcloud.length;
         
        for (i = 0; i < len; i++) { 
            tags.push({
                key: wordcloud[i]._word,
                value: wordcloud[i]._count
            });
        }

        // console.log(tags)

        var fill = d3.scale.category20b();

        //var w = window.innerWidth*0.8
        var w = $('.wordcloudTwDiv').width()
        var h = 200;

        var max, fontSize;
            
        var layout = d3.layout.cloud()
            .timeInterval(Infinity)
            .size([w, h])
            .fontSize(function(d) {
                return fontSize(+d.value);
            })
            .text(function(d) {
                return d.key;
            })
            .on("end", draw);

        var svg = d3.select("#my_canvas").append("svg")
            .attr("width", w)
            .attr("height", h);

        var vis = svg.append("g").attr("transform", "translate(" + [w >> 1, h >> 1] + ")");

        update();

        window.onresize = function(event) {
            update();
        };

        function draw(data, bounds) {
            var w = $('.wordcloudTwDiv').width()
                h = 200;

            svg.attr("width", w).attr("height", h);

            scale = bounds ? Math.min(
                w / Math.abs(bounds[1].x - w / 2),
                w / Math.abs(bounds[0].x - w / 2),
                h / Math.abs(bounds[1].y - h / 2),
                h / Math.abs(bounds[0].y - h / 2)) / 2 : 1;

            var text = vis.selectAll("text")
                .data(data, function(d) {
                    return d.text.toLowerCase();
                });
            text.transition()
                .duration(1000)
                .attr("transform", function(d) {
                    return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                })
                .style("font-size", function(d) {
                    return d.size + "px";
                });
            text.enter().append("text")
                .attr("text-anchor", "middle")
                .attr("transform", function(d) {
                    return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                })
                .style("font-size", function(d) {
                    return d.size + "px";
                })
                //.style("opacity", 1e-6)
                .transition()
                .duration(1000)
                .style("opacity", 1);
            text.style("font-family", function(d) {
                return d.font;
            })
                .style("fill", function(d) {
                    return fill(d.text.toLowerCase());
                })
                .text(function(d) {
                    return d.text;
                });

            vis.transition().attr("transform", "translate(" + [w >> 1, h >> 1] + ")scale(" + scale + ")");
        }

        function update() {
            layout.font('impact').spiral('archimedean');
            fontSize = d3.scale['sqrt']().range([10, 100]);
            if (tags.length){
                fontSize.domain([+tags[tags.length - 1].value || 1, +tags[0].value]);
            }
            layout.stop().words(tags).start();
        }


    }, false);

};

Template.wordcloudinstagram.rendered = function() {
    $(document).ready(function(){ 

        //alert($('.chartbox').width())

        var tags = new Array();
         var screenname = Meteor.user().services.instagram.username;
         var datainstagram = DataInstagram.find({screenname:screenname}).fetch();
         var wordcloud = datainstagram[0].profileHistorical[0].WordCloud;
         // 'external' data
         var len = wordcloud.length;
         
        for (i = 0; i < len; i++) { 
            tags.push({
                key: wordcloud[i]._word,
                value: wordcloud[i]._count
            });
        }

        var fill = d3.scale.category20b();

        //alert($('.wordcloudInstaDiv').width())
        var w = $('.wordcloudInstaDiv').width()
            h = 200;

        var max,
                fontSize;

        var layout = d3.layout.cloud()
            .timeInterval(Infinity)
            .size([w, h])
            .fontSize(function(d) {
                return fontSize(+d.value);
            })
            .text(function(d) {
                return d.key;
            })
            .on("end", draw);

        var svg = d3.select("#my_canvas2").append("svg")
            .attr("width", w)
            .attr("height", h);

        var vis = svg.append("g").attr("transform", "translate(" + [w >> 1, h >> 1] + ")");

        update();

        window.onresize = function(event) {
            update();
        };

        function draw(data, bounds) {
            //alert($('.wordcloudInstaDiv').width())
            var w = $('.wordcloudInstaDiv').width()
                h = 200;

            svg.attr("width", w).attr("height", h);

            scale = bounds ? Math.min(
                w / Math.abs(bounds[1].x - w / 2),
                w / Math.abs(bounds[0].x - w / 2),
                h / Math.abs(bounds[1].y - h / 2),
                h / Math.abs(bounds[0].y - h / 2)) / 2 : 1;

            var text = vis.selectAll("text")
                .data(data, function(d) {
                    return d.text.toLowerCase();
                });
            text.transition()
                .duration(1000)
                .attr("transform", function(d) {
                    return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                })
                .style("font-size", function(d) {
                    return d.size + "px";
                });
            text.enter().append("text")
                .attr("text-anchor", "middle")
                .attr("transform", function(d) {
                    return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                })
                .style("font-size", function(d) {
                    return d.size + "px";
                })
                //.style("opacity", 1e-6)
                .transition()
                .duration(1000)
                .style("opacity", 1);
            text.style("font-family", function(d) {
                return d.font;
            })
                .style("fill", function(d) {
                    return fill(d.text.toLowerCase());
                })
                .text(function(d) {
                    return d.text;
                });

            vis.transition().attr("transform", "translate(" + [w >> 1, h >> 1] + ")scale(" + scale + ")");
        }

        function update() {
            layout.font('impact').spiral('archimedean');
            fontSize = d3.scale['sqrt']().range([10, 100]);
            if (tags.length){
                fontSize.domain([+tags[tags.length - 1].value || 1, +tags[0].value]);
            }
            layout.stop().words(tags).start();
        }


    }, false);

};

Template.historicalStatsSection.wctw = function() {

     var data = new Array();
         var screenname = Meteor.user().services.twitter.screenName;
         var datatwitter = DataTwitter.find({screenname:screenname}).fetch();
         var wordcloud = datatwitter[0].profileHistorical[0].WordCloud;
         // 'external' data
         var len = wordcloud.length;
     
    for (i = 0; i < len; i++) { 
     data.push({
        name: wordcloud[i]._word,
        y: wordcloud[i]._count,
        color: '#009999'
    });

    }

    return {
        chart: {
            plotBackgroundColor: '#ececfb',
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: ''
        },
        credits: {
            enabled: false
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
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
        series: [{
            name: 'Brands',
            colorByPoint: true,
            data: data,
        }]
    };
};
Template.historicalStatsSection.wcinsta = function() {

     var data = new Array();
         var screenname = Meteor.user().services.instagram.username;
         var datainstagram = DataInstagram.find({screenname:screenname}).fetch();
         var wordcloud = datainstagram[0].profileHistorical[0].WordCloud;
         // 'external' data
         var len = wordcloud.length;
     
    for (i = 0; i < len; i++) { 
     data.push({
        name: wordcloud[i]._word,
        y: wordcloud[i]._count,
        color: '#009999'
    });

    }

    return {
        chart: {
            plotBackgroundColor: '#ececfb',
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: ''
        },
        credits: {
            enabled: false
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
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
        series: [{
            name: 'Brands',
            colorByPoint: true,
            data: data,
        }]
    };
};

Template.historicalStatsSection.twline = function() {

       var data = new Array();
         var screenname = Meteor.user().services.twitter.screenName;
         var datatwitter = DataTwitter.find({screenname:screenname}).fetch();
         var historicaldata = datatwitter[0].profileHistorical[0].HistoricalData;
         // 'external' data
         var len = historicaldata.length;
     
    for (i = 0; i < len; i++) { 
     data.push({
        favorites_count: historicaldata[i].favorites_count,
        followers_count: historicaldata[i].followers_count,
        date:historicaldata[i].Date
    });
    }
    
    dataSeries = [
            {
                name: 'Followers',
                color: '#000053',
                // data: [12, 15, 25, 27, 10, 6, 5]
                data: _.pluck(historicaldata,'followers_count')

            }, {
                name: 'Favorites',
                color: '#009999',
                data: _.pluck(historicaldata,'favorites_count')
            }
        ];

    responseDates = _.pluck(historicaldata,'Date')

    xAxisDates = _.map(responseDates,function(e){
        return e.substring(8, 10) + "/" + e.substring(5, 7) + "/" +  e.substring(0, 4)
    })

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
            categories: xAxisDates,
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