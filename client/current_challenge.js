Template.current_challenge.current = function() {
	return Challenges.findOne({
		_id: Session.get('current_challenge_id')
	});	
};

Template.current_challenge.progress = function() {
	return Days.find({challenge: Session.get('current_challenge_id')});
};

Template.current_challenge.events({
	'click #update': function(evt) {
		Days.insert({
			date: $('#date').val(),
			result: $('#result').val(),
			challenge: Session.get('current_challenge_id')
		})
	}
});