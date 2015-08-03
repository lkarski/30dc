Challenges = new Meteor.Collection('challenges');
Days = new Meteor.Collection('days');

Meteor.publish('challenges', function() {
	return Challenges.find();
});

Meteor.publish('progress', function(challengeId) {
	if (challengeId) {
		return Days.find({challenge: challengeId});
	}
});

Meteor.methods({
	"submitRecaptcha" : function(data) {
		
	}

});