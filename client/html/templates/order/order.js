     Template.addOrder.onRendered(function() {
   
   Metronic.init(); // init metronic core componets
   Layout.init(); // init layout
     
 });
 
 
      Template.viewOrder.onRendered(function() {
   
   Metronic.init(); // init metronic core componets
   Layout.init(); // init layout
     
 });



/*********************************************
            Add New Order - FORM
/********************************************/            
  Template.addOrder.events({'submit form' : function(event, template) {
          event.preventDefault(); //prevent page reload
          var order = event.target.order.value;
          
          // Make sure that there is at least a company name entered. If so, post to db.
          if (!order) {
            console.log("Hey, it's empty!"); // Dipslay this if nothing is entered for the order name.
          } 
          else {
              var hours = new Date().getHours();
              var minutes = new Date().getMinutes();
              var ampm = hours >= 12 ? 'pm' : 'am';
              hours = hours % 12;
              hours = hours ? hours : 12; // the hour '0' should be '12'
              minutes = minutes < 10 ? '0'+minutes : minutes;
              
              var user = Meteor.user().username;
              var date_full = new Date();
              var date = (new Date().getMonth()+ 1)+'/'+ new Date().getDate()+'/'+ new Date().getFullYear();
              var time = hours + ':' + minutes + ' ' + ampm;
              // Insert everything into the Orders collection.
              Meteor.call('insertOrder', order,user,date_full,date,time);
              
              //
              console.log("It Worked!"); // Display this if everything worked correctly.
          }
              
              // Prevent default form submit
          return false;
            }});

/*********************************************
            Edit Order - FORM
/********************************************/           
  Template.viewOrderPage.events({
    
             'click #remove_from_db': function (e) { // Run on click of "remove_from_db" button
         e.preventDefault(); // Prevent default actions
         var id = this._id; // Set equal to the current id
         Meteor.call('removeOrder', id);       
         console.log("You removed:" + id);
         Router.go('home'); // This is going to route to the homepage after the user has removed the client from the db.
////
    },
    
    'submit form' : function(event, template) {
          event.preventDefault(); //prevent page reload
          // Save html element values to variables.
          var order = event.target.order.value;
          var notes = event.target.notes.value;
          //
          
          if (!order) { // Make sure that there is at least a company name entered. If so, post to db. If not, display a notification.
            console.log("Hey, the order is empty!"); // Display this if nothing is entered for the order name.
          } 
          else {
              var id = this._id; // Set the id to the one that the user selected.
              // Get the time, and convert it from 24 to 12 hour
              var hours = new Date().getHours();
              var minutes = new Date().getMinutes();
              var ampm = hours >= 12 ? 'pm' : 'am';
              hours = hours % 12;
              hours = hours ? hours : 12; // the hour '0' should be '12'
              minutes = minutes < 10 ? '0'+minutes : minutes;
            //
            var user = Meteor.user().username;
              var date_full = new Date();
              var date = (new Date().getMonth()+ 1)+'/'+ new Date().getDate()+'/'+ new Date().getFullYear();
              var time = hours + ':' + minutes + ' ' + ampm;
            
            Meteor.call('updateOrder', id,order,notes,user,date_full,date,time); 
              console.log("It Worked!"); // Display this if everything worked correctly.
          }
          
              
              // Prevent default form submit.
        return false;
            }});