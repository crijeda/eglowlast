Template.campaignsadmin.rendered = function() {

};


if (Meteor.isClient) {
Meteor.subscribe("campaigns");

Template.ButtonShowCampaigns.events({
    'click .edit': function () {
// alert(this._id);
window.location = Router.url('campaignsadmin')+'/'+ this._id;

},
});


};

Template.ShowCampaignsAdmin.events({
  'click .remove': function () {
    Campaigns.remove(this._id);
    // alert(this._id);
    Router.go('campaignsadmin');
    
  },
     'click .cancel': function () {
    // alert(this._id);
    Router.go('campaignsadmin');
    
  }
});


