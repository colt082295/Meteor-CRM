     Template.addPurchaseOrder.onRendered(function() {
   
   Metronic.init(); // init metronic core componets
   Layout.init(); // init layout
     
 });
 
      Template.viewPurchaseOrder.onRendered(function() {
   
   Metronic.init(); // init metronic core componets
   Layout.init(); // init layout
     
 });


Template.viewPurchaseOrder.helpers({
            po: function() { return Purchase_Orders.findOne({_id:this._id}); }, // Get info of currently selected client from the Clients collection
            vendor: function() { return Vendor.find({}); }, // Get info of currently selected client from the Clients collection
          });



/*********************************************
            Add New Quote - FORM
/********************************************/            
  Template.addPurchaseOrder.events({'submit form' : function(event, template) {
          event.preventDefault(); //prevent page reload
          var company = event.target.company.value;
          var vendor = event.target.vendor.value;
          var item = event.target.item.value;
          var item_qty = event.target.item_qty.value;
          var notes = event.target.notes.value;
          
          // Make sure that there is at least a company name entered. If so, post to db.
          if (!vendor) {
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
               var user = Meteor.user().username;
            var date_full = new Date();
            var date = (new Date().getMonth()+ 1)+'/'+ new Date().getDate()+'/'+ new Date().getFullYear();
            var time = hours + ':' + minutes + ' ' + ampm;
              
              
              
              Meteor.call('insertPO', company,vendor,item,item_qty,notes,user,date_full,date,time); 
              
              
              
              //
              console.log("It Worked!"); // Display this if everything worked correctly.
          }
              
              // Prevent default form submit
          return false;
            }});
            
            
              Template.viewPurchaseOrder.events({
    
             'click #remove_from_db': function (e) { // Run on click of "remove_from_db" button
         e.preventDefault(); // Prevent default actions
         var id = this._id; // Set equal to the current id
         Meteor.call('removePO', id);        
         console.log("You removed:" + id);
         Router.go('home'); // This is going to route to the homepage after the user has removed the client from the db.
                
             },
                
                'submit form' : function(event, template) {
          event.preventDefault(); //prevent page reload
          var company = event.target.company.value;
          var vendor = event.target.vendor.value;
          var item = event.target.item.value;
          var item_qty = event.target.item_qty.value;
          var notes = event.target.notes.value;
          
          // Make sure that there is at least a company name entered. If so, post to db.
          if (!company) {
            console.log("Hey, it's empty!"); // Dipslay this if nothing is entered for the order name.
          } 
          else {
              var hours = new Date().getHours();
              var minutes = new Date().getMinutes();
              var ampm = hours >= 12 ? 'pm' : 'am';
              hours = hours % 12;
              hours = hours ? hours : 12; // the hour '0' should be '12'
              minutes = minutes < 10 ? '0'+minutes : minutes;
              var id = this._id; // Set the id to the one that the user selected.
              var user = Meteor.user().username;
              var date_full = new Date();
              var date = (new Date().getMonth()+ 1)+'/'+ new Date().getDate()+'/'+ new Date().getFullYear();
              var time = hours + ':' + minutes + ' ' + ampm;
              
              Meteor.call('updatePO', id,company,vendor,item,item_qty,notes,user,date_full,date,time); 
              //
              console.log("It Worked!"); // Display this if everything worked correctly.
          }
          
              
              // Prevent default form submit
          return false;
          
          
            }});
            