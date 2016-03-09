  Template.viewService.onRendered(function() {

        $('#summernote').summernote({
        height: 250,
        maxHeight:800,
        minHeight:100,
        placeholder: 'Service description goes here.', // set editable area's placeholder text
        focus: true,    //set focus editable area after Initialize summernote
    });
    
    Metronic.init(); // init metronic core componets
   Layout.init(); // init layout
 
});

   Template.addServiceGroup.onRendered(function() {
   
   Metronic.init(); // init metronic core componets
   Layout.init(); // init layout
     
 });
    Template.addService.onRendered(function() {
   
   Metronic.init(); // init metronic core componets
   Layout.init(); // init layout
     
 });
    Template.viewServiceGroup.onRendered(function() {
   
   Metronic.init(); // init metronic core componets
   Layout.init(); // init layout
     
 });

  Template.viewService.helpers({
    service_group: function() {
      return Service_Groups.find({}, {sort: {createdAt:-1}});
    },
  });




/*********************************************
            Add New Service Group - FORM
/********************************************/            
  Template.addServiceGroup.events({'submit form' : function(event, template) {
          event.preventDefault(); //prevent page reload
          var service_group = event.target.service_group.value;
          var notes = event.target.notes.value;
          
          // Make sure that there is at least a company name entered. If so, post to db.
          if (!service_group) {
            console.log("Hey, it's empty!"); // Dipslay this if nothing is entered for the order name.
          } 
          else {
              var hours = new Date().getHours();
              var minutes = new Date().getMinutes();
              var ampm = hours >= 12 ? 'pm' : 'am';
              hours = hours % 12;
              hours = hours ? hours : 12; // the hour '0' should be '12'
              minutes = minutes < 10 ? '0'+minutes : minutes;
              // Insert everything into the Orders collection.
              
              Service_Groups.insert({
                service_group: service_group,
                notes: notes
              });
              //
              console.log("It Worked!"); // Display this if everything worked correctly.
          }
              
              // Prevent default form submit
          return false;
            }});




/*********************************************
            Add New Service - FORM
/********************************************/            
  Template.addService.events({'submit form' : function(event, template) {
          event.preventDefault(); //prevent page reload
          var service_group = event.target.service_group.value;
          var service = event.target.service.value;
          var setup_fee = event.target.setup_fee.value;
          var cont_fee = event.target.cont_fee.value;
          var cont_bill = event.target.cont_bill.value;
          var service_info = $('#summernote').code();
          var notes = event.target.notes.value;
          
          // Make sure that there is at least a company name entered. If so, post to db.
          if (!service) {
            console.log("Hey, it's empty!"); // Dipslay this if nothing is entered for the order name.
          } 
          else {
              var hours = new Date().getHours();
              var minutes = new Date().getMinutes();
              var ampm = hours >= 12 ? 'pm' : 'am';
              hours = hours % 12;
              hours = hours ? hours : 12; // the hour '0' should be '12'
              minutes = minutes < 10 ? '0'+minutes : minutes;
              // Insert everything into the Orders collection.
              Services.insert({
                service_group: service_group,
                service: service,
                setup_fee: setup_fee,
                cont_fee: cont_fee,
                cont_bill: cont_bill,
                service_info: service_info,
                notes: notes
              });
              
              //
              console.log("It Worked!"); // Display this if everything worked correctly.
          }
          
          $("#summernote").code(service_info);
              
              // Prevent default form submit
          return false;
            }});
            
            
            
            
            
            
            
            
              Template.viewService.events({
              
    
             'click #remove_from_db': function (e) { // Run on click of "remove_from_db" button
         e.preventDefault(); // Prevent default actions
         var id = this._id; // Set equal to the current id
         var service = this.service; // Set equal to the current "company" value
                Services.remove({_id:id});
                console.log("You removed:" + id);
                Router.go('home'); // This is going to route to the homepage after the user has removed the client from the db.
                
             },
                
                'submit form' : function(event, template) {
          event.preventDefault(); //prevent page reload
          var service_group = event.target.service_group.value;
          var service = event.target.service.value;
          var notes = event.target.notes.value;
          var setup_fee = event.target.setup_fee.value;
          var cont_fee = event.target.cont_fee.value;
          var cont_bill = event.target.cont_bill.value;
          var service_info = $('#summernote').code();
          
          // Make sure that there is at least a company name entered. If so, post to db.
          if (!service) {
            console.log("Hey, it's empty!"); // Dipslay this if nothing is entered for the order name.
          } 
          else {
              var hours = new Date().getHours();
              var minutes = new Date().getMinutes();
              var ampm = hours >= 12 ? 'pm' : 'am';
              hours = hours % 12;
              hours = hours ? hours : 12; // the hour '0' should be '12'
              minutes = minutes < 10 ? '0'+minutes : minutes;
              var currentId = this._id; // Set the id to the one that the user selected.
              // Insert everything into the Orders collection.
              Services.update({_id:currentId}, {
                service_group: service_group,
                service: service,
                service_info: service_info,
                setup_fee: setup_fee,
                cont_fee: cont_fee,
                cont_bill: cont_bill,
                notes: notes,
                user: Meteor.user().username,  // username of logged in user
                date_full: new Date(), // Save full time to its own variable in case needed for extraction
                date: (new Date().getMonth()+ 1)+'/'+ new Date().getDate()+'/'+ new Date().getFullYear(), // Format the month/date/year correctly
                time: hours + ':' + minutes + ' ' + ampm // Save the correctly formatted version of the hour/minute.
              });
              //
              console.log("It Worked!"); // Display this if everything worked correctly.
          }
          
              
              // Prevent default form submit
          return false;
          
          
            }});
            
            
            
                          Template.viewServiceGroup.events({
              
    
             'click #remove_from_db': function (e) { // Run on click of "remove_from_db" button
         e.preventDefault(); // Prevent default actions
         var id = this._id; // Set equal to the current id
         var service_group = this.service_group; // Set equal to the current "company" value
                Services.remove({_id:id});
                console.log("You removed:" + id);
                Router.go('home'); // This is going to route to the homepage after the user has removed the client from the db.
                
             },
                
                'submit form' : function(event, template) {
          event.preventDefault(); //prevent page reload
          var service_group = event.target.service_group.value;
          var notes = event.target.notes.value;
          
          // Make sure that there is at least a company name entered. If so, post to db.
          if (!service_group) {
            console.log("Hey, it's empty!"); // Dipslay this if nothing is entered for the order name.
          } 
          else {
              var hours = new Date().getHours();
              var minutes = new Date().getMinutes();
              var ampm = hours >= 12 ? 'pm' : 'am';
              hours = hours % 12;
              hours = hours ? hours : 12; // the hour '0' should be '12'
              minutes = minutes < 10 ? '0'+minutes : minutes;
              var currentId = this._id; // Set the id to the one that the user selected.
              // Insert everything into the Orders collection.
              Service_Groups.update({_id:currentId}, {
                service_group: service_group,
                notes: notes,
                user: Meteor.user().username,  // username of logged in user
                date_full: new Date(), // Save full time to its own variable in case needed for extraction
                date: (new Date().getMonth()+ 1)+'/'+ new Date().getDate()+'/'+ new Date().getFullYear(), // Format the month/date/year correctly
                time: hours + ':' + minutes + ' ' + ampm // Save the correctly formatted version of the hour/minute.
              });
              //
              console.log("It Worked!"); // Display this if everything worked correctly.
          }
          
              
              // Prevent default form submit
          return false;
          
          
            }});

