Challenges = new Meteor.Collection('challenges');
Days = new Meteor.Collection('days');

Meteor.subscribe('challenges');

Deps.autorun(function() {
	Meteor.subscribe('progress', Session.get('current_challenge_id'));	
})

