Template['recaptcha'].rendered = function() {
    var public_key = "6LfibvYSAAAAAE5nzn4tQ6ou-DVHzD-cIf1WhjxJ";

    $.getScript('http://www.google.com/recaptcha/api/js/recaptcha_ajax.js', function() {
         Recaptcha.create(public_key, 'rendered-recaptcha', {
             theme: 'clean',
             callback: Recaptcha.focus_response_field
         });
     });
};

Template['recaptcha'].events({
    'submit #recaptcha-form': function(event) {
        event.preventDefault();
        event.stopPropagation();

        var formData = {
            captcha_challenge_id: Recaptcha.get_challenge(),
            captcha_solution: Recaptcha.get_response()
            //add the data from form inputs here
        };

        console.log(formData);

        Meteor.call('submitReCaptcha', formData, function(error, result) {

            console.log(result);

            if (result.success) {

                Recaptcha.destroy();
                //set session vars, redirect, etc

            } else {
                Recaptcha.reload();

                // alert error message according to received code
                switch (result.error) {
                    case 'captcha_verification_failed':
                        alert('captcha solution is wrong!');
                        break;
                    case 'other_error_on_form_submit':
                        alert('other error');
                        break;
                    default:
                        alert('error');
                }

            }
        });
    
    }
});


