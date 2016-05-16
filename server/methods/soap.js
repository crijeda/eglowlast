Meteor.methods({
	'sincTwitterCommunity': function(){
        var url = 'http://52.38.21.30/digirepWebService/TwitterWebService.svc?wsdl';
        // var profile = Profile.find({userId:Meteor.userId()}).fetch();
        var dateFrom = moment().subtract(1, 'month').format("YYYY-MM-DDT00:00:00");
        var dateTo = moment().format("YYYY-MM-DDT00:00:00");

		var screenname = Meteor.user().services.twitter.screenName;
		var args = {screenname: screenname, dateFrom: dateFrom, dateTo: dateTo};

		try {

		  var client = Soap.createClient(url);
		  var result = client.GetProfileCommunity(args);
		  var result2 = result.GetProfileCommunityResult;

		  var twid = DataTwitter.find({screenname: screenname}).fetch();

		  var obj = eval ("(" + result2 + ")");
		  var obj2 = eval ("[" + result2 + "]");

		  var data = obj.CommunityStatistics[0];
		  var data2 = obj2[0];
		  // console.log(data2);
		  DataTwitter.update(twid[0]._id, {
	        $set: {profilecommunity:[{QtyFollowersFromCommunity:data.QtyFollowersFromCommunity, 
	        	QtyFollowingFromCommunity:data.QtyFollowingFromCommunity, 
	        	QtyMentionsFromCommunity:data.QtyMentionsFromCommunity,
	        	ImagesFromCommunity:data.ImagesFromCommunity,
	        	VideosFromCommunity:data.VideosFromCommunity,
	        	MusicFromCommunity:data.MusicFromCommunity,
	        	QtyRetweetsFromCommunity:data.QtyRetweetsFromCommunity,
	        	GenderDistribution:data2.GenderDistribution,
	        	TopTenFollowers:data2.TopTenFollowers,
	        	Top10Brands:data2.Top10Brands,
	        	Top10Hashtags:data2.Top10Hashtags,
	        	Professions:data2.Professions,
	        	LocationDistribution:data2.LocationDistribution,
	        	lastupdate: moment().toDate(),

	        }]}
	      });
	        // DataTwitter.update(twid[0]._id, { $push: { GenderDistribution: data2.GenderDistribution }});
			
			console.log("Twitter Community success Synchronization");
		}
		catch (err) {
		  if(err.error === 'soap-creation') {
		    console.log('SOAP Client creation failed');
		  }
		  else if (err.error === 'soap-method') {
		    console.log('SOAP Method call failed');
		  }

		}
    },

    'sincInstagramCommunity': function(){
    	console.log("inside");
        var url = 'http://52.38.21.30/DigiRepWebservice/InstagramService.svc?wsdl';
        // var profile = Profile.find({userId:Meteor.userId()}).fetch();
		
		var dateFrom = moment().subtract(1, 'month').format("YYYY-MM-DDT00:00:00");
        var dateTo = moment().format("YYYY-MM-DDT00:00:00");

		var screenname = Meteor.user().services.instagram.username;
		var args = {screenname: screenname, dateFrom: dateFrom, dateTo: dateTo};

		try {

		  var client = Soap.createClient(url);
		  var result = client.GetProfileCommunity(args);
		  var result2 = result.GetProfileCommunityResult;

		  var instad = DataInstagram.find({screenname: screenname}).fetch();

		  //var obj = eval ("(" + result2 + ")");
		  var obj2 = eval ("[" + result2 + "]");

		  //var data = obj.CommunityStatistics[0];
		  var data2 = obj2[0];
		  console.log(data2);
		  console.log(instad[0]._id);
		  DataInstagram.update(instad[0]._id, {
	        $set: {

	        	profileCommunity:
	        	[
	        		{	lastupdate: moment().toDate(),
	        			QtyUsersFromCommunity:data2.ProfileCommunity[0].QtyUsersFromCommunity,
	        			
	        			QtyFeedsFromCommunity:data2.Table1[0].QtyFeedsFromCommunity,
	        			
	        			QtyFollowersFromCommunity:data2.Table2[0].QtyFollowersFromCommunity,
	        			QtyFollowingFromCommunity:data2.Table2[0].QtyFollowingFromCommunity,
	        			QtyMentionsFromCommunity:data2.Table2[0].QtyMentionsFromCommunity,
	        			ImagesFromCommunity:data2.Table2[0].ImagesFromCommunity,
	        			VideosFromCommunity:data2.Table2[0].VideosFromCommunity,
	        			MusicFromCommunity:data2.Table2[0].MusicFromCommunity,

			        	Top10Brands:data2.Table3,
			        	
			        	Top10Hashtags:data2.Table4,
			        	
			        	TopTenFollowers:data2.Table5,

			        	GenderDistribution:data2.Table6,

			        	Professions:data2.Table8,


	        		}
	        	]
	    	}
	      });
	        // DataTwitter.update(twid[0]._id, { $push: { GenderDistribution: data2.GenderDistribution }});
			
			console.log("Instagram Community Statistics Synchronization success");
		}
		catch (err) {
		  if(err.error === 'soap-creation') {
		    console.log('SOAP Client creation failed');
		  }
		  else if (err.error === 'soap-method') {
		    console.log('SOAP Method call failed');
		  }

		}
    },

    'sincTwitterHistorical': function(){
    	var dateFrom = moment().subtract(1, 'month').format("YYYY-MM-DDT00:00:00");
        var dateTo = moment().format("YYYY-MM-DDT00:00:00");
        var url = 'http://52.38.21.30/digirepWebService/TwitterWebService.svc?wsdl';
        // var profile = Profile.find({userId:Meteor.userId()}).fetch();
		var screenname = Meteor.user().services.twitter.screenName;
		var args = {screenname: screenname, dateFrom: dateFrom, dateTo: dateTo};

		try {

		  var client = Soap.createClient(url);
		  var result = client.GetProfileHistoricalStatistics(args);
		  var result2 = result.GetProfileHistoricalStatisticsResult;

		  var twid = DataTwitter.find({screenname: screenname}).fetch();

		  //var obj = eval ("(" + result2 + ")");
		  var obj2 = eval ("[" + result2 + "]");

		  //var data = obj.CommunityStatistics[0];
		  var data2 = obj2[0];
		  //console.log(data2);
			DataTwitter.update(twid[0]._id, {
				$set: {
					profileHistorical:[
						{
							lastupdate: moment().toDate(),
							HistoricalData:data2.HistoricalData,
							Top10Hashtags:data2.Top10Hashtags,
							WordCloud:data2.WordCloud,
							Top10Brands:data2.Top10Brands,
							LastTweets:data2.LastTweets,
							BestDayAndHour:data2.BestDayAndHour,


						}
					]
				}
			});
			// console.log(obj2)
			console.log("Historical Twitter Data Update");
		}
		catch (err) {
		  if(err.error === 'soap-creation') {
		    console.log('SOAP Client creation failed');
		  }
		  else if (err.error === 'soap-method') {
		    console.log('SOAP Method call failed');
		  }

		}
    },

    'sincInstagramHistorical': function(){
    	var dateFrom = moment().subtract(1, 'month').format("YYYY-MM-DDT00:00:00");
        var dateTo = moment().format("YYYY-MM-DDT00:00:00");
     
        var screenname = Meteor.user().services.instagram.username;
		var args = {username: screenname, dateFrom: dateFrom, dateTo: dateTo};
        var url = 'http://52.38.21.30/DigiRepWebservice/InstagramService.svc?wsdl';
		
        console.log(dateFrom);
        console.log(dateTo);

		try {

		  var client = Soap.createClient(url);
		  var result = client.GetProfileHistoricalStatistics(args);
		  var result2 = result.GetProfileHistoricalStatisticsResult;

		  var instad = DataInstagram.find({screenname: screenname}).fetch();

		  var obj2 = eval ("[" + result2 + "]");

		  var data2 = obj2[0];
		 
			DataInstagram.update(instad[0]._id, {
				$set: {
					profileHistorical:[
						{
							lastupdate: moment().toDate(),
							HistoricalData:data2.ProfileHistoricalStatistics,
							WordCloud:data2.Table2,
							LastPosts:data2.Table4,
							BestDayAndHour:data2.Table5,

						}
					]
				}
			});
			console.log("Historical Instagram Data Update");
		}
		catch (err) {
		  if(err.error === 'soap-creation') {
		    console.log('SOAP Client creation failed');
		  }
		  else if (err.error === 'soap-method') {
		    console.log('SOAP Method call failed');
		  }

		}
    },

    'sincTwitter': function(){
        var url = 'http://52.38.21.30/digirepWebService/TwitterWebService.svc?wsdl';
        // var profile = Profile.find({userId:Meteor.userId()}).fetch();
		var screenname = Meteor.user().services.twitter.screenName;
		var args = {screenname: screenname};

			try {


			  var client = Soap.createClient(url);
			  var result = client.GetProfileStatistics(args);
			  var twid = DataTwitter.find({screenname: screenname}).fetch();

			  result2 = result.GetProfileStatisticsResult;

			  var obj = eval ("(" + result2 + ")");

			  // // console.log(result);
			  var data = obj.ProfileStatistics[0];
			  // console.log(twid[0]._id);

			  DataTwitter.update(twid[0]._id, {
		        $set: {profilestatistics:[{  lastupdate: moment().toDate(), screenname:screenname, name:data.Name, profileimage:data.ProfileImage, profilebio:data.ProfileBio, qtytweets:data.QtyTweets, qtyfollowers:data.QtyFollowers, qtyfollowing:data.QtyFollowing, qtyfavorites:data.QtyFavorites, qtyretweets :data.QtyRetweets, images:data.Images, videos:data.Videos, music:data.Music}]}
		      });
			  // DataTwitter.insert({screenname:"Camacri", profilestatistics:[{"screenname":"Camacri","name":"BLONDIE","profileimage":"http://pbs.twimg.com/profile_images/491077197201829888/fQV2RA3o_normal.jpeg","profilebio":"Ganadora de @StartupChile  Co-Founder & CEO de @DIGIREPCL E-Commerce/Digital Expert!","qtytweets":3011,"qtyfollowers":816,"qtyfollowing":561,"qtyFfavorites":845,"qtyretweets":574,"images":141,"videos":0,"music":0}]})
			  console.log("Successful Twitter Synchronization");
			}
			catch (err) {
			  if(err.error === 'soap-creation') {
			    console.log('SOAP Client creation failed');
			  }
			  else if (err.error === 'soap-method') {
			    console.log('SOAP Method call failed');
			  }

			}
    },
    'createTwitterData': function(passScreenName){
        var url = 'http://52.38.21.30/digirepWebService/TwitterWebService.svc?wsdl';
        // var user = Meteor.users.find().fetch();
           if(passScreenName){
                 var screenname = passScreenName
        }else{
        var screenname = Meteor.user().services.twitter.screenName;
    	}
		var args = {screenname: screenname};
		console.log(screenname)
			try {
			  // var client = Soap.createClient(url);
			  // var result = client.rawUserSearch(args);

			  // result2 = JSON.parse(result.rawUserSearchResult);

			  // // console.log(result2);
			  // var profileimage = result2['ProfileImageUrl'];
			  // // var twid = "mqZTgQXpDdjxkrkFS";

			  // // // var obj = eval ("(" + result2 + ")");
			  // // // console.log(obj.ProfileStatistics[0].Name);

			  // // console.log(profileimage);

			  var client = Soap.createClient(url);
			  var result = client.GetProfileStatistics(args);

			  result2 = result.GetProfileStatisticsResult;

			  var obj = eval ("(" + result2 + ")");

			  // // console.log(result);
			  var data = obj.ProfileStatistics[0];
			  // console.log(twid[0]._id);

			  DataTwitter.insert({screenname:screenname, profilestatistics:[{lastupdate: moment().toDate(), screenname:screenname, name:data.Name, profileimage:data.ProfileImage, profilebio:data.ProfileBio, qtytweets:data.QtyTweets, qtyfollowers:data.QtyFollowers, qtyfollowing:data.QtyFollowing, qtyfavorites:data.QtyFavorites, qtyretweets :data.QtyRetweets, images:data.Images, videos:data.Videos, music:data.Music}]});
			  // DataTwitter.insert({screenname:"Camacri", profilestatistics:[{"screenname":"Camacri","name":"BLONDIE","profileimage":"http://pbs.twimg.com/profile_images/491077197201829888/fQV2RA3o_normal.jpeg","profilebio":"Ganadora de @StartupChile  Co-Founder & CEO de @DIGIREPCL E-Commerce/Digital Expert!","qtytweets":3011,"qtyfollowers":816,"qtyfollowing":561,"qtyFfavorites":845,"qtyretweets":574,"images":141,"videos":0,"music":0}]})
			  console.log("Successful DataTwitter User Creation");
			}
			catch (err) {
			  if(err.error === 'soap-creation') {
			    console.log('SOAP Client creation failed');
			  }
			  else if (err.error === 'soap-method') {
			    console.log('SOAP Method call failed');
			  }

			}
    },
    'sincInstagram': function(){
        var url = 'http://52.38.21.30/DigiRepWebservice/InstagramService.svc?wsdl';
        // var user = Meteor.users.find().fetch();
        var screenname = Meteor.user().services.instagram.username;
		var args = {username: screenname};

			try {
			  // var client = Soap.createClient(url);
			  // var result = client.rawUserSearch(args);

			  // result2 = JSON.parse(result.rawUserSearchResult);

			  // // console.log(result2);
			  // var profileimage = result2['ProfileImageUrl'];
			  // var twid = "mqZTgQXpDdjxkrkFS";

			  // // var obj = eval ("(" + result2 + ")");
			  // // console.log(obj.ProfileStatistics[0].Name);

			  // console.log(profileimage);

			  var client = Soap.createClient(url);
			  var result = client.GetProfileStatistics(args);
			  var instaid = DataInstagram.find({screenname: screenname}).fetch();

			  result2 = result.GetProfileStatisticsResult;

			  var obj = eval ("(" + result2 + ")");

			  // // console.log(result);
			  var data = obj.ProfileStatistics[0];
			  // console.log(instaid[0]._id);

			  DataInstagram.update(instaid[0]._id, {
		        $set: {profilestatistics:[{ lastupdate: moment().toDate(), screenname:screenname, name:data.Name, profileimage:data.ProfileImage, profilebio:data.ProfileBio, qtyfeeds:data.QtyFeeds, qtyfollowers:data.QtyFollowers, qtyfollowing:data.QtyFollowing, qtylikes:data.QtyLikes, images:data.Images, videos:data.Videos, music:data.Music}]}
		      });
			  // DataTwitter.insert({screenname:"Camacri", profilestatistics:[{"screenname":"Camacri","name":"BLONDIE","profileimage":"http://pbs.twimg.com/profile_images/491077197201829888/fQV2RA3o_normal.jpeg","profilebio":"Ganadora de @StartupChile  Co-Founder & CEO de @DIGIREPCL E-Commerce/Digital Expert!","qtytweets":3011,"qtyfollowers":816,"qtyfollowing":561,"qtyFfavorites":845,"qtyretweets":574,"images":141,"videos":0,"music":0}]})
			  console.log("Successful Instagram Synchronization");
			}
			catch (err) {
			  if(err.error === 'soap-creation') {
			    console.log('SOAP Client creation failed');
			  }
			  else if (err.error === 'soap-method') {
			    console.log('SOAP Method call failed');
			  }

			}
    },
    'createInstagramData': function(){
        var url = 'http://52.38.21.30/DigiRepWebservice/InstagramService.svc?wsdl';
        // var user = Meteor.users.find().fetch();
        var screenname = Meteor.user().services.instagram.username;
		var args = {username: screenname};

			try {
			  // var client = Soap.createClient(url);
			  // var result = client.rawUserSearch(args);

			  // result2 = JSON.parse(result.rawUserSearchResult);

			  // // console.log(result2);
			  // var profileimage = result2['ProfileImageUrl'];
			  // var twid = "mqZTgQXpDdjxkrkFS";

			  // // var obj = eval ("(" + result2 + ")");
			  // // console.log(obj.ProfileStatistics[0].Name);

			  // console.log(profileimage);

			  var client = Soap.createClient(url);
			  var result = client.GetProfileStatistics(args);

			  result2 = result.GetProfileStatisticsResult;

			  var obj = eval ("(" + result2 + ")");

			  // // console.log(result);
			  var data = obj.ProfileStatistics[0];
			  // console.log(twid[0]._id);
			  console.log(screenname);

			  DataInstagram.insert({lastupdate: moment().toDate(), screenname:screenname, profilestatistics:[{ screenname:screenname, name:data.Name, profileimage:data.ProfileImage, profilebio:data.ProfileBio, qtyfeeds:data.QtyFeeds, qtyfollowers:data.QtyFollowers, qtyfollowing:data.QtyFollowing, qtylikes:data.QtyLikes, images:data.Images, videos:data.Videos, music:data.Music}]});
			 
			  console.log("Successful DataInstagram User Creation");
			}
			catch (err) {
			  if(err.error === 'soap-creation') {
			    console.log('SOAP Client creation failed');
			  }
			  else if (err.error === 'soap-method') {
			    console.log('SOAP Method call failed');
			  }

			}
    },
    'twregister': function(){
        var url = 'http://52.38.21.30/DigiRepWebservice/TwitterWebService.svc?wsdl';
        // var profile = Profile.find({userId:Meteor.userId()}).fetch();
		
		var oauth_token = Meteor.user().services.twitter.accessToken;
		var oauth_verifier = Meteor.user().services.twitter.accessTokenSecret;
		var userId = Meteor.user().services.twitter.id;
		var screenname = Meteor.user().services.twitter.screenName;


		var args = {oauth_token: oauth_token, oauth_verifier:oauth_verifier,userID:userId,screenname:screenname};

		try {

		  var client = Soap.createClient(url);
		  var result = client.userRegistration(args);

		  console.log("User Registration Successfull");
		}
		catch (err) {
		  if(err.error === 'soap-creation') {
		    console.log('SOAP Client creation failed');
		  }
		  else if (err.error === 'soap-method') {
		    console.log('SOAP Method call failed');
		  }

		}
    },
    'instaregister': function(){
        var url = 'http://52.38.21.30/DigiRepWebservice/InstagramService.svc?wsdl';
        // var profile = Profile.find({userId:Meteor.userId()}).fetch();
		
		var accessToken = Meteor.user().services.instagram.accessToken;
	

		var args = {Instagram_AccessToken: accessToken};

		try {

		  var client = Soap.createClient(url);
		  var result = client.Instagram_RegisterUser(args);

		  console.log("User Registration Successfull");
		}
		catch (err) {
		  if(err.error === 'soap-creation') {
		    console.log('SOAP Client creation failed');
		  }
		  else if (err.error === 'soap-method') {
		    console.log('SOAP Method call failed');
		  }

		}
    },
});