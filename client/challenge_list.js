Template.challenge_list.challenges = function() {
	return Challenges.find({ }, { sort: { title: 1 } });
};

Template.challenge_list.events({
	'click a': function(evt) {
		evt.preventDefault();

		Session.set('current_challenge_id', evt.currentTarget.id);
	}
});