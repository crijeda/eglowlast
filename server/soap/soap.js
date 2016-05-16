var url = 'http://server.sisSoftwareFactory.com/digirepWebService/TwitterWebService.svc?wsdl';
var args = {screenname: 'Camacri'};


// try {
//   var client = Soap.createClient(url);
//   var result = client.rawFollowers(args);

//   result2 = JSON.parse(result.rawFollowersResult);

//   console.log(result);
//   console.log(result2);
//   console.log(result2.length);
//   console.log(result2[2]);
// }
// catch (err) {
//   if(err.error === 'soap-creation') {
//     console.log('SOAP Client creation failed');
//   }
//   else if (err.error === 'soap-method') {
//     console.log('SOAP Method call failed');
//   }

// }


// try {
//   var client = Soap.createClient(url);
//   var result = client.GetProfileStatistics(args);

//   result2 = result.GetProfileStatisticsResult;

//   var obj = eval ("(" + result2 + ")");

//   console.log(result);
//   console.log(obj.ProfileStatistics[0].Name);

//   // DataTwitter.insert({screenname:"Camacri", profilestatistics:[{"screenname":"Camacri","name":"BLONDIE","profileimage":"http://pbs.twimg.com/profile_images/491077197201829888/fQV2RA3o_normal.jpeg","profilebio":"Ganadora de @StartupChile  Co-Founder & CEO de @DIGIREPCL E-Commerce/Digital Expert!","qtytweets":3011,"qtyfollowers":816,"qtyfollowing":561,"qtyFfavorites":845,"qtyretweets":574,"images":141,"videos":0,"music":0}]})
	//DataInstagram.insert({screenname:"kathybodis", profilestatistics:[{"screenname":"kathybodis","name":"Kathy Bodis","profileimage":"https://igcdn-photos-f-a.akamaihd.net/hphotos-ak-xaf1/t51.2885-19/s150x150/11371165_552962111518197_543438982_a.jpg","profilebio":"Solo con el 💜 se puede ver bien; Lo esencial es invisible para los ojos. 😉","qtyfeeds":1362,"qtyfollowers":58478,"qtyfollowing":450,"qtylikes":364976,"images":141,"videos":0,"music":0}]})

// }
// catch (err) {
//   if(err.error === 'soap-creation') {
//     console.log('SOAP Client creation failed');
//   }
//   else if (err.error === 'soap-method') {
//     console.log('SOAP Method call failed');
//   }

// }