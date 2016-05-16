// if (Meteor.isServer) {
//   Template.RecoverPassword.events({
//     'submit #change-password': function(event, template) {
//       var currentPassword,
//           newPassword,
//           newPasswordRepeated;

//       currentPassword = template.find('#current-password');
//       newPassword = template.find('#new-password');
//       newPasswordRepeated = template.find('#new-password-repeated');



//       if (newPassword !== newPasswordRepeated) {
//         template.find('#form-messages').html("The new passwords don't match!");

//         return false;
//       }


//       if (Meteor.isServer) {
//         if (Accounts._resetPasswordToken) {
//           Session.set('resetPasswordToken', Accounts._resetPasswordToken);
//         }

//         Template.RecoverPassword.helpers({
//           resetPassword: function() {
//             return Session.get('resetPasswordToken');
//           }
//         });

//         Template.RecoverPassword.events({
//           'submit #forgot-password': function(event, template) {
//             event.preventDefault();
//             var email = template.find('#user-email'),
//                 message;
//             alert(email);

//             if (email) {

//               Accounts.forgotPassword(email);
//               message = 'Sent a reset password link to ' + email + '.';
//             } else {
//               message = 'Please enter a valid email address.'
//             }


//             template.find('#form-messages').html(message);

//             return false;
//           },
//           'submit #set-new-password': function(event, template) {
//             event.preventDefault();
//             // Proper decoupled validation would be much nicer than this
//             var password = template.find('#new-password').value,
//                 passwordTest = new RegExp("(?=.{6,}).*", "g");


//             if (passwordTest.test(password)) {
//               Accounts.resetPassword(
//                 Session.get('resetPasswordToken'),
//                 password,
//                 function(error) {
//                   if (err) {
//                     template.find('#form-messages').html('There was a problem resetting your password.');
//                   } else {

//                     Session.set('resetPasswordToken', null);
//                   }
//                 });
//             } else {

//               template.find('#form-messages').html('Your password is too weak!');
//             }

//             return false;
//           }
//         });
//       }