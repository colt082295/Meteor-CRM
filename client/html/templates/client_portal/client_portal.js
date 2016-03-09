    Template.viewClientPortal.onRendered(function() {
   $('body').attr('class', 'page-md page-header-fixed page-quick-sidebar-over-content page-full-width');
   
    Metronic.init(); // init metronic core componets
   Layout.init(); // init layout
   $(".page-sidebar-menu li").has(".active").addClass( "active" );
});


     Template.editClientPortal.onRendered(function() {
   
   Metronic.init(); // init metronic core componets
   Layout.init(); // init layout
   $(".page-sidebar-menu li").has(".active").addClass( "active" );
     
 });
 
 
      Template.viewClientPortal.onRendered(function() {
   
   Metronic.init(); // init metronic core componets
   Layout.init(); // init layout
   $(".page-sidebar-menu li").has(".active").addClass( "active" );
     
 });


Template.editClientPortal.events({

                'click #add_admin' : function(event, template) { // Run when form is submitted
        
        
                event.preventDefault(); // prevent page reload
                $("#modal1").modal("show");
                    
                    console.log("Opened!"); // Display if everything worked correctly.

    
    },
    
        'click #remove_item_admin' : function(event, template) { // Run when form is submitted
        
        
                event.preventDefault(); // prevent page reload
                var test = this.icon_name
                var item = Clients.findOne({'portal.icon_name':test});
                console.log(item);
                var item1 = item._id;
                console.log(item1);
                Meteor.call('removeItemClientPortal_Admin', test,item1);
                console.log(test);
                console.log(item);

    
    },
    
                'submit #modal1' : function(event, template) { // Run when form is submitted
        
        
                event.preventDefault(); // prevent page reload
                var id = this._id; // Set equal to the current id
                //// Set variables equal to html counterpart
                var iconName = event.target.icon_name.value;
                var iconLink = event.target.icon_link.value; 
                var iconPic = event.target.icon_pic.value; 
                console.log(id);
                
                if(Roles.userIsInRole(Meteor.user(), 'admin')){
                    Meteor.call('addClientPortalItem_Admin', id,iconName,iconLink,iconPic);
                };

                    console.log("It Worked!"); // Display if everything worked correctly.
                
                
                return false; // Prevent default form submit
    
    },

});

Template.viewClientPortal.events({
    
    'taphold #client_portal_admin': function(e, template) {
            alert("Taphold!")
        },
    
    
    'mousedown #client_portal_admin': function(e, template) {
            if (e.button == 2) {
            console.log("right clicked");
            Session.set("client_portal_admin", this.icon_name);
            console.log(Session.get("client_portal_admin"))
        }
    },
    
    'mousedown #client_portal_client': function(e, template) {
            if (e.button == 2) {
            console.log("right clicked");
            Session.set("client_portal_client", this.icon_name);
            console.log(Session.get("client_portal_client"))
        }
    },
    

    
                'click #add_admin' : function(event, template) { // Run when form is submitted
        
        
                event.preventDefault(); // prevent page reload
                $("#modal1").modal("show");
                    
                    console.log("Opened!"); // Display if everything worked correctly.

    
    },
    
    
                    'click #add_client' : function(event, template) { // Run when form is submitted
        
        
                event.preventDefault(); // prevent page reload
                $("#modal2").modal("show");
                    
                    console.log("Opened!"); // Display if everything worked correctly.

    
    },
    
    'click #remove_item_admin' : function(event, template) { // Run when form is submitted
        
                event.preventDefault(); // prevent page reload
                var test = Session.get("client_portal_admin")
                console.log(test);
                var item = Clients.findOne({'portal.icon_name':test});
                console.log(item);
                var item1 = item._id;
                console.log(item1);
                Meteor.call('removeItemClientPortal_Admin', test,item1);

    
    },
    
    'click #remove_item_client' : function(event, template) { // Run when form is submitted
        
        
                event.preventDefault(); // prevent page reload
                var test = Session.get("client_portal_client")
                Meteor.call('removeItemClientPortal_Client', test);
                console.log(test);

    
    },
    
    
            'submit #modal1' : function(event, template) { // Run when form is submitted
        
        
                event.preventDefault(); // prevent page reload
                var admin = Clients.findOne({company:Meteor.user().profile.client}); // Set equal to the current id
                //// Set variables equal to html counterpart
                var iconName = event.target.icon_name.value;
                var iconLink = event.target.icon_link.value; 
                var iconPic = event.target.icon_pic.files; 
                console.log(admin);
                
                if(Roles.userIsInRole(Meteor.user(), 'admin')){
                    
                    for (var i = 0, ln = iconPic.length; i < ln; i++) {
                        Images.insert(iconPic[i], function (err, fileObj) {
        
                            if (err){
                                  // handle error
                                } else {
                                    // handle success depending what you need to do
                                    var img = fileObj.url({brokenIsFine: true});
                                    var id = admin._id
                                    var interval = Meteor.setInterval( function() {
                                    if (fileObj.isUploaded()) {
                                        Meteor.clearInterval(interval);
                                         Meteor.call('submitClient_Admin', id,iconName,iconLink,img, function (error, result) {
                                          $("#modal1").modal("hide");
                                          console.log("It's Ready!")
                                        });
                                     }
                                     else {
                                          console.log("Not Ready!")
                                      }
                                    }, 50);

                                }
                            
                            });
                        
                        }
                        
                    
                
                        
    

                    console.log("It Worked!"); // Display if everything worked correctly.
                
                
                return false; // Prevent default form submit
    
    }
            },
    
    
    
            'submit #modal2' : function(event, template) { // Run when form is submitted
        
                event.preventDefault(); // prevent page reload
                var id = Meteor.user()._id    
                //// Set variables equal to html counterpart
                var iconName = event.target.icon_name2.value;
                var iconLink = event.target.icon_link2.value; 
                var iconPic = event.target.icon_pic2.files; 
                console.log(id);
                
                    
                    for (var i = 0, ln = iconPic.length; i < ln; i++) {
                        Images.insert(iconPic[i], function (err, fileObj) {
        
                            if (err){
                                  // handle error
                                } else {
                                    // handle success depending what you need to do
                                    var img = fileObj.url({brokenIsFine: true});
                                    var interval = Meteor.setInterval( function() {
                                    if (fileObj.isUploaded()) {
                                        Meteor.clearInterval(interval);
                                         Meteor.call('submitClient_Client', id,iconName,iconLink,img, function (error, result) {
                                          $("#modal2").modal("hide");
                                          console.log("It's Ready!")
                                        });
                                     }
                                     else {
                                          console.log("Not Ready!")
                                      }
                                    }, 50);

                                }
                            
                            });
                        
                        }
        

                    console.log("It Worked!"); // Display if everything worked correctly.
                
                
                return false; // Prevent default form submit
    
    }
});

Template.viewClientPortal.helpers({
    
    
  user: function() { return Meteor.user() },
  client: function() { return Clients.findOne({company:Meteor.user().profile.client}); }, // Get info of currently selected client from the Clients collection
  });
 