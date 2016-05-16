
function builtLine(HistoricalData, service) {

    var width = $(".visible-lg").width();

    $(window).resize(function() {
 
       var width = $(".visible-lg").width();

        $(Highcharts.charts).each(function(i,chart){
            chart.setSize(width, 300); 
            
        });   
    });

    responseDates = _.pluck(HistoricalData,'Date')

    xAxisDates = _.map(responseDates,function(e){
        return e.substring(8, 10) + "/" + e.substring(5, 7) + "/" +  e.substring(0, 4)
    })

    if ( service == "Twitter" ){
        dataSeries = [
            {
                name: 'Followers',
                color: '#5BC0DE',
                // data: [12, 15, 25, 27, 10, 6, 5]
                data: _.pluck(HistoricalData,'followers_count')

            }, {
                name: 'Favorites',
                color: '#D9534F',
                data: _.pluck(HistoricalData,'favorites_count')
            }
        ];

        divId = '#container-line-twitter'
    }

    if ( service == "Instagram" ){
        dataSeries = [
            {
                name: 'Followers',
                color: '#5BC0DE',
                // data: [12, 15, 25, 27, 10, 6, 5]
                data: _.pluck(HistoricalData,'followers_count')

            }, {
                name: 'Likes',
                color: '#D9534F',
                data: _.pluck(HistoricalData,'likes_count')
            }
        ];

        divId = '#container-line-instagram'
    }

    $(divId).highcharts({
        
        chart: {
            type: 'line',
            //backgroundColor:null,
            width:width,
            style: {
                color: "#fff"
            },

        },

        legend: {
            itemStyle: {
                color: 'white',
            },
            color: 'white',
        },
        
        title: {
            text: ''
        },
        
        credits: {
            enabled: false
        },
        
        xAxis: {
            categories: xAxisDates,
        },
        
        yAxis: {
            title: {
                text: ''
            }
        },
                
        series: dataSeries

    });
}

/*
 * Call the function to built the chart when the template is rendered
 */
Template.lineHistoricalTwitter.rendered = function() {
    
    var user = Meteor.users.find({_id:Meteor.userId()}).fetch()
    var datatwitter = DataTwitter.find({screenname:user[0].services.twitter.screenName}).fetch();
    var HistoricalData = datatwitter[0].profileHistorical[0].HistoricalData;
    builtLine(HistoricalData,"Twitter");

    $(window).resize();

}

Template.lineHistoricalInstagram.rendered = function() {

    var user = Meteor.users.find({_id:Meteor.userId()}).fetch()
    var dataintagram = DataInstagram.find({screenname:user[0].services.instagram.username}).fetch();
    var HistoricalData = dataintagram[0].profileHistorical[0].HistoricalData;
    builtLine(HistoricalData,"Instagram");

    $(window).resize();

}

Template.basicDemo.rendered = function() {    
    builtBasic();
}

function builtBasic2() {
    $('#container-basic2').highcharts(
        basicChart
    );
}

Template.basicDemo2.rendered = function() {    
    builtBasic2();
}

function builtBasic3() {
    $('#container-basic3').highcharts(
        basicChart
    );
}

Template.basicDemo3.rendered = function() {    
    builtBasic3();
}