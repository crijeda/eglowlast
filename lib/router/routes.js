// Router.route('/', {
//   name: 'home',
//   layoutTemplate: 'publicLayout'
// });

// Router.route('/dashboard', {
//   name: 'dashboard'
// });
Router.onBeforeAction(function () {
    if (!Meteor.user() && !Meteor.loggingIn()) {
        Router.go('login');
    } else {
        // required by Iron to process the route handler
        this.next();
    }
}, {
    except: ['login','loginbrand','loginf','users']
}); 

Router.route('/', {
  name: 'home'
});
Router.route('/influencer', {
  name: 'influencer'
});

//INFLUENCER
// Router.route('/influencer/preferences', {
//   name: 'influencer/preferences',
//   layoutTemplate: 'appLayout'
// });
Router.route('/influencer/preferences/:_id', function () {
  var item = Profile.findOne({userId: this.params._id});
  this.render('influencerPreferences', {data: item});
  this.layout('appLayout');

});

// Router.route('/influencer/profile', function () {
//   var item = Meteor.users.findOne({_id: this.params._id});
//   this.render('influencerProfile', {data: item});
// });

Router.route('/influencer/profile/:_id', function () {
  var item = Profile.findOne({userId: this.params._id});
  this.render('influencerProfile', {data: item});
  this.layout('appLayout');

});
Router.route('/influencer/billing/:_id', function () {
  var item = Billing.findOne({userId: this.params._id});
  this.render('influencerFacturation', {data: item});
  this.layout('appLayout');

});


// Router.route('/influencer/facturation', {
//   name: 'influencer/facturation',
//   layoutTemplate: 'appLayout'
// });

 Router.route('/influencer/offers', {
 name: 'influencerOffers',
 layoutTemplate: 'appLayout'
});

Router.route('/influencer/campaigns', {
  name: 'influencerCampaigns',
  layoutTemplate: 'appLayout'
});
Router.route('/influencer/campaignshistoric', {
  name: 'influencerCampaignsComplete',
  layoutTemplate: 'appLayout'
});

Router.route('/influencer/messages', {
  name: 'meteorchat',
  layoutTemplate: 'appLayout'
});


Router.route('/influencer/campaigns-record', {
  name: 'influencer/campaignsRecord',
  layoutTemplate: 'appLayout'
});


Router.route('/influencer/visits', {
  name: 'influencer/visits',
  layoutTemplate: 'appLayout'
});

Router.route('/influencer/help', {
  name: 'influencer/help',
  layoutTemplate: 'appLayout'
});

//BUSINESS
Router.route('/business/brands', {
  name: 'business/brands',
  layoutTemplate: 'appLayout'
});

Router.route('/business/facturation', {
  name: 'business/facturation',
  layoutTemplate: 'appLayout'
});

Router.route('/business/services', {
  name: 'business/services',
  layoutTemplate: 'appLayout'
});

Router.route('/business/recommended', {
  name: 'business/recommended',
  layoutTemplate: 'appLayout'
});

Router.route('/business/new-campaign', {
  name: 'business/newCampaign',
  layoutTemplate: 'appLayout'
});

Router.route('/business/campaigns', {
  name: 'business/campaigns',
  layoutTemplate: 'appLayout'
});

Router.route('/business/campaigns-record', {
  name: 'business/campaignsRecord',
  layoutTemplate: 'appLayout'
});

Router.route('/business/help', {
  name: 'business/help',
  layoutTemplate: 'appLayout'
});

//ADMIN
Router.route('/admin/accounts', {
  name: 'users'
});

Router.route('/admin/profiles', {
  name: 'profilesadmin',
  layoutTemplate: 'appLayout'
});

Router.route('/admin/brands', {
  name: 'brandsadmin',
  layoutTemplate: 'appLayout'
});

Router.route('/influencer/campaigns/:_id', function () {
  var item = Campaigns.findOne({_id: this.params._id});
  this.render('influencerCampaignsDetail', {data: item});
  this.layout('appLayout');
});

Router.route('/influencer/campaignshistoric/:_id', function () {
  var item = Campaigns.findOne({_id: this.params._id});
  this.render('influencerCampaignsDetailComplete', {data: item});
  this.layout('appLayout');
});

Router.route('/admin/brands/:_id', function () {
  var item = Brands.findOne({_id: this.params._id});
  this.render('ShowBrandsAdmin', {data: item});
  this.layout('appLayout');
});
Router.route('/admin/campaigns', {
  name: 'campaignsadmin',
  layoutTemplate: 'appLayout'
});

Router.route('/admin/campaigns/:_id', function () {
  var item = Campaigns.findOne({_id: this.params._id});
  this.render('ShowCampaignsAdmin', {data: item});
  this.layout('appLayout');
});
Router.route('/admin/profiles/:_id', function () {
  var item = Profile.findOne({_id: this.params._id});
  this.render('ShowProfileAdmin', {data: item});
  this.layout('appLayout');
});

Router.route('/admin/accounts/:_id', function () {
  var item = Meteor.users.findOne({_id: this.params._id});
  this.render('ShowProfile', {data: item});
  this.layout('appLayout');
});


// Router.route('/login', {
//   name: 'login'
// });

Router.route('/login', function () {
  // render the Home template with a custom data context
  this.render('login', {data: {title: 'Login'}});
  this.layout('publicLayout');
  
});

Router.route('/loginbrand', function () {
  // render the Home template with a custom data context
  this.render('loginbrand', {data: {title: 'Login'}});
  this.layout('publicLayout');
  
});

// Router.route('/login', function () {
//   this.render('login', {
//     data: function () { return Items.findOne({_id: this.params._id}); }
//   });
// });

Router.route('/loginf', function () {
  // render the Home template with a custom data context
  this.render('loginf', {data: {title: 'Login'}});
  this.layout('publicLayout');
  
});       

// Router.route('/loginf', {
//   name: 'loginf'
// });

// Router.plugin('ensureSignedIn', {
//   only: ['home']
// });
