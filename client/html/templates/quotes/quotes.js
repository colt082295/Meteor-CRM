    Template.addQuote.onRendered(function() {
   
   Metronic.init(); // init metronic core componets
   Layout.init(); // init layout
     
 });
 
     Template.viewQuote.onRendered(function() {
   
   Metronic.init(); // init metronic core componets
   Layout.init(); // init layout
     
 });
/*********************************************
            Add New Quote - FORM
/********************************************/            
  Template.addQuote.events({
    
    'click #add_product' : function(event, template) {
      
      $( ".workstations" ).append( '<div class="form-group form-md-line-input col-md-6">\
                                                	<div class="input-group">\
                                                	<span class="input-group-btn btn-left">\
							<a class="btn red listExRemove">X</a>\
							</span>\
                                                	<input type="text" name="workstations" class="form-control" id="form_control_1" placeholder="Enter the product" >\
                                                	<label for="form_control_1">Product</label>\
                                                	</div>\
                                                </div>\
                                                \
	                                        <div class="form-group form-md-line-input col-md-3">\
                                                	<input type="number" id="mask_number" name="quantity" class="form-control" placeholder="Enter quantity">\
                                                	<label for="mask_number">Quantity</label>\
                                                </div>    \
                                                \
                                                <div class="form-group form-md-line-input col-md-3">\
							<div class="input-group">\
								<span class="input-group-addon">$</span>\
								<input type="text" name="price" class="form-control" placeholder="Enter amount">\
								<div class="form-control-focus">\
								</div>\
								<span class="input-group-addon">.00</span>\
							</div>\
						</div>' );
      
    },
    
    
        'click #add_requirement' : function(event, template) {
      
      $( ".requirements" ).append( '<div class="form-group form-md-line-input col-md-6">\
                                                	<div class="input-group">\
                                                	<span class="input-group-btn btn-left">\
							<a class="btn red" id="remove_requirement">X</a>\
							</span>\
                                                	<input type="text" name="requirements" class="form-control" id="form_control_1" placeholder="Enter the product" >\
                                                	<label for="form_control_1">Product</label>\
                                                	</div>\
                                                </div>\
                                                \
                                                <div class="form-group form-md-line-input col-md-6">\
											<div class="input-group">\
												<span class="input-group-addon">$</span>\
												<input type="text" name="price_2" class="form-control" placeholder="Enter amount">\
												<div class="form-control-focus">\
												</div>\
												<span class="input-group-addon">.00</span>\
											</div>\
											</div>' );
      
    },
    
    
            'click #add_service' : function(event, template, data) {
              var compiled = SpacebarsCompiler.compile('<div class="form-group form-md-line-input form-md-floating-label has-info col-md-6">\
										<div class="input-group">\
			                                                	<span class="input-group-btn btn-left">\
										<a class="btn red" id="remove_service">X</a>\
										</span>\
										<select class="form-control edited" id="form_control_1" name="service">\
											{{#each services}}\
												<option value="{{this.service}}">{{this.service}}</option>\
											{{/each}}\
										</select>\
										</div>\
										<label for="form_control_1">Services</label>\
										</div>')
      
      $( ".services" ).append( compiled );
      
    },
    
    
    
    'submit form' : function(event, template) {
          event.preventDefault(); //prevent page reload
          var company = event.target.company.value;
          var service = event.target.service.value;
          var notes = event.target.notes.value;
          
          // This groups together all workstations into an array
                var workstations = $("input[name='workstations']").map(function() {
                    return this.value;
                }).get();
                //
                
                
                // This groups together all quantities into an array
                var quantity = $("input[name='quantity']").map(function() {
                    return this.value;
                }).get();
                //
                
                
                // This groups together all prices into an array
                var price = $("input[name='price']").map(function() {
                    return this.value;
                }).get();
                //
                
                
                // This groups together all requirements into an array
                var requirements = $("input[name='requirements']").map(function() {
                    return this.value;
                }).get();
                //
                
                
                // This groups together all price_2's into an array
                var price_2 = $("input[name='price_2']").map(function() {
                    return this.value;
                }).get();
                //
          
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
              // Insert everything into the Quotes collection.
              Quotes.insert({
                company: company,
                workstations:workstations,
                quantity: quantity,
                price: price,
                requirements: requirements,
                price_2: price_2,
                service: service,
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
            
            
/*********************************************
            VIEW QUOTE - FORM
/********************************************/            
  Template.viewQuote.events({
    
    
    'click #add_product' : function(event, template) {
      
      $( ".quote_container" ).append('<div class="form-group form-md-line-input">\
                                                	<input type="text" name="workstations" class="form-control" id="form_control_1" placeholder="Enter the product" >\
                                                	<label for="form_control_1">Product</label>\
                                                </div>');
      
      
      
      $( ".quantity_container" ).append('<div class="form-group form-md-line-input">\
                                                	<input type="number" id="mask_number" name="quantity" value="{{.}}" class="form-control" >\
                                                	<label for="mask_number">Quantity</label>\
                                                </div>');
      $( ".price_container" ).append('<div class="form-group form-md-line-input">\
											<div class="input-group">\
												<span class="input-group-addon">$</span>\
												<input type="text" name="price" class="form-control" placeholder="Enter amount">\
												<div class="form-control-focus">\
												</div>\
												<span class="input-group-addon">.00</span>\
											</div>\
											</div>');
    },
    
    'submit .add_order' : function(event, template) {
          event.preventDefault(); //prevent page reload
          var company = event.target.company.value;
          var notes = event.target.notes.value;
          var service = event.target.service.value;
          
          // This groups together all workstations into an array
                var workstations = $("input[name='workstations']").map(function() {
                    return this.value;
                }).get();
                //
                
                
                // This groups together all quantities into an array
                var quantity = $("input[name='quantity']").map(function() {
                    return this.value;
                }).get();
                //
                
                
                // This groups together all prices into an array
                var price = $("input[name='price']").map(function() {
                    return this.value;
                }).get();
                //
                
                
                // This groups together all requirements into an array
                var requirements = $("input[name='requirements']").map(function() {
                    return this.value;
                }).get();
                //
                
                
                // This groups together all price_2's into an array
                var price_2 = $("input[name='price_2']").map(function() {
                    return this.value;
                }).get();
                //
          
          // Make sure that there is at least a company name entered. If so, post to db.
          if (!company) {
            console.log("Hey, it's empty!"); // Dipslay this if nothing is entered for the name.
          } 
          else {
            var currentId = this._id; // Set the id to the one that the user selected.
              var hours = new Date().getHours();
              var minutes = new Date().getMinutes();
              var ampm = hours >= 12 ? 'pm' : 'am';
              hours = hours % 12;
              hours = hours ? hours : 12; // the hour '0' should be '12'
              minutes = minutes < 10 ? '0'+minutes : minutes;
              // Insert everything into the Quotes collection.
              Quotes.update({_id:currentId}, {
                company: company,
                workstations: workstations,
                quantity: quantity,
                price: price,
                requirements: requirements,
                price_2: price_2,
                service: service,
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
            },
            
            
        'click #remove_from_db' : function(event, template) { // Run when form is submitted
        
            var id = this._id; // Set the id to the one that the user selected.
            Quotes.remove({_id:id});
            console.log("You removed:" + id);
            Router.go('home'); // This is going to route to the homepage after the user has removed the client from the db.
        
        },
    
          
        'click #convert_order' : function(event, template) { // Run when form is submitted
        
        
        // Using jquery to get the variables because javascript can't access the form elements unless you're submitting.
            var company = $( "#company" ).val();
          var service = $( "#service option:selected" ).text();
          var notes = $( "textarea#notes" ).val();
          
          // This groups together all workstations into an array
                var workstations = $("input[name='workstations']").map(function() {
                    return this.value;
                }).get();
                //
                
                
                // This groups together all quantities into an array
                var quantity = $("input[name='quantity']").map(function() {
                    return this.value;
                }).get();
                //
                
                
                // This groups together all prices into an array
                var price = $("input[name='price']").map(function() {
                    return this.value;
                }).get();
                //
                
                
                // This groups together all requirements into an array
                var requirements = $("input[name='requirements']").map(function() {
                    return this.value;
                }).get();
                //
                
                
                // This groups together all price_2's into an array
                var price_2 = $("input[name='price_2']").map(function() {
                    return this.value;
                }).get();
                //

                var id = this._id; // Set the id to the one that the user selected.
                var hours = new Date().getHours();
                var minutes = new Date().getMinutes();
                var ampm = hours >= 12 ? 'pm' : 'am';
                hours = hours % 12;
                hours = hours ? hours : 12; // the hour '0' should be '12'
                minutes = minutes < 10 ? '0'+minutes : minutes;
                // Insert everything into the Orders collection.
                Orders.insert({
                  order: {
                  order: company,
                  workstations: workstations,
                  quantity: quantity,
                  price: price,
                  requirements: requirements,
                  price_2: price_2,
                  service: service,
                  notes: notes,
                  user: Meteor.user().username,  // username of logged in user
                  date_full: new Date(), // Save full time to its own variable in case needed for extraction
                  date: (new Date().getMonth()+ 1)+'/'+ new Date().getDate()+'/'+ new Date().getFullYear(), // Format the month/date/year correctly
                  time: hours + ':' + minutes + ' ' + ampm // Save the correctly formatted version of the hour/minute.
                }});
                  Quotes.remove({_id:id});
                  console.log("You removed:" + id);
                  Router.go('home'); // This is going to route to the homepage after the user has removed the client from the db.
                //
                console.log("It Worked!"); // Display this if everything worked correctly.
            }
    
    
  });
          
            
            
                // Show/Sort the services
  Template.addQuote.helpers({
    services: function() {
      return Services.find({}, {sort: {createdAt:-1}, limit:4});
    }
  });
  
  
                  // Show/Sort the services
  Template.viewQuote.helpers({
    services: function() {
      return Services.find({}, {sort: {createdAt:-1}, limit:4});
    },
    quote: function() { return Quotes.findOne({_id:this._id}); }, // Get info of currently selected client from the Clients collection
    selected: function(optionText){
    if(optionText === this.deliveryStatus){
      return 'selected'
    }
  }
  });