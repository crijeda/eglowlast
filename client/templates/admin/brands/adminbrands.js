Template.brandsadmin.rendered = function() {

};


if (Meteor.isClient) {
Meteor.subscribe("brands");

Template.ButtonShowBrands.events({
    'click .edit': function () {
// alert(this._id);
window.location = Router.url('brandsadmin')+'/'+ this._id;

},
});


};

Template.ShowBrandsAdmin.events({
  'click .remove': function () {
    Brands.remove(this._id);
    // alert(this._id);
    Router.go('brandsadmin');
    
  },
     'click .cancel': function () {
    // alert(this._id);
    Router.go('brandsadmin');
    
  }
});


