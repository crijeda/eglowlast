Template.home.rendered = function() {
   
};

Template.home.helpers({
    
    isAdmin: function (name) {
        var role = Meteor.user().roles;
        return role == "Admin"
    },

    isInfluencer: function (name) {
        var role = Meteor.user().roles;
        return role == "Influencer"
    },

    isBusiness: function (name) {
        var role = Meteor.user().roles;
        return role == "Business"
    }

});