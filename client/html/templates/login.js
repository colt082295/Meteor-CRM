Template.login.events({
  'submit #login': function(e, t) {
    e.preventDefault();

    var username = $('#username').val();
    var password = $('#password').val();


Meteor.loginWithPassword(username, password, function(error){
    if(error){
        toastr.error(error.reason);
    } else {
        Router.go("home");
    }
});
    return false;
  },
});