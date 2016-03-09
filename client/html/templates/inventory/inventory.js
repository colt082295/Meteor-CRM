  Template.viewInventoryItem.onRendered(function() {
   	function read(a) //Read the QR Code
													{
														$('#qr').val(a);
													}
													       
													$(document).ready(function() {
													      qrcode.callback = read;
													});
													
													Metronic.init(); // init metronic core componets
   Layout.init(); // init layout
});


     Template.addInventoryItem.onRendered(function() {
   
   Metronic.init(); // init metronic core componets
   Layout.init(); // init layout
     
 });


/*********************************************
            Edit Inventory Item - FORM
/********************************************/                 
  Template.viewInventoryItem.events({
    
    
        'click #client': function (event, template) { // Run on click of "client" button
          event.preventDefault(); // prevent page reload
          // Set variables equal to html counterpart
          
          var item = $("#item").val();
          var itemQty = $("input[name=item_qty]").val();
          var barcode_qr = $("input[name=barcode_qr]").val();
          var barcode_format = $("input[name=barcode_format]").val();
          var qr = $("input[name=qr]").val();
          var description = $("#description").val();
          //
          
          var id = template.data._id;
            // Get the time, and convert it from 24 to 12 hour
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
            //
            Meteor.call('updateInventory', id,item,barcode_qr,barcode_format,itemQty,qr,description,user,date_full,date,time);
        },
    
            'click #delivered': function (event, template) { // Run on click of "delivered" button
          event.preventDefault(); // prevent page reload
          // Set variables equal to html counterpart
          var item = $("input[name=item]").val();
          var itemQty = $("input[name=item_qty]").val();
          var barcode_qr = $("input[name=barcode_qr]").val();
          var barcode_format = $("input[name=barcode_format]").val();
          var qr = $("input[name=qr]").val();
          var description = $("input[name=description]").val();
            var id = this._id; // Set the currentId variable equal to the id of the current collection item.
            // Get the time, and convert it from 24 to 12 hour
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
            //
            Meteor.call('setDelivered', id,item,barcode_qr,barcode_format,itemQty,qr,description,user,date_full,date,time);
            // Update all info into the Clients collection
            },
            

            
            
                'click #returns': function (event, template) { // Run on click of "returns" button
          event.preventDefault(); // prevent page reload
          // Set variables equal to html counterpart
          var item = $("input[name=item]").val();
          var itemQty = $("input[name=item_qty]").val();
          var barcode_qr = $("input[name=barcode_qr]").val();
          var barcode_format = $("input[name=barcode_format]").val();
          var qr = $("input[name=qr]").val();
          var description = $("input[name=description]").val();
          //
            var id = this._id; // Set the currentId variable equal to the id of the current collection item.
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
            //
            Meteor.call('setReturned', id,item,barcode_qr,barcode_format,itemQty,qr,description,user,date_full,date,time);
            // Update all info into the Clients collection
            },        
    
    'submit form' : function(event, template) {
          event.preventDefault(); // prevent page reload
          // Set variables equal to html counterpart
          var item = event.target.item.value;
          var itemQty = event.target.item_qty.value; 
          var barcode_qr = event.target.barcode_qr.value; 
          var barcode_format = event.target.barcode_format.value;
          var qr = event.target.qr.value; 
          var description = event.target.description.value; 
          //
            var id = this._id; // Set the currentId variable equal to the id of the current collection item.
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
            //
            Meteor.call('updateInventory2', id,item,barcode_qr,barcode_format,itemQty,qr,description,user,date_full,date,time);
            // Update all info into the Clients collection
            console.log("It Worked!"); // Display this if everything worked correctly.
          
          // Prevent default form submit
            return false;
        },
    
    
    
    
    
        'click #remove_from_db': function (event, template) { // Run on click of "remove_from_db" button
         event.preventDefault(); // Prevent default actions
         var id = this._id; // Set equal to the current id
         Meteor.call('removeInventory', id);
         console.log("You removed:" + id);
         Router.go('home'); // This is going to route to the homepage after the user has removed the client from the db.
////
    },
    
    
  });

/*********************************************
            Add Inventory Item - FORM
/********************************************/              
  Template.addInventoryItem.events({
 
    
    
    'submit form' : function(event, template) {
          event.preventDefault(); // prevent page reload
          // Set variables equal to html counterpart
          var item = event.target.item.value;
          var barcode_qr = event.target.barcode_qr.value; 
          var barcode_format = event.target.barcode_format.value;
          var qr = event.target.qr.value;
          var itemQty = event.target.item_qty.value; 
          var description = event.target.description.value; 
          //
          
          // Make sure that there is at least an item name entered. If so, post to db.
          if (!item) {
            console.log("Hey, it's empty!"); // Display this if there is nothing entered for the item name.
          } 
          else {
              var id = this._id; // Set the currentId variable equal to the id of the current collection item.
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
              Meteor.call('insertInventory', id,item,itemQty,barcode_qr,barcode_format,qr,description,user,date_full,date,time);
            // Insert all info into the Inventory collection
            console.log("It Worked!"); // Display this if everything worked correctly.
          }
          // Prevent default form submit
          return false;
        }});
        
        
        
        
        
        
        
        
  Template.searchInventory.events({
    
    'submit form' : function(event, template) {
        event.preventDefault(); // prevent page reload
        var barcode_qr = event.target.barcode_qr.value; 
        var barcode_format = event.target.barcode_format.value;
        var qr = event.target.qr.value;
        
        if (barcode_qr) {
            var search_barcode = Inventory.findOne({barcode_qr:barcode_qr, barcode_format:barcode_format });
            if (search_barcode) { // If search finds something
            Router.go('viewInventoryPage', {_id: search_barcode._id}); // This passes the id to the page being routed to
          } else {
            alert("That barcode isn't in the inventory.");
          }
        } else if (qr) {
          var search_qr = Inventory.findOne({qr:qr });
            if (search_qr) { // If search finds something
            Router.go('viewInventoryPage', {_id: search_qr._id}); // This passes the id to the page being routed to
          } else {
            alert("That QR code isn't in the inventory.");
          }
        } else {
          alert("You haven't put in a barcode or QR code.")
        }
        
        
    }
    
  });