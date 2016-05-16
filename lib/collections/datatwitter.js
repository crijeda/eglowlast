DataTwitter = new Mongo.Collection("DataTwitter");

ProfileStatisticsSchema = new SimpleSchema({
  lastupdate: {
    type: Date,
    optional: true,
  },
  screenname: {
    type: String,
    optional: true,
  },
  name: {
    type: String,
    optional: true,
  },
  profileimage: {
    type: String,
    optional: true,
  },
  profilebio: {
    type: String,
    optional: true,
  },
  qtytweets: {
    type: Number,
    optional: true,
  },
  qtyfollowers: {
    type: Number,
    optional: true,
  },
  qtyfollowing: {
    type: Number,
    optional: true,
  },
  qtyfavorites: {
    type: Number,
    optional: true,
  },
  qtyretweets: {
    type: Number,
    optional: true,
  },
  images: {
    type: Number,
    optional: true,
  },
  videos: {
    type: Number,
    optional: true,
  },
  music: {
    type: Number,
    optional: true,
  },


});
ProfileCommunitySchema = new SimpleSchema({
 lastupdate: {
    type: Date,
    optional: true,
  },
    QtyFollowersFromCommunity: {
    type: Number,
    optional: true,
  },
   QtyFollowingFromCommunity: {
    type: Number,
    optional: true,
  },
    QtyMentionsFromCommunity: {
    type: Number,
    optional: true,
  },
    ImagesFromCommunity: {
    type: Number,
    optional: true,
  },
    VideosFromCommunity: {
    type: Number,
    optional: true,
  },
    MusicFromCommunity: {
    type: Number,
    optional: true,
  },
    QtyRetweetsFromCommunity: {
    type: Number,
    optional: true,
  },
  
  //   Top10Brands: {
  //   type: Array,
  //   optional: true,
  // },
  //   Top10Hashtags: {
  //   type: Array,
  //   optional: true,
  // },
  TopTenFollowers: {
    type: [Object],
    optional: true,
    blackbox: true,
  },
   GenderDistribution: {
    type: [Object],
    optional: true,
    blackbox: true,

  },
  Top10Brands: {
    type: [Object],
    optional: true,
    blackbox: true,
  },
  Top10Hashtags: {
    type: [Object],
    optional: true,
    blackbox: true,
  },
  Professions: {
    type: [Object],
    optional: true,
    blackbox: true,
  },
  LocationDistribution: {
    type: [Object],
    optional: true,
    blackbox: true,

  },
});


ProfileHistoricalSchema = new SimpleSchema({
  lastupdate: {
    type: Date,
    optional: true,
  }, 
  HistoricalData: {
    type: [Object],
    optional: true,
    blackbox: true,
  },

   Top10Hashtags: {
    type: [Object],
    optional: true,
    blackbox: true,

  },

  WordCloud: {
    type: [Object],
    optional: true,
    blackbox: true,

  },

  Top10Brands: {
    type: [Object],
    optional: true,
    blackbox: true,

  },

  LastTweets: {
    type: [Object],
    optional: true,
    blackbox: true,

  },

  BestDayAndHour: {
    type: [Object],
    optional: true,
    blackbox: true,

  },

});



DataTwitter.attachSchema(new SimpleSchema({
  screenname: {
    type: String,
    optional: true,
    label: "TwitterScreenname",
    max: 200
  },
  profilestatistics: {
    optional: true,
    type: [ProfileStatisticsSchema],
    label: 'ProfileStatistics'
  },
  profilecommunity: {
    optional: true,
    type: [ProfileCommunitySchema],
    label: 'profilecommunity'
  },

  profileHistorical: {
    optional: true,
    type: [ProfileHistoricalSchema],
    label: 'profileHistorical'
  },

}));