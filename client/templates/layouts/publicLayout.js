Template.publicLayout.rendered = function(){
   $('body').addClass('loginBg');
}

Template.publicLayout.destroyed = function(){
   $('body.loginBg').removeClass('loginBg');
}