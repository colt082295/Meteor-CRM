/*********************************************
          START MONGODB COLLECTIONS
/********************************************/  
Posts = new Meteor.Collection('posts');
Test = new Meteor.Collection('test');
Clients = new Meteor.Collection('clients');
Tickets = new Meteor.Collection('tickets');
Orders = new Meteor.Collection('orders');
Services = new Meteor.Collection('services');
Service_Groups = new Meteor.Collection('service_groups');
ScreenConnect = new Meteor.Collection('screenconnect');
Inventory = new Meteor.Collection('inventory');
Employees = new Meteor.Collection('employees');
Quotes = new Meteor.Collection('quotes');
Purchase_Orders = new Meteor.Collection('purchase_orders');
Vendor = new Meteor.Collection('vendor');
Images = new FS.Collection("images", {
  stores: [new FS.Store.FileSystem("images", {path: "/var/uploads"})]
});

End = new Meteor.Collection('end');




   






/*********************************************
           END MONGODB COLLECTIONS
/********************************************/  


/*********************************************
              If it's a client
/********************************************/ 

if (Meteor.isClient) {
  
  
  /*
Meteor.startup(function () {
   editor = new $.fn.dataTable.Editor( {} );
  });
  */
  
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                  BASIC CONFIGURATION                                                        //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  
Blaze._allowJavascriptUrls(); // to allow the action="javascript:" in urls/links


  // Use usernames instead of emails for accounts
Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY" // Use a username only and not email for account registration.
});


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                  START  HELPERS                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


        
        //-------------------------------------------------START SIDEBAR SEARCH-------------------------------------------------//                                                         
        
        
        
          Template.clientSideSearch.helpers({ // This searches shows the list of clients in the sidebar search.
            settings: function() {
              return {
                position: Session.get("position"),
                limit: 10,
                rules: [
                  {
                    // token: '',
                    collection: Clients,
                    field: 'company',
                    matchAll: false,
                    template: Template.standardClientSideSearch
                  }
                ]
              };
            },
            legends: function() {
              return Clients.find(); // This returns the info from the Clients collection
            }
          });
            
            
                    Template.vendorSideSearch.helpers({ // This searches shows the list of clients in the sidebar search.
            settings: function() {
              return {
                position: Session.get("position"),
                limit: 10,
                rules: [
                  {
                    // token: '',
                    collection: Vendor,
                    field: 'vendor',
                    matchAll: false,
                    template: Template.standardVendorSideSearch
                  }
                ]
              };
            },
            legends: function() {
              return Vendor.find(); // This returns the info from the Clients collection
            }
          });
            
            
          Template.quoteSideSearch.helpers({ // This search shows the list of quotes in the sidebar search.
            settings: function() {
              return {
                position: Session.get("position"),
                limit: 10,
                rules: [
                  {
                    // token: '',
                    collection: Tickets,
                    field: 'company',
                    matchAll: false,
                    template: Template.standardQuoteSideSearch,
                    noMatchTemplate: Template.standardQuoteNoMatch
                  }
                ]
              };
            },
            legends: function() {
              return Quotes.find(); // This returns the info from the Quotes collection.
            }
          });
          
          
          Template.ticketSideSearch.helpers({ // This search shows the list of tickets in the sidebar search.
            settings: function() {
              return {
                position: Session.get("position"),
                limit: 10,
                rules: [
                  {
                    // token: '',
                    collection: Tickets,
                    field: 'company',
                    matchAll: false,
                    template: Template.standardTicketSideSearch,
                    noMatchTemplate: Template.standardTicketNoMatch
                  }
                ]
              };
            },
            legends: function() {
              return Tickets.find(); // This returns the info from the Tickets collection.
            }
          });
          
          
          Template.inventorySideSearch.helpers({ // This search shows the list of inventory in the sidebar search.
            settings: function() {
              return {
                position: Session.get("position"),
                limit: 10,
                rules: [
                  {
                    // token: '',
                    collection: Inventory,
                    field: 'item',
                    matchAll: false,
                    template: Template.standardInventorySideSearch,
                    noMatchTemplate: Template.standardInventoryNoMatch
                  }
                ]
              };
            },
            legends: function() {
              return Inventory.find(); // This returns the info from the Inventory collection.
            }
          });
          
          
          Template.orderSideSearch.helpers({ // This search shows the list of orders in the sidebar search.
            settings: function() {
              return {
                position: Session.get("position"),
                limit: 10,
                rules: [
                  {
                    // token: '',
                    collection: Orders,
                    field: 'item',
                    matchAll: false,
                    template: Template.standardOrderSideSearch,
                    noMatchTemplate: Template.standardOrderNoMatch
                  }
                ]
              };
            },
            legends: function() {
              return Orders.find(); // This returns the info from the Order collection.
            }
          });
          
          
          Template.serviceSideSearch.helpers({ // This search shows the list of services in the sidebar search.
            settings: function() {
              return {
                position: Session.get("position"),
                limit: 10,
                rules: [
                  {
                    // token: '',
                    collection: Services,
                    field: 'service',
                    matchAll: false,
                    template: Template.standardServiceSideSearch,
                    noMatchTemplate: Template.standardServiceNoMatch
                  }
                ]
              };
            },
            legends: function() {
              return Service.find(); // This returns the info from the Services collection.
            }
          });
          
          
          Template.serviceGroupSideSearch.helpers({ // This search shows the list of service groups in the sidebar search.
            settings: function() {
              return {
                position: Session.get("position"),
                limit: 10,
                rules: [
                  {
                    // token: '',
                    collection: Service_Groups,
                    field: 'service_group',
                    matchAll: false,
                    template: Template.standardServiceGroupSideSearch,
                    noMatchTemplate: Template.standardServiceGroupNoMatch
                  }
                ]
              };
            },
            legends: function() {
              return Service_Groups.find(); // This returns the info from the Service_Groups collection.
            }
          });
          
          
          Template.purchaseOrdersSideSearch.helpers({ // This search shows the list of purchase orders in the sidebar search.
            settings: function() {
              return {
                position: Session.get("position"),
                limit: 10,
                rules: [
                  {
                    // token: '',
                    collection: Purchase_Orders,
                    field: 'item',
                    matchAll: false,
                    template: Template.purchaseOrdersSideSearch,
                    noMatchTemplate: Template.standardOrderNoMatch
                  }
                ]
              };
            },
            legends: function() {
              return Purchase_Orders.find(); // This returns the info from the Purchase_Orders collection.
            }
          });
        
        
          // Show/Sort the clients list in the sidebar
          Template.clientsListSidebar.helpers({
            posts: function() {
              return Clients.find({}, {sort: {createdAt:-1}, limit:5});
            }
          });
          
          
          // Show/Sort the clients list in the sidebar
          Template.vendorSidebar.helpers({
            vendor: function() {
              return Vendor.find({}, {sort: {createdAt:-1}, limit:5});
            }
          });
          
          
          // Show/Sort the quotes list in the sidebar
          Template.quotesSidebar.helpers({
            posts: function() {
              return Quotes.find({}, {sort: {createdAt:-1}, limit:5});
            }
          });
          
          
            // Show/Sort the purchase orders list in the sidebar
          Template.purchaseOrdersSidebar.helpers({
            posts: function() {
              return Purchase_Orders.find({}, {sort: {createdAt:-1}, limit:5});
            }
          });
          
          
                      // Show/Sort the purchase orders list in the sidebar
          Template.addPurchaseOrder.helpers({
            vendor: function() {
              return Vendor.find({}, {sort: {createdAt:-1}, limit:5});
            }
          });
          
            
            // Show/Sort the services list in the sidebar
          Template.servicesSidebar.helpers({
            service_group: function() {
              return Service_Groups.find({}, {sort: {createdAt:-1}, limit:5});
            },
            service: function() {
              return Services.find({}, {sort: {createdAt:-1}, limit:5});
            },
          });
          
          
            // Show/Sort the inventory list in the sidebar
              Template.inventoryListSidebar.helpers({
            posts: function() {
              return Inventory.find({}, {sort: {createdAt: -1}, limit:5});
            }
          });
          
            // Show/Sort the orders list in the sidebar
              Template.ordersListSidebar.helpers({
            posts: function() {
              return Orders.find({}, {sort: {createdAt: -1}, limit:5});
            }
          });
          
          
          // Show/Sort the orders list in the sidebar
              Template.employeesSidebar.helpers({
            posts: function() {
              return Meteor.users.find({"profile.client": "STC Network Services"}, {sort: {createdAt: -1}});
            }
          });


          //-------------------------------------------------END SIDEBAR SEARCH-------------------------------------------------//    


          //--------------------------------------------------START EQUATIONS--------------------------------------------------//    

          Template.registerHelper('maybeSelectedId', function() {
            var currentRoute = Router.current();
            return currentRoute &&
              this._id === currentRoute.params._id ? 'active' : '';
          });

          Template.registerHelper("selectedIfEquals",function(left,right){
          return left==right?"selected":"";
          });
          
          Template.registerHelper("dayOld",function(v1){ // Checking if the date is over a day ago
            var past = v1.getTime();
            var today = new Date().getTime();
            var oneDay = 86400000; // One day in milliseconds
            return (today - past > oneDay);
          });
          
          Template.registerHelper("isEmpty", function (object) {
              return jQuery.isEmptyObject(object);
          });
          
          
          // This sets an equals helper to test equality in html files.
          Template.registerHelper("equals", function (a, b) {
            return (a == b);
          });
          
          
          Template.registerHelper('isEqual', function (lhs, rhs) {
              return lhs === rhs;
          });
          
          
          Template.registerHelper('isSelected', function(value1, value2) {
              if (value1 == value2) {
                return ""
            } else { 
                return "='false'"
            }
                  
          
          });
          


          //---------------------------------------------------END EQUATIONS---------------------------------------------------//    


          //---------------------------------------------------START IMPORT---------------------------------------------------//

          Template.viewClient.helpers({
            db: function() { return Clients.findOne({_id:this._id}); }, // Get info of currently selected client from the Clients collection
          });
          
          
          Template.viewServiceGroup.helpers({
            service_group: function() {
              return Service_Groups.find(); // This returns the info from the Services collection.
            },
          });
          
          
          Template.viewService.helpers({
            service_group: function() {
              return Service_Groups.find(); // This returns the info from the Services collection.
            },
          });
          
          
          Template.addService.helpers({
            service_group: function() {
              return Service_Groups.find(); // This returns the info from the Services collection.
            },
          });
          
          // Show/Sort the tickets list in the sidebar
          Template.viewTicketsSidebar.helpers({
            posts: function() {
              return Tickets.find({}, {sort: {createdAt: -1}, limit:5});
            },
            maybeSelected: function () {
                var currentRoute = Router.current();
                return currentRoute &&
                  this._id === currentRoute.params._id ? 'active' : '';
              }
          });
          
          
          // All Clients Page results
              Template.allClientsList.helpers({
            clients: function() {
              return Clients.find({}, {sort: {createdAt: -1}});
            }
          });


            /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            //                                                  END HELPERS                                                                //
            /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            
            
            
            /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            //                                                   START STARTUP                                                             //
            /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            
            
            Meteor.startup(function() {
               
            });
            
            
            /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            //                                                   END HELPERS                                                               //
            /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            
            
            
            /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            //                                                   START TESTING                                                             //
            /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

              /*
              
              
              
              Template.clientSideSearch.helpers({ // This searches shows the list of clients in the sidebar search.
                settings: function() {
                  return {
                    position: Session.get("position"),
                    limit: 10,
                    rules: [
                      {
                        // token: '',
                        collection: Clients,
                        field: 'company',
                        matchAll: false,
                        template: Template.standardClientSideSearch
                      }
                    ]
                  };
                },
                legends: function() {
                  return Clients.find(); // This returns the info from the Clients collection
                }
              });
              
              
              
              Template.ticketSideSearch.helpers({ // This search shows the list of tickets in the sidebar search.
                settings: function() {
                  return {
                    position: Session.get("position"),
                    limit: 10,
                    rules: [
                      {
                        // token: '',
                        collection: Tickets,
                        field: 'company',
                        matchAll: false,
                        template: Template.standardTicketSideSearch,
                        noMatchTemplate: Template.standardTicketNoMatch
                      }
                    ]
                  };
                },
                legends: function() {
                  return Tickets.find(); // This returns the info from the Tickets collection.
                }
              });
              
              
              */
              







            /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            //                                                   END TESTING                                                               //
            /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


} // END CLIENT SECTION


/*********************************************
              SERVER SECTION - START
/********************************************/ 


if (Meteor.isServer) {
  Meteor.startup(function () {

   
  });
  
  Sortable.collections = Meteor.users;  // the name, not the variable
  
  process.env.MAIL_URL="smtp://contactcolt%40gmail.com:mynameiscolton95@smtp.gmail.com:465/"; 
  
  
  Images.allow({
  'insert': function () {
    // add custom authentication code here
    return true;
  }
});


  
  
  Meteor.methods({
    /***************START CLIENT*******************/
    
'add_email_modal': function(id,email){
    Clients.update({_id:id}, {
        $push: {
            email_account: email
        }
      });
    },
  
'remove_client_db': function(id){
    Clients.remove({_id:id});
},

'remove_email': function(id,email){
    Clients.update({_id:id}, {
        $pull: {
            email_account: email,
        }
      });
    },

'remove_all_emails': function(id){
    Clients.update({_id:id}, {
        $pull: {
            email_account: {$exists: true}
        }
      });
    },
    
'update_client': function(id,companyName,shippingAddress,shippingCity,shippingState,shippingZip,contactName,contactPhone,contactEmail,values,user,notes,date_full,date,time,hours,minutes,ampm){
    Clients.update({_id:id}, {
      company: companyName,
      shipping_address: shippingAddress,
      shipping_city: shippingCity,
      shipping_state: shippingState,
      shipping_zip: shippingZip,
      contact_name: contactName,
      contact_phone: contactPhone,
      contact_email: contactEmail,
      email_account: values,
      //website: website,
      user: Meteor.user().username,  // username of logged in user
      notes: notes,
      date_full: new Date(), // Save full time to its own variable in case needed for extraction
      date: (new Date().getMonth()+ 1)+'/'+ new Date().getDate()+'/'+ new Date().getFullYear(), // Format the month/date/year correctly
      time: hours + ':' + minutes + ' ' + ampm // Save the correctly formatted version of the hour/minute.
      });
      
    },
  
  'add_client': function(companyName,shippingAddress,shippingCity,shippingState,shippingZip,contactName,contactPhone,contactEmail,emails,user,notes,date_full,date,time,hours,minutes,ampm){
      Clients.insert({
        company: companyName,
        shipping_address: shippingAddress,
        shipping_city: shippingCity,
        shipping_state: shippingState,
        shipping_zip: shippingZip,
        contact_name: contactName,
        contact_phone: contactPhone,
        contact_email: contactEmail,
        email_account: emails,
        //website: website,
        user: Meteor.user().username,  // username of logged in user
        notes: notes,
        date_full: new Date(), // Save full time to its own variable in case needed for extraction
        date: (new Date().getMonth()+ 1)+'/'+ new Date().getDate()+'/'+ new Date().getFullYear(), // Format the month/date/year correctly
        time: hours + ':' + minutes + ' ' + ampm // Save the correctly formatted version of the hour/minute.
        });
      
    },
    
    
    /***************END CLIENT*******************/
    
    
    
    /***************START EMPLOYEES*******************/
  
'scheduleComplete': function(_id,item){
    Meteor.users.update({_id: _id, "profile.schedule.item": item}, {
        $unset: { // unset may need to be pull
            "profile.schedule.$": 1
        }
      }, {multi:true}
      );
    Meteor.users.update({_id: _id}, {
        $pull: { 
            "profile.schedule": null
        }
      }
      );
    },
    
'scheduleRemoveAll': function(id){
    Meteor.users.update({_id:id}, {
        $pull: {
            "profile.schedule": {$exists: true}
        }
      });
    },
    
    
'scheduleUpdate': function(id,item,client,orig_item){
    Meteor.users.update({_id: id, "profile.schedule.item": orig_item}, {
        $set: {
            'profile.schedule.$': {
              item: item,
              client: client
            }
        }
      }, {multi: true});
    },
    
    
'addSchedule': function(id,item,client){
    Meteor.users.update({_id:id}, {
        $push: {
            "profile.schedule": {
                item: item,
                client: client
            }
        }
            });
    },
    
    
'emptyClientPic': function(id){
    Meteor.users.update({_id:Meteor.user()._id}, {
        $set: {
            "profile.picture": null
        }
      });
    },
    
    
'updateEmployee': function(id,name,email,phone,schedule,notes){
    // Get the time, and convert it from 24 to 12 hour
    var hours = new Date().getHours();
    var minutes = new Date().getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    Meteor.users.update({_id:id}, {
        $set: { "profile.info": {
        name: name,
        email: email,
        phone: phone,
        notes: notes,
        schedule: schedule,
        user: Meteor.user().username,  // username of logged in user
        date_full: new Date(), // Save full time to its own variable in case needed for extraction
        date: (new Date().getMonth()+ 1)+'/'+ new Date().getDate()+'/'+ new Date().getFullYear(), // Format the month/date/year correctly
        time: hours + ':' + minutes + ' ' + ampm // Save the correctly formatted version of the hour/minute.
        }}
        },{multi: true});
    },
    
    
'submitClient_Client': function(id,img){
    Meteor.users.update({_id:Meteor.user()._id}, {
        $set: {
            "profile.picture": img
        }
      });
    }, 
    
    
'removeEmployee': function(id){
    Meteor.users.remove({_id:id});
    },
    
    
    
    /***************END EMPLOYEES*******************/
    
    
    
    /**************START INVENTORY*******************/
    
    'updateInventory': function(id,item,barcode_qr,barcode_format,itemQty,qr,description,user,date_full,date,time){
        Inventory.update({_id:id}, {
                  $set: {
                    item: item,
                    barcode_qr: barcode_qr,
                    barcode_format: barcode_format,
                    item_qty: itemQty,
                    qr: qr,
                    description: description,
                    inventory: "client",
                    user: user,  // username of logged in user
                    date_full: date_full, // Save full time to its own variable in case needed for extraction
                    date: date, // Format the month/date/year correctly
                    time: time // Save the correctly formatted version of the hour/minute.
                  }
                });
    }, 
    
    
    'setDelivered': function(id,item,barcode_qr,barcode_format,itemQty,qr,description,user,date_full,date,time){
        Inventory.update({_id:id}, {
                  $set: {
                    item: item,
                    item_qty: itemQty,
                    barcode_qr: barcode_qr,
                    barcode_format: barcode_format,
                    qr: qr,
                    description: description,
                    inventory: "delivered",
                    user: user,  // username of logged in user
                    date_full: date_full, // Save full time to its own variable in case needed for extraction
                    date: date, // Format the month/date/year correctly
                    time: time // Save the correctly formatted version of the hour/minute.
                  }
                });
    }, 
    
    
    'setReturned': function(id,item,barcode_qr,barcode_format,itemQty,qr,description,user,date_full,date,time){
        Inventory.update({_id:id}, {
                  $set: {
                    item: item,
                    item_qty: itemQty,
                    barcode_qr: barcode_qr,
                    barcode_format: barcode_format,
                    qr: qr,
                    description: description,
                    inventory: "delivered",
                    user: user,  // username of logged in user
                    date_full: date_full, // Save full time to its own variable in case needed for extraction
                    date: date, // Format the month/date/year correctly
                    time: time // Save the correctly formatted version of the hour/minute.
                  }
                });
    }, 
    
    
    'updateInventory2': function(id,item,barcode_qr,barcode_format,itemQty,qr,description,user,date_full,date,time){
        Inventory.update({_id:id}, {
              $set: {
                item: item,
                item_qty: itemQty,
                barcode_qr: barcode_qr,
                barcode_format: barcode_format,
                qr: qr,
                description: description,
                user: user,  // username of logged in user
                date_full: date_full, // Save full time to its own variable in case needed for extraction
                date: date, // Format the month/date/year correctly
                time: time // Save the correctly formatted version of the hour/minute.
              }
            });
    }, 
    
    
    'removeInventory': function(id){
        Inventory.remove({_id:id});
    }, 
    
    
    'insertInventory': function(id,item,itemQty,barcode_qr,barcode_format,qr,description,user,date_full,date,time){
        Inventory.insert({
              inventory: "stc",
                item: item,
                item_qty: itemQty,
                barcode_qr: barcode_qr,
                barcode_format: barcode_format,
                qr: qr,
                description: description,
                user: user,  // username of logged in user
                date_full: date_full, // Save full time to its own variable in case needed for extraction
                date: date, // Format the month/date/year correctly
                time: time // Save the correctly formatted version of the hour/minute.
            });
    }, 
    
    
    
    /***************END INVENTORY*******************/
    
    
    
    /***************START ORDERS*******************/
    
    'insertOrder': function(order,user,date_full,date,time){
        Orders.insert({
                order: order,
                user: user,  // username of logged in user
                date_full: date_full,
                date: date,
                time: time
              });
    }, 
    
    
    'removeOrder': function(id){
        Orders.remove({_id:id});
    }, 
    
    
    'updateOrder': function(id,order,notes,user,date_full,date,time){
        Orders.update({_id:id}, {
                order: order,
                notes: notes,
                user: user,  // username of logged in user
                date_full: date_full, // Save full time to its own variable in case needed for extraction in future.
                date: date, // Format the month/date/year correctly
                time: time // Save the correctly formatted version of the hour/minute.
              });
    }, 
    
    /***************END ORDERS*******************/
    
    
    /***************START PO*******************/
    
    'insertPO': function(company,vendor,item,item_qty,notes,user,date_full,date,time){
        Purchase_Orders.insert({
                company: company,
                vendor: vendor,
                item: item,
                item_qty: item_qty,
                notes: notes,
                user: user,  // username of logged in user
                date_full: date_full,
                date: date,
                time: time
              });
    }, 
    
    
    'removePO': function(id){
        Purchase_Orders.remove({_id:id});
    }, 
    
    
    'updatePO': function(id,company,vendor,item,item_qty,notes,user,date_full,date,time){
        Purchase_Orders.update({_id:id}, {
                company: company,
                vendor: vendor,
                item: item,
                item_qty: item_qty,
                notes: notes,
                user: user,
                date_full: date_full,
                date: date,
                time: time
              });
    }, 
    
    /***************END PO*******************/
    
    
    
    /***************START QUOTES*******************/
    
    
    
    /***************END QUOTES*******************/
    
    
    
    /***************START SERVICES*******************/
    
    
    
    /***************END SERVICES*******************/
    
    
    
    /***************START SIDEBAR*******************/
    
    
    
    /***************END SIDEBAR*******************/
    
    
    
    /***************START TICKETS*******************/
    
    
    
    /***************END TICKETS*******************/
    
    
    
    /***************START VENDORS*******************/
    
    
    
    /***************END VENDORS*******************/
    
    'sendEmail': function (to, from, subject, text) {
  check([from, subject, text], [String]);
    // Let other method calls from the same client start running,
    // without waiting for the email sending to complete.
    this.unblock();

    Email.send({
      to: to,
      from: from,
      subject: subject,
      text: text
    });
  },
    
    'registerUser': function(username,password,client,role,name){
    var id = Accounts.createUser({username: username,password: password,profile: { client: client, info: { name: name }}});
    console.log(id);
    Roles.addUsersToRoles(id, role);
    },
    
    
    'updateTicket': function(id,config,notes,timeWorked,modal_radio1,modal_radio2,modal_radio3,modal_radio4){
 
 Meteor.users.update({_id: id, "profile.saved_configs.config": config
        }, {
            $set:{ 
                'profile.saved_configs.$': {
            config: config,
            notes: notes,
            time_worked: timeWorked,
            modal1: modal_radio1,
            modal2: modal_radio2,
            modal3: modal_radio3,
            modal4: modal_radio4,
                 }
            }
        }
    );
    },
    
    
    
        'updateTicket1': function(id,companyName,client,contactPhone,contactEmail,notes,priority,ticket_status,employee,user,date_full,date,time){
 
Tickets.update({_id:id}, { // Update all the collection info with what is currently entered.
                company: companyName,
                client_name: client,
                contact_phone: contactPhone,
                contact_email: contactEmail,
                notes: notes,
                priority: priority,
                status: ticket_status,
                employee: employee,
                user: Meteor.user().username,  // username of logged in user
                date_full: date_full, // Save full time to its own variable in case needed for extraction.
                date: date, // Format the month/date/year correctly
                time: time // Save the correctly formatted version of the hour/minute.
              });
    },
    
    
    

    
    
    'removeConfigModal3': function(config,id){
  console.log("Start");
 console.log(id);
 console.log(config);
 Meteor.users.update({_id: id, "profile.saved_configs.config": config}, {
            $unset: { // unset may need to be pull
                "profile.saved_configs.$": 1
            }
        }, {multi:true}
        );
   Meteor.users.update({_id: id}, {
            $pull: { 
                "profile.saved_configs": null
            }
        }
        );
        console.log("End");
    },
    
    
'removeItemClientPortal_Admin': function(test,item1){
  console.log("Start");
Clients.update({_id: item1, 'portal.icon_name':test}, {
                    $unset: {
                        'portal.$': 1
                    }
                },{multi:true}),
                
Clients.update({_id: item1}, {
    $pull: {
        'portal': null
    }
})
        console.log("End");
    },
    
    
'removeItemClientPortal_Client': function(test){
  console.log("Start");
  console.log(Meteor.user()._id);
Meteor.users.update({_id: Meteor.user()._id, 'profile.portal.icon_name':test}, {
                    $unset: {
                        'profile.portal.$': 1
                    }
                },{multi:true}),
                
Meteor.users.update({_id: Meteor.user()._id}, {
    $pull: {
        'profile.portal': null
    }
})
        console.log("End");
    },
    
    
'addClientPortalItem_Admin': function(id,iconName,iconLink,iconPic){
  console.log("Start");
Clients.update({_id:id}, {
  $push: { portal: {
    icon_name: iconName,
    icon_link: iconLink,
    icon_pic: iconPic,
    }
  }
});
        console.log("End");
    },
    
    

    
    
'submitClient_Admin': function(id,iconName,iconLink,img){
  console.log("Start");
Clients.update({_id:id}, {
                        $push: { portal: {
                        icon_name: iconName,
                        icon_link: iconLink,
                        icon_pic: img
                        }
                        }
                        });
        console.log("End");
    },
    
    
 
    

    
    
    
    

    
    
    

  

});





}


/*********************************************
              SERVER SECTION - END
/********************************************/ 



/*********************************************
              COMMON SECTION - START
/********************************************/ 


Meteor.startup(function () {
TabularTables = {};

TabularTables.Clients = new Tabular.Table({
  name: "Clients",
  collection: Clients,
  columns: [
    {data: "company", title: "Company"},
    {data: "contact_name", title: "Contact Name"},
    {data: "contact_email", title: "Email"},
    {data: "contact_phone", title: "Phone"},
    {data: "shipping_city", title: "City"},
    {data: "shipping_state", title: "State"},
    {data: "shipping_zip", title: "Zip"},
    {
      title: "Edit",
      tmpl: Meteor.isClient && Template.bookCheckOutCell,
    },
  ],
}); 


TabularTables.Tickets = new Tabular.Table({
  name: "Tickets",
  collection: Tickets,
  columns: [
    {data: "company", title: "Company"},
    {data: "client_name", title: "Client"},
    {data: "contact_email", title: "Email"},
    {
      data: "status",
      title: "Status",
      render: function (val, type, doc) {
        if (val === "Open") {
          return "<span class='item-status'>\
									  <span class='label label-sm label-danger'>\
									  Open</span>\
									</span>";
        } else if (val === "Pending") {
          return "<span class='item-status'>\
									  <span class='label label-sm label-warning'>\
									  Pending</span>\
									</span>";
        } else if (val === "Closed") {
          return "<span class='item-status'>\
									  <span class='label label-sm label-success'>\
									  Closed</span>\
									</span>";
        }
      }
    },
    {data: "notes", title: "Notes", id: "notes"},
    {
      title: "Edit",
      tmpl: Meteor.isClient && Template.edit_ticket_list,
    },
  ],
}); 
});

/*********************************************
              COMMON SECTION - END
/********************************************/ 