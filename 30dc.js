if (Meteor.isClient) {

	Template.user_options.events({
		'click #logout': function(e) {
			e.preventDefault();
			Meteor.logout();
		}
	})

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}


