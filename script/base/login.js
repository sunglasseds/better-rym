function make_login() {
	$("head").append(
		$.parseHTML(`
			<script>
				function _loginSuccessCallback() {
			        window.location = '/?login_success';
			    }

			    function _loginFailureCallback(error) {
			        $('#error').html(error).fadeIn(200);
			        $('#login_submit')[0].disabled = false;
			    }

			    function _loginTimeout() {
			        $('#login_submit')[0].disabled = false;
			    }
			</script>
		`)
	);
	$("body").append(
		$.parseHTML(`
			<div class="modal fade" id="login-modal" tabindex="-1" role="dialog" aria-labelledby="login-label" aria-hidden="true">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header text-center">
							<h2 class="modal-title w-100 font-weight-bold">log in</h4>
						</div>
						<div class="modal-body">
							<form>
								<div class="form-group">
									<div class="input-group">
										<div class="input-group-prepend">
											<span class="input-group-text"><i class="fa fa-user"></i></span>
										</div>
										<input type="text" class="form-control" id="login-username" placeholder="username" name="username">
									</div>
								</div>
								<div class="form-group">
									<div class="input-group">
										<div class="input-group-prepend">
											<span class="input-group-text"><i class="fa fa-lock"></i></span>
										</div>
										<input type="password" class="form-control" id="login-password" placeholder="password" name="password">
									</div>
								</div>
								<div class="form-group">
									<a href="https://rateyourmusic.com/account/forgot_password" id="forgot-password" class="btn btn-light">forgot your password?</a>
								</div>
								<div class="form-check">
									<input type="checkbox" class="form-check-input" id="login-remember" name="remember"><label for="remember" class="form-check-label">remember me</label><br>
									<input type="checkbox" class="form-check-input" id="login-maintain-session" name="maintain_session"><label for="maintain_session" class="form-check-label">stay logged in on other devices</label>
								</div>
							</form>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-light float-right" data-dismiss="modal">nevermind</button>
							<button type="button" class="btn btn-light" id="sign-up">sign up</button>
							<button type="button" class="btn btn-primary" id="login-submit">log in</button>
						</div>
					</div>
				</div>
			</div>
			<div class="modal fade" id="signup-modal" tabindex="-1" role="dialog" aria-labelledby="login-label" aria-hidden="true">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header text-center">
							<h2 class="modal-title w-100 font-weight-bold">sign up</h4>
						</div>
						<div class="modal-body">
							<form>
								<div class="form-group">
									<div class="input-group">
										<div class="input-group-prepend">
											<span class="input-group-text"><i class="fa fa-user"></i></span>
										</div>
										<input type="text" class="form-control" id="signup-username" placeholder="username" name="username">
									</div>
								</div>
								<div class="form-group">
									<div class="input-group">
										<div class="input-group-prepend">
											<span class="input-group-text"><i class="fa fa-unlock"></i></span>
										</div>
										<input type="password" class="form-control" id="signup-password" placeholder="password" name="password">
									</div>
								</div>
								<div class="form-group">
									<div class="input-group">
										<div class="input-group-prepend">
											<span class="input-group-text"><i class="fa fa-lock"></i></span>
										</div>
										<input type="password" class="form-control" id="signup-confirm-password" placeholder="password again" name="confirm_password">
									</div>
								</div>
								<div class="form-group">
									<div class="input-group">
										<div class="input-group-prepend">
											<span class="input-group-text"><i class="fa fa-envelope"></i></span>
										</div>
										<input type="text" class="form-control" id="signup-email" placeholder="email address" name="email">
									</div>
								</div>
								<div class="form-group">
									<textarea class="form-control" id="signup-referral" rows="4" placeholder="where did you hear about rate your music?"></textarea>
								</div>
								<div class="form-check">
									<input type="checkbox" class="form-check-input" id="signup-tos" name="tos"><label for="tos" class="form-check-label">i am over the age of 13 and accept the <a href="https://rateyourmusic.com/tos">terms of service</a></label><br>
								</div><br>
								<div class="form-group g-recaptcha" id="captcha">captcha loading</div>
							</form>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-light float-right" data-dismiss="modal">nevermind</button>
							<button type="button" class="btn btn-light" id="log-in">log in</button>
							<button type="button" class="btn btn-primary" id="signup-submit">sign up</button>
						</div>
					</div>
				</div>
			</div>
		`)
	);

	// i will piss myself if this works. i am literally just fucking with the site's javascript. i have no fucking clue why this works
	$("button#login-submit").click(() => {
		rym.request.post("Login", {
			user: $("input#login-username").val(),
			password: $("input#login-password").val(),
			remember: $("input#login-remember").is(":checked"),
			maintain_session: $("input#login-maintain-session").is(":checked")
		}, null, "script");
		// figure out if this is Bootstrap
		$("button#login-submit")[0].disabled = true;
		setTimeout("_loginTimeout()", 5000);
		$("#login-error").hide();
	});
	$("button#signup-submit").click(() => {
		console.log("sign up");
	});

	$("button#sign-up").click(() => {
		$("div#login-modal").modal("hide");
		$("div#signup-modal").modal("show");
	});
	$("button#log-in").click(() => {
		$("div#signup-modal").modal("hide");
		$("div#login-modal").modal("show");
	});

	$.get("https://rateyourmusic.com/account/signup", function(data) {
		let pg = $("<div/>").html(data);
		$("div.form-group#captcha").attr("data-sitekey", pg.find("div.g-recaptcha").attr("data-sitekey"));
		$("div#signup-modal div.form-group#captcha").after(`<script src='https://www.google.com/recaptcha/api.js'></script>`);
	});
}