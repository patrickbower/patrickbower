<?php

// if the url field is empty
if (isset($_POST['confirm']) && $_POST['confirm'] == ''){

	// put your email address here
	$youremail = 'bower.patrick@gmail.com';

	// prepare a "pretty" version of the message
	// Important: if you added any form fields to the HTML, you will need to add them here also
	$body = "This  email was just submitted via patrickbower.com:
	Name:  $_POST[name]
	E-Mail: $_POST[email]
	Message: $_POST[message]";

	// Use the submitters email if they supplied one
	// (and it isn't trying to hack your form).
	// Otherwise send from your email address.
	if( $_POST['email'] && !preg_match( "/[\r\n]/", $_POST['email']) ) {
	  $headers = "From: $_POST[email]";
	} else {
	  $headers = "From: $youremail";
	}

	// finally, send the message
	mail($youremail, 'Contact Form', $body, $headers );

}

// otherwise, let the spammer think that they got their message through
?>

<!DOCTYPE HTML>
<html>
<head>
    <title>Thanks!</title>
</head>
<body>

<div class="js-contact--confirmation">
    <div class="contact-section__confirmation">
        <h2 class="h2">
            <span class="strike contact-section--strike">Thanks</span>
        </h2>
    </div>
</div>

</body>
</html>
