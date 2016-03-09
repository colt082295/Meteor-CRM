Template.viewClient.helpers({
            ticket: function() { 
                return Tickets.find({company:this.company}).fetch(); 
            },
            clients: function() { return Clients.findOne({_id:this._id}); }, // Get info of currently selected client from the Clients collection
            shipping_state: [
                { state: "Alabama" },
                { state: "Alaska" },
                { state: "Arizona" },
                { state: "Arkansas" },
                { state: "California" },
                { state: "Colorado" },
                { state: "Connecticut" },
                { state: "Delaware" },
                { state: "Florida" },
                { state: "Georgia" },
                { state: "Hawaii" },
                { state: "Idaho" },
                { state: "Illinois" },
                { state: "Indiana" },
                { state: "Iowa" },
                { state: "Kansas" },
                { state: "Kentucky" },
                { state: "Louisiana" },
                { state: "Maine" },
                { state: "Maryland" },
                { state: "Massachusetts" },
                { state: "Michigan" },
                { state: "Minnesota" },
                { state: "Mississippi" },
                { state: "Missouri" },
                { state: "Montana" },
                { state: "Nebraska" },
                { state: "Nevada" },
                { state: "New Hampshire" },
                { state: "New Jersey" },
                { state: "New Mexico" },
                { state: "New York" },
                { state: "North Carolina" },
                { state: "North Dakota" },
                { state: "Ohio" },
                { state: "Oklahoma" },
                { state: "Oregon" },
                { state: "Pennsylvania" },
                { state: "Rhode Island" },
                { state: "South Carolina" },
                { state: "South Dakota" },
                { state: "Tennessee" },
                { state: "Texas" },
                { state: "Utah" },
                { state: "Vermont" },
                { state: "Virginia" },
                { state: "Washington" },
                { state: "West Virginia" },
                { state: "Wisconsin" },
                { state: "Wyoming" }
                ]
});

Template.addClient.helpers({
    shipping_state: [
        { state: "Alabama" },
        { state: "Alaska" },
        { state: "Arizona" },
        { state: "Arkansas" },
        { state: "California" },
        { state: "Colorado" },
        { state: "Connecticut" },
        { state: "Delaware" },
        { state: "Florida" },
        { state: "Georgia" },
        { state: "Hawaii" },
        { state: "Idaho" },
        { state: "Illinois" },
        { state: "Indiana" },
        { state: "Iowa" },
        { state: "Kansas" },
        { state: "Kentucky" },
        { state: "Louisiana" },
        { state: "Maine" },
        { state: "Maryland" },
        { state: "Massachusetts" },
        { state: "Michigan" },
        { state: "Minnesota" },
        { state: "Mississippi" },
        { state: "Missouri" },
        { state: "Montana" },
        { state: "Nebraska" },
        { state: "Nevada" },
        { state: "New Hampshire" },
        { state: "New Jersey" },
        { state: "New Mexico" },
        { state: "New York" },
        { state: "North Carolina" },
        { state: "North Dakota" },
        { state: "Ohio" },
        { state: "Oklahoma" },
        { state: "Oregon" },
        { state: "Pennsylvania" },
        { state: "Rhode Island" },
        { state: "South Carolina" },
        { state: "South Dakota" },
        { state: "Tennessee" },
        { state: "Texas" },
        { state: "Utah" },
        { state: "Vermont" },
        { state: "Virginia" },
        { state: "Washington" },
        { state: "West Virginia" },
        { state: "Wisconsin" },
        { state: "Wyoming" }
    ]
});    


 Template.allClientsList.events({
     
     'click .edit_table': function (e, template, cellData, renderType, currentRow) { // Run when the "#add_email" button is clicked
            
                e.preventDefault(); // Prevent default tasks from running
                console.log("Clicked edit!"); // Display a console message just to know it is working
                Router.go('viewClientPage', {_id: e.currentTarget.id})
          
        }
        
     
 });
 Template.bookCheckOutCell.events({

 });
 
 Template.allClientsList.onRendered(function() {
     
      Metronic.init(); // init metronic core componets
      Layout.init(); // init layout
     
 });
 
 
  Template.viewClient.onRendered(function() {
       
       Metronic.init(); // init metronic core componets
       Layout.init(); // init layout
       $(".mask_phone").mask("(999) 999-9999");
     
 });


  Template.addClient.onRendered(function() {
   
       Metronic.init(); // init metronic core componets
       Layout.init(); // init layout
       $(".mask_phone").mask("(999) 999-9999");
     
 });

/*********************************************
           Add New Client - FORM
/********************************************/
  Template.addClient.events({
       
        'click #add_email': function (e) { // Run when the "#add_email" button is clicked
            
            e.preventDefault(); // Prevent default tasks from running
            $( ".emails" ).append( '<div class="input-group">\
										<span class="input-group-btn btn-left">\
										<a id="remove_email" class="btn btn-xs red"><i class="fa fa-minus"></i></a>\
										</span>\
										<div class="input-group-control">\
											<input type="text" class="form-control email_accounts" name="email_account" placeholder="Enter an email">\
											<div class="form-control-focus">\
											</div>\
										</div>\
									</div>\
            ' );
          
        },
        
        'click #remove_email': function (e) {
        
         e.preventDefault(); // Prevent default actions
         $(event.target).closest(".input-group").remove();
         
        },
        
        /*
        
        'click #add_website': function (e) { // Run when the user click the "add_email" button
            e.preventDefault(); // Prevent the defaults from happening
            console.log("You added another!"); // Display console message to make sure that everything is running fine.
            //// Append an input box
            $( ".websites" ).append( '<div class="row"><div class="input-field"><input type="text" name="website" placeholder="Enter website" value="" /><span id="remove_email" class="fa fa-times remove_email"></span><label class="active" for="website">Website</label></div</div>' );
        
        },
        */
      
      
        'submit form' : function(event, template) { // Run when form is submitted
        
        
                event.preventDefault(); // prevent page reload
                //// Set variables equal to html counterpart
                var companyName = event.target.company_name.value; 
                var shippingAddress = event.target.shipping_address.value; 
                var shippingCity = event.target.shipping_city.value; 
                var shippingState = event.target.shipping_state.value; 
                var shippingZip = event.target.shipping_zip.value; 
                var contactName = event.target.contact_name.value; 
                var contactPhone = event.target.contact_phone.value; 
                var contactEmail = event.target.contact_email.value; 
                var notes = event.target.notes.value; 
                
                // This groups together all email accounts into an array
                var emails = $("input[name='email_account']").map(function() {
                    return this.value;
                }).get();
                //
                if (!companyName) { // Make sure that there is at least a company name entered. If so, post to db.
                    console.log("Hey, it's empty!"); // Display this if there is no company name entered.
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
                    var user = Meteor.user().username;
                    var date_full = new Date(); // Save full time to its own variable in case needed for extraction
                    var date = (new Date().getMonth()+ 1)+'/'+ new Date().getDate()+'/'+ new Date().getFullYear(); // Format the month/date/year correctly
                    var time = hours + ':' + minutes + ' ' + ampm; // Save the correctly formatted version of the hour/minute.
                    Meteor.call('add_client', companyName,shippingAddress,shippingCity,shippingState,shippingZip,contactName,contactPhone,contactEmail,emails,user,notes,date_full,date,time,hours,minutes,ampm);
                    toastr.success("Client Added", "You successfully added the client!");
                }
                
                
                return false; // Prevent default form submit
        }});
////
        
/*********************************************
              Edit Client - FORM
/********************************************/
  Template.viewClient.events({
         'click #remove_from_db': function (e) { // Run on click of "remove_from_db" button
         e.preventDefault(); // Prevent default actions
         var id = this._id; // Set equal to the current id
         var company = this.company; // Set equal to the current "company" value
         Meteor.call('remove_client_db', id);
         Router.go('home'); // This is going to route to the homepage after the user has removed the client from the db.
         toastr.success(company + " Removed", "You successfully removed " + company + "!");
    },


    'submit #email_modal_form': function(event, template) {
        event.preventDefault(); // Prevent default actions
        var id = this._id; // Set equal to the current id
        var email = $('#email').val();
        Meteor.call('add_email_modal', id,email);
        $('#email').val("");
        $("#email_modal").modal("hide");
        toastr.success("Email Added", "You successfully added an email!");
        return " "; // Prevent default form submit
        
  },
    
    
        'click #remove_email': function(event, template) {
        
        var id = template.data._id; // Set equal to the current id
        var email = $(event.target).parent().siblings(".input-group-control").find('.email_accounts').val();
        console.log(email)
        Meteor.call('remove_email', id,email);
        toastr.success("Removed Email", "You successfully removed the email!");
  },
  
  
  'click #clear': function(event, template) {
        
        var id = template.data._id; // Set equal to the current id
        Meteor.call('remove_all_emails', id);
        toastr.success("Removed All Emails", "You successfully removed all emails!");
            
  },
      
      'submit .add_order' : function(event, template) { // Run this when the form is submitted
      
          event.preventDefault(); // prevent page reload
          //// Set variables equal to html counterpart
          var companyName = event.target.company_name.value;
          var shippingAddress = event.target.shipping_address.value; 
          var shippingCity = event.target.shipping_city.value; 
          var shippingState = event.target.shipping_state.value; 
          var shippingZip = event.target.shipping_zip.value; 
          var contactName = event.target.contact_name.value; 
          var contactPhone = event.target.contact_phone.value; 
          var contactEmail = event.target.email.value; 
          //var website = event.target.website.value; 
          var notes = event.target.notes.value; 
          
          if (!companyName) { // Make sure that there is at least a company name entered. If so, post to db.
            console.log("Hey, it's empty!"); // Display this if there is nothing entered for the company name.
          } else { // If it does have something in it, continue
              var id = this._id; // Set the currentId variable equal to the id of the current collection item.
              //// Get the time, and convert it from 24 to 12 hour
              var hours = new Date().getHours();
              var minutes = new Date().getMinutes();
              var ampm = hours >= 12 ? 'pm' : 'am';
              hours = hours % 12;
              hours = hours ? hours : 12; // the hour '0' should be '12'
              minutes = minutes < 10 ? '0'+minutes : minutes;
              var values = $("input[name='email_account']").map(function() { //// Grouping together
                return this.value;
              }).get();
              var user = Meteor.user().username;
              var date_full = new Date(); // Save full time to its own variable in case needed for extraction
              var date = (new Date().getMonth()+ 1)+'/'+ new Date().getDate()+'/'+ new Date().getFullYear(); // Format the month/date/year correctly
              var time = hours + ':' + minutes + ' ' + ampm; // Save the correctly formatted version of the hour/minute.
              Meteor.call('update_client', id,companyName,shippingAddress,shippingCity,shippingState,shippingZip,contactName,contactPhone,contactEmail,values,user,notes,date_full,date,time,hours,minutes,ampm);
              toastr.success("Client Updated", "You successfully updated the client!");
          }
          
    return " "; // Prevent default form submit
    
    }});
