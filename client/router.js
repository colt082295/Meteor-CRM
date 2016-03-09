Router.map(function(){
    // This routes the template to a specificed link
    this.route('home', {path: '/', fastRender: true} );
    this.route('clientsPage', {path: '/clients', fastRender: true});
    this.route('addClientPage', {path: '/add-client', fastRender: true});
    this.route('addTicketPage', {path: '/add-ticket', fastRender: true});
    this.route('addOrderPage', {path: '/add-order', fastRender: true});
    this.route('TicketsPage', {path: '/tickets', fastRender: true});
    this.route('viewOrdersPage', {path: '/view-orders', fastRender: true});
    this.route('loginPage', {path: '/login', fastRender: true});
    this.route('registerPage', {path: '/register', fastRender: true});
    this.route('inventoryPage', {path: '/inventory', fastRender: true});
    this.route('addInventoryItemPage', {path: '/add-inventory-item', fastRender: true});
    this.route('clientPortalPage', {path: '/client', fastRender: true});
    this.route('adminPage', {path: '/admin', fastRender: true});
    this.route('viewQuotesPage', {path: '/quotes', fastRender: true});
    this.route('addQuotePage', {path: '/add-quote', fastRender: true});
    this.route('addPurchaseOrderPage', {path: '/add-purchase-order', fastRender: true});
    this.route('addServicePage', {path: '/add-service', fastRender: true});
    this.route('addServiceGroupPage', {path: '/add-service-group', fastRender: true});
    this.route('addVendorPage', {path: '/add-vendor', fastRender: true});
    this.route('addEmployeePage', {path: '/add-employee', fastRender: true});
    this.route('viewSearchInventoryPage', {path: '/search-inventory', fastRender: true});
});

// Route to specific page to edit the client
Router.route('/edit-client/:_id', { // Route to template to the specified link, and pull the id from the Mongodb collection.
  name: 'viewClientPage', // This links to the template
  data: function() { return Clients.findOne(this.params._id); }, // This returns the id for the specified item
  fastRender: true
});

// Route to specific page to edit the client
Router.route('/edit-client-portal/:_id', { // Route to template to the specified link, and pull the id from the Mongodb collection.
  name: 'editClientPortalPage', // This links to the template
  data: function() { return Clients.findOne(this.params._id); }, // This returns the id for the specified item
  fastRender: true
});


// Route to specific page to edit the ticket
Router.route('/edit-ticket/:_id', { // Route to template to the specified link, and pull the id from the Mongodb collection.
  name: 'viewTicketPage', // This links to the template
  data: function() {  return Tickets.findOne(this.params._id); }, // This returns the id from the Mongodb collection for the specified item
  onAfterAction: function () {
    var id = this.params._id;
   var ticket = Tickets.findOne({_id:id});
   $('#employee').multiselect();
   $('#employee').multiselect('deselectAll', false);
   $('#employee').multiselect('refresh');
   $('#employee').multiselect('select', ticket.employee);
   
   
   
  },

  fastRender: true
});

// Route to specific page to edit the order
Router.route('/edit-order/:_id', { // Route to template to the specified link, and pull the id from the Mongodb collection.
  name: 'viewOrderPage', // This links to the template
  data: function() { return Orders.findOne(this.params._id); }, // This returns the id from the Mongodb collection for the specified item
  fastRender: true
});

// Route to specific page to edit the order
Router.route('/edit-quote/:_id', { // Route to template to the specified link, and pull the id from the Mongodb collection.
  name: 'viewQuotePage', // This links to the template
  data: function() { return Quotes.findOne(this.params._id); }, // This returns the id from the Mongodb collection for the specified item
  fastRender: true
});

// Route to specific page to edit the order
Router.route('/edit-service/:_id', { // Route to template to the specified link, and pull the id from the Mongodb collection.
  name: 'viewServicePage', // This links to the template
  data: function() { return Services.findOne(this.params._id); }, // This returns the id from the Mongodb collection for the specified item
  fastRender: true
});

// Route to specific page to edit the order
Router.route('/edit-service-group/:_id', { // Route to template to the specified link, and pull the id from the Mongodb collection.
  name: 'viewServiceGroupPage', // This links to the template
  data: function() { return Service_Groups.findOne(this.params._id); }, // This returns the id from the Mongodb collection for the specified item
  fastRender: true
});

// Route to specific page to edit the order
Router.route('/edit-purchase-order/:_id', { // Route to template to the specified link, and pull the id from the Mongodb collection.
  name: 'viewPurchaseOrderPage', // This links to the template
  data: function() { return Purchase_Orders.findOne(this.params._id); }, // This returns the id from the Mongodb collection for the specified item
  fastRender: true
});

// Route to specific page to view the Screen Connect Session/User
Router.route('/sc-user/:_id', { // Route to template to the specified link, and pull the id from the Mongodb collection.
  name: 'viewScreenConnectPage', // This links to the template
  data: function() { return ScreenConnect.findOne(this.params._id); }, // This returns the id from the Mongodb collection for the specified item
  fastRender: true
});

// Route to specific page to view the Screen Connect Session/User
Router.route('/edit-vendor/:_id', { // Route to template to the specified link, and pull the id from the Mongodb collection.
  name: 'viewVendorPage', // This links to the template
  data: function() { return Vendor.findOne(this.params._id); }, // This returns the id from the Mongodb collection for the specified item
  fastRender: true
});

// Route to specific page to view the Screen Connect Session/User
Router.route('/edit-employee/:_id', { // Route to template to the specified link, and pull the id from the Mongodb collection.
  name: 'viewEmployeePage', // This links to the template
  data: function() { return Meteor.users.findOne(this.params._id); }, // This returns the id from the Mongodb collection for the specified item
  fastRender: true
});

// Route to specific page to view the inventory item
Router.route('/inventory/:_id', { // Route to template to the specified link, and pull the id from the Mongodb collection.
  name: 'viewInventoryPage', // This links to the template
  data: function() { return Inventory.findOne(this.params._id); }, // This returns the id from the Mongodb collection for the specified item
  fastRender: true
});
