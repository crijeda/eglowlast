Template.example.rendered = function() {    

  $( document ).ready( function() {
    // init Isotope
    var $container = $('.isotope').isotope({
      itemSelector: '.element-item',
      layoutMode: 'fitRows',
      getSortData: {
        username: '.username',  
        followers: '.followers parseInt',
        retweets: '.retweets parseInt',
        // age: '.age',

        category: '[data-category]',
        weight: function( itemElem ) {
          var weight = $( itemElem ).find('.weight').text();
          return parseFloat( weight.replace( /[\(\)]/g, '') );
        }
      }
    });

    // filter functions 
    var filterFns = {
    // show if number is greater than 50
    // numberGreaterThan50: function() {
    //   var number = $(this).find('.number').text();
    //   return parseInt( number, 10 ) > 50;
    // },

    // show if name ends with -ium
    // ium: function() {
    //   var name = $(this).find('.name').text();
    //   return name.match( /ium$/ );
    // }
    };

    // bind filter button click
    $('#filters').on( 'click', 'button', function() {
      var filterValue = $( this ).attr('data-filter');
      // use filterFn if matches value
      filterValue = filterFns[ filterValue ] || filterValue;
      $container.isotope({ filter: filterValue });
    });

    // bind sort button click
    $('#sorts').on( 'click', 'button', function() {
      var sortByValue = $(this).attr('data-sort-by');
      $container.isotope({ sortBy: sortByValue,
        sortAscending: {
          followers: false,
          retweets: false,
        }
      });
    });

    // change is-checked class on buttons
    $('.button-group').each( function( i, buttonGroup ) {
      var $buttonGroup = $( buttonGroup );
      $buttonGroup.on( 'click', 'button', function() {
        $buttonGroup.find('.is-checked').removeClass('is-checked');
        $( this ).addClass('is-checked');
      });
    });

  });

}

Template.example.helpers({

  // Items: function () {

  //     var items = [

  //       { 
  //         username:"BLONDIE",
  //         twitter:true,
  //         instagram:true,

  //         followers: 816 ,
  //         retweets: 574 ,
  //         bio: "Ganadora de @StartupChile  Co-Founder & CEO de @DIGIREPCL E-Commerce/Digital Expert!",
  //         twitterName:"Camacri",
  //         url: "https://pbs.twimg.com/profile_images/491077197201829888/fQV2RA3o.jpeg",

  //         instagramName:"camacri",
  //         likes:231,

  //         age: 24,

  //         interests:['interes1', "interes2"],
  //         socials:['twitter', "instagram"],
  //       },
  //       { 
  //         username:"KATHY BODIS",
  //         twitter:true,
  //         instagram:false,

  //         followers: 159239,
  //         retweets: 657 ,
          
  //         bio: "Presentadora de TV, Relacionadora Pública, Co-founder & CMO DIGIREP. Snapchat e Instagram: Kathybodis",
  //         twitterName:"kathybodis",
  //         url: "https://pbs.twimg.com/profile_images/705793404312162305/hSpV7Vq6.jpg",

  //         age: 26,

  //         interests:['interes3', "interes4"],
  //         socials:['twitter'],
  //       },
  //       { 
  //         username:"Belu",
  //         twitter:true,
  //         instagram:false,
          
  //         followers: 158 ,
  //         retweets: 600 ,
          
  //         bio: "",
  //         twitterName:"frenchwouldbe",
  //         url: "https://pbs.twimg.com/profile_images/2992886358/19943d57f1090af30adda1dd9c469d19.jpeg",
          
  //         age: 25,

  //         interests:['interes3', "interes4"],
  //         socials:['twitter'],
  //       },


  //     ]

  //     return items
  // },

  ItemsToDisplay: function () {

      var profiles = Profile.find().fetch();

      _.each(profiles, function(profile){

        // var data = DataTwitter.findOne({screenname:profile.twitterAccount});
        var dataTwitter = DataTwitter.findOne({screenname:profile.twitterAccount});

        // profile.username = profile.firstname + " " + profile.lastname

        // profile.data = JSON.stringify(data)
        profile.filters = ' '

        if(profile.twitterAccount){
          profile.filters += 'twitter '
        }

        if(profile.instagramAccount){
          profile.filters += 'instagram '
        }

        if(dataTwitter){
          profile.dataTwitter = dataTwitter.profilestatistics[0]
          profile.image = dataTwitter.profilestatistics[0].profileimage
          profile.image = profile.image.replace('_normal','');
        }
        if(profile.instagramAccount){


       var dataInstagram = DataInstagram.findOne({screenname:profile.instagramAccount});

        // profile.username = profile.firstname + " " + profile.lastname

        // profile.data = JSON.stringify(data)

        if(dataInstagram){
          profile.dataInstagram = dataInstagram.profilestatistics[0]
        }
      }
      })

      return profiles
  },

});