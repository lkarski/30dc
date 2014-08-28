Template.password_auth.events({
	'submit #password-auth': function(e) {
		e.preventDefault();
		Meteor.loginWithPassword($('#user').val(), $('#password').val(), function(err) {
			if (err) {
				alert(err);				
			}
			else {
				alert('success');
			}			
		});
	},

	'click #create-account': function(e) {
		e.preventDefault();
		Session.set('create account', true);
	},

	'submit #create-account-form': function(e) {
		e.preventDefault();

		alert($('#username').val() + ' ' + $('#email').val() + ' : ' + $('#new-password').val());

		Accounts.createUser({
			username: $('#username').val(),
			email: $('#email').val(),
			password: $('#new-password').val()
		}, 
		function(err) {
			if (err)
			{
				alert(err);
			}
			else
			{
				alert('success');
			}
		});

		//TODO: grey out the form and show spinner that waits
	}

});

Template.password_auth.helpers({
	showCrateAccountForm: function() {
		return Session.get('create account');
	}
});