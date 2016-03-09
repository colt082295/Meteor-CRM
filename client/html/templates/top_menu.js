  Template.topMenu.onRendered(function() {

        
});

  Template.topMenu.helpers({
    ticket: function() {
      return Tickets.find({employee:Meteor.user().username, $or: [ { status: "Open" }, { status: "Pending" } ]});
    },
    profile: function() {
      return Meteor.user(); 
    },
    task: function() {
      return Meteor.user().profile.schedule;
    }, 
    notifications: function() {
        var tickets = Tickets.find({employee:Meteor.user().username, $or: [ { status: "Open" }, { status: "Pending" } ]}).count()
        var tasks = Meteor.user().profile.schedule.length;
      return {
       amount: tickets + tasks
      };
    }
                
  });


Template.topMenu.events({
    
    'click #logout': function (event, template) {
        event.preventDefault();
        Meteor.logout();
        Router.go("loginPage")
    },

    
});