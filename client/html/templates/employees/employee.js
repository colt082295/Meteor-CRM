     Template.addEmployee.onRendered(function() {
   
   Metronic.init(); // init metronic core componets
   Layout.init(); // init layout
   $(".mask_phone").mask("(999) 999-9999");
     
 });
      Template.viewEmployee.onRendered(function() {
   
   Metronic.init(); // init metronic core componets
   Layout.init(); // init layout
   $(".mask_phone").mask("(999) 999-9999");
   
   /*
   $('.sortable-ul').sortable({
        stop: function(event, ui) {
            console.log("Started")
          // get the dragged html element and the one before
          //   and after it
          el = ui.item.get(0)
          console.log(el);
          console.log(Blaze.getData(el)._id);
          before = ui.item.prev().get(0)
          after = ui.item.next().get(0)
 
          // Here is the part that blew my mind!
          //  Blaze.getData takes as a parameter an html element
          //    and will return the data context that was bound when
          //    that html element was rendered!
          if(!before) {
            //if it was dragged into the first position grab the
            // next element's data context and subtract one from the rank
            newRank = Blaze.getData(after).rank - 1
          } else if(!after) {
            //if it was dragged into the last position grab the
            //  previous element's data context and add one to the rank
            newRank = Blaze.getData(before).rank + 1
          }
          else
            //else take the average of the two ranks of the previous
            // and next elements
            newRank = (Blaze.getData(after).rank +
                       Blaze.getData(before).rank)/2
 
          //update the dragged Item's rank
          console.log(newRank);
          Meteor.users.update({_id: template.data._id}, {$set: {"profile.schedule": newRank}})
          console.log("Done");
        }
    })
   /*
   dragula([document.querySelector('.sortable-ul')]).on('drop', function(el) {
      var list = $(".sortable-ul li").map(function() {
                    return [
                        {
                            client: $( this ).find( "#task" ).text(),
                            item: $( this ).find( "#client" ).text()
                        }
                        ];
                }).get();
    console.log(list);
    
    Meteor.call('registerUser', username,password,client,role,name);
 });
 */
 });
 
 
      Template.adminHomePage.onRendered(function() {
   
   Metronic.init(); // init metronic core componets
   Layout.init(); // init layout
   $(".mask_phone").mask("(999) 999-9999");
     
 });


Template.viewEmployee.helpers({
    employee: function() { return Meteor.users.findOne({_id:this._id}, { sort: { order: 1 } }); }, // Get info of currently selected client from the Clients collection
    
    ticket: function() { return Tickets.find({employee:this.username, $or: [ { status: "Open" }, { status: "Pending" } ]})},
    
    count_all: function() { return Tickets.find({employee:this.username, $or: [ { status: "Open" }, { status: "Pending" } ]}).count(); },
    
    count_tickets: function() { return Tickets.find({employee:this.username, $or: [ { status: "Open" }, { status: "Pending" } ]}).count(); },
    
    count_schedule: function() { 
        return this.profile.schedule.length },
    
    client: function() { return Clients.find(); }, // Get info of currently selected client from the Clients collection
    
    user: function() { return Meteor.users.find({id: this._id}); },

});
          
          
          
Template.adminHomePage.helpers({
    employee: function() { return Meteor.users.findOne({_id:Meteor.user()._id}); }, // Get info of currently selected client from the Clients collection
    
    ticket: function() {
        return Tickets.find({employee:Meteor.user().username, $or: [ { status: "Open" }, { status: "Pending" } ]})},
    
    count_all: function() { return Tickets.find({employee:Meteor.user().username, $or: [ { status: "Open" }, { status: "Pending" } ]}).count(); },
    
    count_tickets: function() { return Tickets.find({employee:Meteor.user().username, $or: [ { status: "Open" }, { status: "Pending" } ]}).count(); },
    
    count_schedule: function() { return Meteor.user().profile.schedule.length },
    
    client: function() { return Clients.find(); }, // Get info of currently selected client from the Clients collection
});



  Template.adminHomePage.events({
    
'click #schedule_complete': function (event, template) {
      event.preventDefault(); //prevent page reload
        var _id = Meteor.user()._id; // Set equal to the current id
      var item = this.item
        Meteor.call('scheduleComplete', _id,item);
    },
    
'click #view_task': function (event, template) {
      event.preventDefault(); //prevent page reload
        $("#modal3").modal("show");
        $("#task_modal3").val(this.item);
        console.log(this.client)
        $("#client_modal3").val(this.client); 
    },
    
    
'click #schedule_remove_all': function (event, template) {
      event.preventDefault(); //prevent page reload
      var id = Meteor.user()._id; // Set equal to the current id
        Meteor.call('scheduleRemoveAll', id);
        toastr.success("All Tasks Removed", "You successfully removed all the tasks!");
    },
    
    
'click #schedule_edit': function (event, template) {
      event.preventDefault(); //prevent page reload
      $('#item2').val(this.item);
      Session.set('itemVal', this.item);
      $("#client2").val(this.client);
      var id = Meteor.user()._id; // Set equal to the current id
      $("#modal2").modal("show");  
    },


'submit #modal2': function (event, template) {
      event.preventDefault(); //prevent page reload
      var client = $("#client2").val();
      var orig_item = Session.get('itemVal');
      var item = $('#item2').val();
      var id = Meteor.user()._id; // Set equal to the current id
      console.log("Start");
      Meteor.call('scheduleUpdate', id,item,client,orig_item);
      $("#modal2").modal("hide");  
      toastr.success("Task Updated", "You successfully updated the task!");

    },

'click #add_schedule_item': function (event, template) {
      event.preventDefault(); //prevent page reload
        $("#modal1").modal("show");
    },
    
    'submit #modal_form1': function (event, template) {
      event.preventDefault(); //prevent page reload
      var id = Meteor.user()._id; // Set equal to the current id
      console.log(id);
      var item = $('#item').val();
      console.log(item);
      var client = $("#client option:selected").text();
      console.log(client);
      Meteor.call('addSchedule', id,item,client);
      $('#item').val("");
      $("#client").prop('selectedIndex', 0);
      $("#modal1").modal("hide");
      toastr.success("Task Added", "You successfully added a task!");
    },

'click .fileinput-exists': function (event, template) {
      event.preventDefault(); //prevent page reload
      var id = Meteor.user()._id; // Set equal to the current id
      Meteor.call('emptyClientPic', id, function (error, result) {
      console.log("Picture is now empty");
                                        });
    },


        'submit .add_order': function (event, template) { // Run on click of "client" button
          event.preventDefault(); // prevent page reload
          // Set variables equal to html counterpart
          var name = event.target.name.value; 
          var email = event.target.email.value;
          var phone = event.target.phone.value;
          var notes = event.target.notes.value; 
          //
          
          // This groups together all email accounts into an array
                var schedule = $("input[name='schedule']").map(function() {
                    return this.value;
                }).get();
                //
          
            var id = Meteor.user()._id; // Set the currentId variable equal to the id of the current collection item.
            
                
                Meteor.call('updateEmployee', id,name,email,phone,schedule,notes);
                
                
                      var iconPic = event.target.icon_pic.files; 
                      console.log(iconPic);
                

                    for (var i = 0, ln = iconPic.length; i < ln; i++) {
                        Images.insert(iconPic[i], function (err, fileObj) {
        
                                if (err){
                                      toastr.error("Upload failed... please try again.");
                                } else {
                                    // handle success depending what you need to do
                                    var img = fileObj.url({brokenIsFine: true});
                                    var interval = Meteor.setInterval( function() {
                                    if (fileObj.isUploaded()) {
                                        Meteor.clearInterval(interval);
                                         Meteor.call('submitClient_Client', id,img, function (error, result) {
                                          toastr.success('You updated your profile!' );
                                        });
                                     }
                                     else {
                                          console.log("Not Ready!")
                                      }
                                    }, 50);
        
                                }
                            
                            });
                        
                        }

        },

        'click #remove_from_db': function (event, template) { // Run on click of "remove_from_db" button
         event.preventDefault(); // Prevent default actions
         var id = Meteor.user()._id; // Set equal to the current id
         Meteor.call('removeEmployee', id);
        Meteor.users.remove({_id:id});
        console.log("You removed:" + id);
        Router.go('home'); // This is going to route to the homepage after the user has removed the client from the db.
        toastr.success("Employee Removed", "You successfully added the client!");
////
    }
  
  });

/*********************************************
            Edit Inventory Item - FORM
/********************************************/                 
  Template.viewEmployee.events({
   
'click #view_task': function (event, template) {
      event.preventDefault(); //prevent page reload
        $("#view_task_modal").modal("show");
        $("#task_modal3").val(this.item);
        console.log(this.client)
        $("#client_modal3").val(this.client); 
    },   
   
    
'click #schedule_complete': function (event, template) {
      event.preventDefault(); //prevent page reload
      var _id = template.data._id; // Set equal to the current id
      var item = this.item
      Meteor.call('scheduleComplete', _id,item);
      toastr.success("Task Completed", "You successfully completed the task!");
    },
    
    
'click #schedule_remove_all': function (event, template) {
      event.preventDefault(); //prevent page reload
      var id = template.data._id; // Set equal to the current id
      Meteor.call('scheduleRemoveAll', id);
      toastr.success("All Tasks Removed", "You successfully removed all tasks!");
    },
    
    
'click #schedule_edit': function (event, template) {
      event.preventDefault(); //prevent page reload
      $('#item2').val(this.item);
      Session.set('itemVal', this.item);
      $("#client2").val(this.client);
      var id = template.data._id; // Set equal to the current id
      $("#modal2").modal("show");  
    },


'submit #modal2': function (event, template) {
      event.preventDefault(); //prevent page reload
      var client = $("#client2").val();
      var orig_item = Session.get('itemVal');
      var item = $('#item2').val();
      var id = template.data._id; // Set equal to the current id
      console.log("Start");
      Meteor.call('scheduleUpdate', id,item,client,orig_item);
      $("#modal2").modal("hide");  
      toastr.success("Task Updated", "You successfully updated the task!");
      console.log("End");
    },

'click #add_schedule_item': function (event, template) {
      event.preventDefault(); //prevent page reload
        $("#modal1").modal("show");
    },
    
    'submit #modal_form1': function (event, template) {
      event.preventDefault(); //prevent page reload
      var id = template.data._id; // Set equal to the current id
      var item = $('#item').val();
      var client = $("#client option:selected").text();
      Meteor.call('addSchedule', id,item,client);
      toastr.success("Task Added", "You successfully added the task!");
      $('#item').val("");
      $("#client").prop('selectedIndex', 0);
      $("#modal1").modal("hide");
    },


        'submit .add_order': function (event, template) { // Run on click of "client" button
          event.preventDefault(); // prevent page reload
          // Set variables equal to html counterpart
          var name = event.target.name.value; 
          var email = event.target.email.value;
          var phone = event.target.phone.value;
          var notes = event.target.notes.value; 
          //
          
          // This groups together all email accounts into an array
                var schedule = $("input[name='schedule']").map(function() {
                    return this.value;
                }).get();
                //
          
            var id = template.data._id; // Set the currentId variable equal to the id of the current collection item.
            
                
                Meteor.call('updateEmployee', id,name,email,phone,schedule,notes);
        },

        'click #remove_from_db': function (event, template) { // Run on click of "remove_from_db" button
         event.preventDefault(); // Prevent default actions
         var id = template.data._id; // Set equal to the current id
         Meteor.call('removeEmployee', id);
                Meteor.users.remove({_id:id});
                console.log("You removed:" + id);
                Router.go('home'); // This is going to route to the homepage after the user has removed the client from the db.
////
    },

  
  });