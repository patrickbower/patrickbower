<h2 class="h2 screen-takeover__title">
    Get in touch
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
		<form class="form contact-form" method="post" action="submit.php">
            <!-- look at html5 native validation -->
            <!-- EG: accept="" -->
			<div class="form__row">
                <input class="form__input" name="name" type="text" required/>
                <label class="form__label form__label--active" for="name">Your name</label>
            </div>
			<div class="form__row">
                <input class="form__input" name="email" type="email" required/>
                <label class="form__label" for="email">Your email</label>
            </div>
            <div class="form__row form__row--confirm">
                <input class="form__input form__input--confirm" name="url" type="email"/>
                <label class="form__label" for="url">Confirm email</label>
            </div>
            <div class="form__row form__row--message">
                <textarea class="form__input form__input--textarea" name="message" maxlength="600" required></textarea>
                <label class="form__label" for="message">Your message</label>
            </div>
            <button class="button button--submit button-color--white" type="submit">Send</button>
		</form>
    </div>
</div>
