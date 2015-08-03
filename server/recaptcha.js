var request = Npm.require("request");
var httpCall = Meteor._wrapAsync(request);

function verifyReCaptcha(clientIP, data) {

    var captcha_data = {
        privateKey: '6LfibvYSAAAAAGdtIPRiU62_w1Pa0OHmIjBggrzk ',
        remoteIP: clientIP,
        challenge: data.captcha_challenge_id,
        response: data.captcha_solution
    };

    var serialized_captcha_data =
        'privatekey=' + captcha_data.privateKey +
            '&remoteip=' + captcha_data.remoteIP +
            '&challenge=' + captcha_data.challenge +
            '&response=' + captcha_data.response;
    var captchaVerificationResult = null;
    var success, parts; // used to process response string

    try {
        captchaVerificationResult = httpCall({            
            url: "http://www.google.com/recaptcha/api/verify",
            method: "POST",
            body: serialized_captcha_data.toString('utf8'),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': serialized_captcha_data.length
            },
            proxy: "http://web-proxy.atl.hp.com:8080"
        });

        // captchaVerificationResult = HTTP.call("POST", "http://www.google.com/recaptcha/api/verify", {
        //     content: serialized_captcha_data.toString('utf8'),
        //     headers: {
        //         'Content-Type': 'application/x-www-form-urlencoded',
        //         'Content-Length': serialized_captcha_data.length
        //     }
        // });
    } catch(e) {
        return {
            'success': false,
            'error': 'google_service_not_accessible'
        };
    }

    parts = captchaVerificationResult.body.split('\n');
    success = parts[0];

    if (success !== 'true') {
        return {
            'success': false,
            'error': 'captcha_verification_failed'
        };
    }

    return {
        'success': true
    };
}

Meteor.methods({
    "submitReCaptcha": function(data) {

        //!add code here to separate captcha data from form data.

        var verifyCaptchaResponse = verifyReCaptcha(this.connection.clientAddress, data);

        if (!verifyCaptchaResponse.success) {
            console.log('Captcha check failed! Responding with: ', verifyCaptchaResponse);
            return verifyCaptchaResponse;
        }

        console.log('Captcha verification passed!');

        //!add code here to process form data

        return {success: true};
    }
});