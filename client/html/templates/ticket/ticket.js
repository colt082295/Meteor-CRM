  Template.viewTicket.onRendered(function(event,template) {
   
   Metronic.init(); // init metronic core components
   Layout.init(); // init layout
   $(".mask_phone").mask("(999) 999-9999");
   
       var id = Template.parentData(0)._id;
   var ticket =Tickets.findOne({_id:id});
   $('#employee').multiselect();
   $('#employee').multiselect('select', ticket.employee);
   $( ".multiselect" ).addClass( "form-control" ).removeClass( "btn btn-default" );
   $( ".multiselect .multiselect-selected-text" ).addClass( "pull-left" );
   $( ".multiselect .caret" ).addClass( "pull-right" );
   $( ".btn-group" ).removeClass( "btn-group" );
     
 });
 
 
   Template.addTicket.onRendered(function() {
   
   Metronic.init(); // init metronic core components
   Layout.init(); // init layout
   Demo.init(); // init demo features
   $(".mask_phone").mask("(999) 999-9999");
   

   $('#employee').multiselect();
   $( ".multiselect" ).addClass( "form-control" ).removeClass( "btn btn-default" );
   $( ".multiselect .multiselect-selected-text" ).addClass( "pull-left" );
   $( ".multiselect .caret" ).addClass( "pull-right" );
   $( ".btn-group" ).removeClass( "btn-group" );
     
 });
 
    Template.allTicketsList.onRendered(function() {
   
   Metronic.init(); // init metronic core components
   Layout.init(); // init layout
     
 });
 
 
  Template.addTicket.helpers({
    client: function() {
      return Clients.find();
    },
    user: function() {
      return Meteor.users.findOne({_id:Meteor.user()._id}, {sort: {createdAt:-1}});
    },
    
        employee: function() {
                  return Meteor.users.find({"profile.client": "STC Network Services"}); // This returns the info from the Employee collection.
                },
                
  });
  
    Template.viewTicket.helpers({
      client: function() {
      return Clients.find();
    },
    user: function() {
      return Meteor.users.findOne({_id:Meteor.user()._id}, {sort: {createdAt:-1}});
    },
    employee: function() {
                  return Meteor.users.find({"profile.client": "STC Network Services"}, {sort: {createdAt: -1}}); // This returns the info from the Employee collection.
                },
                selected: function() {
                  var companyName = event.target.company_name.value;
                  var selectedEmployee
                }
                
  });



/*********************************************
            Add New Ticket - FORM
/********************************************/  
  Template.addTicket.events({'submit .add_ticket' : function(event, template) {
          event.preventDefault(); //prevent page reload
          // Save all variables to their html counterparts.
          var companyName = event.target.company_name.value;
          var contactName = event.target.contact_name.value; 
          var contactPhone = event.target.contact_phone.value; 
          var contactEmail = event.target.contact_email.value; 
          var employee = $('#employee option:selected').map(function(a, item){return item.value;}).get();
          console.log(employee)
          var notes = event.target.notes.value; 
          var priority = $( "#priority option:selected" ).val();
          
          // Make sure that there is at least a company name entered. If so, post to db.
          if (!companyName) {
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
            var ticket = Tickets.insert({
              company: companyName,
              client_name: contactName,
              contact_phone: contactPhone,
              contact_email: contactEmail,
              employee: employee,
              notes: notes,
              status: "Open",
              priority: priority,
              user: Meteor.user().username,  // username of logged in user
              date_full: new Date(), // Save full time to its own variable in case needed for extraction
              date: (new Date().getMonth()+ 1)+'/'+ new Date().getDate()+'/'+ new Date().getFullYear(), // Format the month/date/year correctly
              time: hours + ':' + minutes + ' ' + ampm // Save the correctly formatted version of the hour/minute.
            });
            console.log(ticket);
            var to = [];
            
            if ($('#checkbox').is(':checked')) {
              // Figure this out. For each employee selected it should copy that user's email to send the email.
                $('#employee option:selected').each(function() {
                  var to1 = Meteor.users.findOne({"profile.client": "STC Network Services", "username": $(this).val()});
                  to.push(to1.profile.info.email);
                });

console.log(to);


              var from = "contactcolt@gmail.com"
              if(!Meteor.user().profile.info.name){var name = Meteor.user().username}else {var name =  Meteor.user().profile.info.name }
              var subject = "New ticket from " + name
              var text = "View Ticket: " + "http://167.114.103.80:9555/edit-ticket/" + ticket + "\n" + "\n" + "Ticket Info: " + "\n" + "\n" + "Company: " + companyName + "\n" + "Name: " + contactName + "\n" + "Notes: " + notes // Find out how to make ticket link reactive
              Meteor.call('sendEmail', to, from, subject, text);
              
            }
            toastr.success("Ticket Added", "You successfully added the ticket!");
            Router.go("viewTicketPage", {_id: ticket});
            
            console.log("It Worked!"); // Display this if everything worked correctly.
          }
              
              // Prevent default form submit
          return false;
        }});

/*********************************************
            Edit Ticket - FORM
/********************************************/          
  Template.viewTicketPage.events({
    
    
          'submit .update_ticket' : function(event, template) {
          event.preventDefault();
          // Save variables to their html counterparts.
          var companyName = event.target.company_name.value;
          var client = event.target.client_name.value; 
          var contactPhone = event.target.contact_phone.value; 
          var contactEmail = event.target.contact_email.value; 
          var ticket_status = $('input[name="ticket_status"]:checked').val();
          var employee = $( "#employee" ).val() || []; 
          var notes = event.target.notes.value; 
          var priority = $( "#priority option:selected" ).val();

          
          if ( ticket_status === "Closed" ) { // Have the modal popup if the status of the ticket is closed.
                $("#modal1").modal("show");
                console.log("The modal opened."); // Display this if everything worked out correctly.
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
            var date = (new Date().getMonth()+ 1)+'/'+ new Date().getDate()+'/'+ new Date().getFullYear()
            var time = hours + ':' + minutes + ' ' + ampm
            
            Meteor.call('updateTicket1', id,companyName,client,contactPhone,contactEmail,notes,priority,ticket_status,employee,user,date_full,date,time);
              toastr.success("Ticket Updated", "You successfully updated the ticket!");
              console.log("It Worked!"); // Display this if everything worked out correctly.
          }
              
              // Prevent default form submit.
          return " "; // Prevent default form submit
        },
    
    
    
    
    
    "change #saved_config": function(event, template) {
      var data = template.data; // Set equal to the current id
      console.log(data);
  var selected = $( "#saved_config option:selected" ).text();
  if(selected === "") {
    $('input:radio[name=resolved]').prop('checked', false);
    $('input:radio[name=contacted]').prop('checked', false);
    $('input:radio[name=billable]').prop('checked', false);
    $('input:radio[name=parts]').prop('checked', false);
    $('#time_worked').val("");
    $("#notes_modal").val("");
    
  }
  else {
  var user =Meteor.user()._id;
  var _search = Meteor.users.findOne({_id:user});
  var search = _search.profile.saved_configs.filter(
       function(config){ 
         return config.config === selected;
       })[0]     // .filter returns array, select first (only) item
  console.log(search)
  
  var notes = search.notes;
         $('input:radio[name=resolved]').val([search.modal1]);
         $('input:radio[name=contacted]').val([search.modal2]);
         $('input:radio[name=billable]').val([search.modal3]);
         $('input:radio[name=parts]').val([search.modal4]);
         $('#time_worked').val(search.time_worked);
  notes = notes.replace(/\$client/g, data.client_name).replace(/\$client's/g, data.client_name+"'s")
    .replace(/\$company/g, data.company).replace(/\$company's/g, data.company+"'s").replace(/\$phone/g, data.contact_phone).replace(/\$email/g, data.contact_email)
    ;
    console.log(notes);
    console.log(data);
    $("#notes_modal").val(notes);
  }
},


    "change #saved_config1": function(event, template) {
      var data = template.data; // Set equal to the current id
  var selected = $( "#saved_config1 option:selected" ).text();
  var selected_val = $( "#saved_config1 option:selected" ).val();
  var _search = Meteor.users.findOne({_id:Meteor.user()._id});
  var search = _search.profile.saved_configs.filter(
       function(config){ 
         return config.config === selected;
       })[0]     // .filter returns array, select first (only) item
  console.log(search)
         $('#config_name3').text(selected);
         $('#config_name3').val(selected_val);
         $('input:radio[name=resolved2]').val([search.modal1]);
         $('input:radio[name=contacted2]').val([search.modal2]);
         $('input:radio[name=billable2]').val([search.modal3]);
         $('input:radio[name=parts2]').val([search.modal4]);
         $('#time_worked2').val(search.time_worked);
         $("#notes_modal2").val(search.notes);
    
},


 /*   
    "change #saved_config": function(event, template) {
      /*
      Meteor.users.find({_id:Meteor.user()._id}, { $elemMatch: {"config": "Client 2" } } ).map(function(doc) {return doc.profile.saved_configs.|| []});
      Meteor.users.find({_id:Meteor.user()._id}, {fields: {profile: { $elemMatch: {config: "Client 2" } } }} ).map(function(doc) {return doc.profile.saved_configs|| []});
     
      var selected = $( "#saved_config option:selected" ).text();
      var search = Meteor.users.findOne({_id:Meteor.user()._id},{'profile.saved_configs.$' : selected});
 
 console.log(search)
        
    },
    */
    
        'click #add_note_2': function(event, template) {
      
        var push_it = $('input#add_new_note').val();
        
        Meteor.users.update({_id:Meteor.user()._id}, {
            $push: {
                "profile.saved_notes": push_it
            }
        });
      
        $('#add_new_note').val("");
        console.log("It's updated");
        
  },
    
  'click .listExRemove': function(event, template) {
        
        var id = template.data._id; // Set equal to the current id
        var the_text = $(event.target).parent().siblings().find('#saved_note').val();
     
        Meteor.users.update({_id:Meteor.user()._id}, {
            $pull: {
                "profile.saved_notes": the_text,
            }
        });
     
        console.log(the_text);
            
  },
  
  
    'click #clear': function(event, template) {
        
        var id = template.data._id; // Set equal to the current id
     
        Meteor.users.update({_id:Meteor.user()._id}, {
            $pull: {
                "profile.saved_notes": {$exists: true}
            }
        });

            
  },
  
  
      'click #remove_all_modal3': function(event, template) {
        
        var id = template.data._id; // Set equal to the current id
     
        Meteor.users.update({_id:Meteor.user()._id}, {
            $pull: {
                "profile.saved_configs": {$exists: true}
            }
        });

            
  },
  
  
        'click #remove_config_modal3': function(event, template) {
        var config = $( "#saved_config1 option:selected" ).text();
        var id= Meteor.user()._id;
        console.log(config);
        console.log(id);
        console.log("start_template");
        
        Meteor.call('removeConfigModal3', config,id);
        console.log("end_template");
     
        

            
  },
    
    'click #add_config': function (event, template) {
      event.preventDefault(); //prevent page reload
        $("#modal2").modal("show");
    },
    
    
        'click #edit_config': function (event, template) {
      event.preventDefault(); //prevent page reload
        $("#modal3").modal("show");
    },
    
    
    'submit #modal_form2' : function(event, template) {
      event.preventDefault(); //prevent page reload
      var id = template.data._id; // Set equal to the current id
      var config = event.target.config_name1.value; 
      var notes = event.target.notes1.value; 
      var timeWorked = event.target.time_worked1.value; 
      var modal_radio1 = $( 'input[name=resolved1]:checked' ).val();
      var modal_radio2 = $( 'input[name=contacted1]:checked' ).val();
      var modal_radio3 = $( 'input[name=billable1]:checked' ).val();
      var modal_radio4 = $( 'input[name=parts1]:checked' ).val();

/* var qa= "{" + "'" + config + "'" + ":" + "{"
 + "config" + ":" + "'" + config + "'" + "," 
 + "notes" + ":" + "'" + notes + "'" + "," 
 + "time_worked" + ":" + "'" + timeWorked + "'" + "," + "modal1" + ":" + "'" + modal_radio1 + "'" + "," + "modal2" + ":" + "'" + modal_radio2 + "'" + "," + "modal3" + ":" + "'" + modal_radio3 + "'" + "," + "modal4" + ":" + "'" + modal_radio4 + "'"  + "}" + "}";
 */
 
  Meteor.users.update({_id:Meteor.user()._id}, {
        $push: {
          "profile.saved_configs": {
            config: config,
            notes: notes,
            time_worked: timeWorked,
            modal1: modal_radio1,
            modal2: modal_radio2,
            modal3: modal_radio3,
            modal4: modal_radio4,
          }
        },
      })
      
      console.log("Added" + config);
      $("#modal2").modal("hide");
      

      
    },
    
    
        'submit #modal_form3' : function(event, template) {
      event.preventDefault(); //prevent page reload
      var id= Meteor.user()._id;
      var _id = template.data._id; // Set equal to the current id
      var config = $( "#config_name3" ).val();
      var notes = event.target.notes2.value; 
      var timeWorked = event.target.time_worked2.value; 
      var modal_radio1 = $( 'input[name=resolved2]:checked' ).val();
      var modal_radio2 = $( 'input[name=contacted2]:checked' ).val();
      var modal_radio3 = $( 'input[name=billable2]:checked' ).val();
      var modal_radio4 = $( 'input[name=parts2]:checked' ).val();
      console.log(config,notes,timeWorked,modal_radio1,modal_radio2,modal_radio3,modal_radio4);
Meteor.call('updateTicket', id,config,notes,timeWorked,modal_radio1,modal_radio2,modal_radio3,modal_radio4);
$("#modal3").modal("hide");

      
    },
    
      
      'click #remove_from_db': function (e) {
          e.preventDefault();
          console.log("You removed it!");
          //
          Tickets.remove({_id:this._id});
          Router.go('home'); // This is going to route to the homepage after the user has removed the ticket from the db.
          toastr.success("You removed the ticket successfully", "Removed the " + this.company + " ticket")
    },
    
    "change #employee-select": function (event, template) {
        var name = $(event.currentTarget).val();
        console.log("name : " + name);
        // additional code to do what you want with the category
    },
    
    
    
    
    'submit #modal_form' : function(event, template) {
          event.preventDefault(); //prevent page reload
          var companyName = this.company;
          var client_name = this.client_name; 
          var contactPhone = this.contact_phone; 
          var contactEmail = this.contact_email; 
          var client = $( '#client_name' ).val();
          var notes = $('#notes_modal').val();
          var ticket_status = this.ticket_status; 
          var employeeDropdown = $( "#employee" ).val() || []; 
          var resolved = $( 'input[name=resolved]:checked' ).val();
          var contacted = $( 'input[name=contacted]:checked' ).val();
          var billable = $( 'input[name=billable]:checked' ).val(); 
          var parts = $( 'input[name=parts]:checked' ).val(); 
          var priority = $( "#priority option:selected" ).val();
          //
          
          if (!companyName) { // Make sure that there is at least a company name entered. If so, post to db. If not, display a notification.
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
              Tickets.update({_id:currentId}, { // Update all the collection info with what is currently entered.
                company: companyName,
                client: client,
                client_name: client_name,
                contact_phone: contactPhone,
                contact_email: contactEmail,
                notes: notes,
                status: "Closed",
                priority: priority,
                employee: employeeDropdown,
                resolved: resolved,
                contacted: contacted,
                billable: billable,
                user: Meteor.user().username,  // username of logged in user
                parts: parts,
                date_full: new Date(), // Save full time to its own variable in case needed for extraction.
                date: (new Date().getMonth()+ 1)+'/'+ new Date().getDate()+'/'+ new Date().getFullYear(), // Format the month/date/year correctly
                time: hours + ':' + minutes + ' ' + ampm // Save the correctly formatted version of the hour/minute.
              });
              console.log("Modal entered!"); // Display this if everything worked out correctly.
              $("#modal1").modal("hide");
              toastr.success("You closed the ticket successfully", "Closed " + this.company + " ticket")
          }
              
              // Prevent default form submit.
          return false;
        },
    
    
    
    
    
    
    
    
    
    
    
    
      
});
        
