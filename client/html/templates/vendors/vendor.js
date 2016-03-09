  Template.addVendor.onRendered(function() {
   
   Metronic.init(); // init metronic core componets
   Layout.init(); // init layout
     
 });
  Template.viewVendorPage.onRendered(function() {
   
   Metronic.init(); // init metronic core componets
   Layout.init(); // init layout
     
 });
/*********************************************
            Add New Ticket - FORM
/********************************************/  
  Template.addVendor.events({'submit form' : function(event, template) {
          event.preventDefault(); //prevent page reload
          // Save all variables to their html counterparts.
          var vendor = event.target.vendor.value;
          var notes = event.target.notes.value; 
          
          // Make sure that there is at least a company name entered. If so, post to db.
          if (!vendor) {
            console.log("Hey, it's empty!"); // Display this if nothing is entered for the company name.
          } 
          else {
           // Get the time, and convert it from 24 to 12 hour
            var hours = new Date().getHours();
            var minutes = new Date().getMinutes();
            var ampm = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            minutes = minutes < 10 ? '0'+minutes : minutes;
          //
          // Insert all info into the Tickets collection.
            Vendor.insert({
              vendor: vendor,
              notes: notes,
              user: Meteor.user().username,  // username of logged in user
              date_full: new Date(), // Save full time to its own variable in case needed for extraction
              date: (new Date().getMonth()+ 1)+'/'+ new Date().getDate()+'/'+ new Date().getFullYear(), // Format the month/date/year correctly
              time: hours + ':' + minutes + ' ' + ampm // Save the correctly formatted version of the hour/minute.
            });
            console.log("It Worked!"); // Display this if everything worked correctly.
          }
              
              // Prevent default form submit
          return false;
        }});

/*********************************************
            Edit Ticket - FORM
/********************************************/          
  Template.viewVendorPage.events({
      
      'click #remove_from_db': function (e) {
          e.preventDefault();
          console.log("You removed it!");
          //
          Vendor.remove({_id:this._id});
          Router.go('home'); // This is going to route to the homepage after the user has removed the ticket from the db.
    },
    
    
    
    
    
    
    
    
    
    
    
    
      
      'submit form' : function(event, template, element) {
          event.preventDefault(); //prevent page reload
          // Save variables to their html counterparts.
          var vendor = event.target.vendor.value;
          var notes = event.target.notes.value; 
          
          //
          
          if (!vendor) { // Make sure that there is at least a company name entered. If so, post to db. If not, display a notification.
            console.log("Hey, it's empty!"); // Display this if nothing is entered for the comapny name.
          } 
          else {
              var currentId = this._id; // Set the id to the one that the user selected.
            // Get the time, and convert it from 24 to 12 hour
              var hours = new Date().getHours();
              var minutes = new Date().getMinutes();
              var ampm = hours >= 12 ? 'pm' : 'am';
              hours = hours % 12;
              hours = hours ? hours : 12; // the hour '0' should be '12'
              minutes = minutes < 10 ? '0'+minutes : minutes;
            //
            // Update all info in the Tickets collection with all the current info.
              Vendor.update({_id:currentId}, { // Update all the collection info with what is currently entered.
                vendor: vendor,
                notes: notes,
                user: Meteor.user().username,  // username of logged in user
                date_full: new Date(), // Save full time to its own variable in case needed for extraction.
                date: (new Date().getMonth()+ 1)+'/'+ new Date().getDate()+'/'+ new Date().getFullYear(), // Format the month/date/year correctly
                time: hours + ':' + minutes + ' ' + ampm // Save the correctly formatted version of the hour/minute.
              });
              console.log("It Worked!"); // Display this if everything worked out correctly.
          }
              
              // Prevent default form submit.
          return false;
        }});
        