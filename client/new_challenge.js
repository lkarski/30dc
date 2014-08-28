Template.new_challenge.events({
	'click #create': function(evt) {
		Challenges.insert({
			title: $('#title').val(),
			start: $('#start').val(),
			duration: $('#duration').val()
		})
	}
});



