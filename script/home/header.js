function make_header(logged_in) {
	$("body").append(
		$.parseHTML(`
			<div class="jumbotron" id="frontcontentheader">
				<div class="container">
					<div class="row">
						<div class="col-md-6" style="text-align: center;">
							<img style="display: inline-block;" src="https://i.imgur.com/dvHdS2I.png">
						</div>
						<div class="col-md-6" id="welcome">
							<h1>welcome to rym</h1>
							<span>${boobermemes()}</span>
							<br><br>
							<button type="button" class="btn btn-light">${logged_in ? `<a href="https://rateyourmusic.com/account/login">create an account</a>` : `<a href="https://rateyourmusic.com/misc/random">wow look go listen to this album pretty cool</a>`}</button>
						</div>
					</div>
				</div>
			</div>
		`)
	);
}