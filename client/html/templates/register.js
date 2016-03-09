Template.register.helpers({
            client: function() { return Clients.find()} // Get info of currently selected client from the Clients collection
          });
          
          
Template.register.events({
  'submit form': function(event, template) {
    event.preventDefault();
    console.log("start");

    var username = $('#username').val();
    var password = $('#password').val();
    var client = $('#client').val();
    var role = $('#role').val();
    var name = $('#name').val();

    Meteor.call('registerUser', username,password,client,role,name);
    Router.go('home');
    console.log("end");
    return false;
  },
});

Template.register.onRendered(function() {
    
});