<h2 class="h2 screen-takeover__title">
    Contact
</h2>
<div class="card-cross project" data-init="contactform">
    <div class="card-cross__back width-100">
        <div class="grid">
            <div class="column width-40">
                <div class="project__logo-cont align">
                    <span class="shape shape--disc align">
                        <svg class="icon--vodafone icon-color--mine-shaft">
                            <use xlink:href="#icon--vodafone"></use>
                        </svg>
                    </span>
                </div>

                <h3 class="h3">
                    Email
                </h3>
				<p>
					Please feel free to use either the conatct form or the email address below - they both go to the same place and I'll come back to you as soon a possible.
				</p>
				<span class="direct-link"></span>
				<noscript>
					Please enable javascript or use the contact form.
				</noscript>
            </div>
        </div>
    </div>
    <div class="card-cross__front width-60">

		<form method="post" class="contact-form" action="submit.php">

			<p>Your name:
			<br /><input name="name" /></p>

			<p>Your email:
			<br /><input name="email" /></p>

			<!-- Important: if you add any fields to this page, you will also need to update the php script -->

            <!-- ToDo : move to external style file -->
			<style type="text/css">
				.email--two { display:none;}
			</style>

			<p class="email--two">Leave this empty:
			    <br />
                <!-- ToDo :  change to // 'repeatemail' here and in the submit file -->
                <input name="url" />
            </p>

			<p>Your message:
			<br /><textarea name="message" rows="10" cols="50"></textarea></p>

			<p><input type="submit" value="Send" /></p>

		</form>

    </div>
</div>
