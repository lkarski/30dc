Template.google_auth.events({
	'click #google-login': function(evt) {
		evt.preventDefault();
		Meteor.loginWithGoogle();
	}
}); 