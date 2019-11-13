function make_navbar(logged_in, username, submenu, bx) {
	$("body").append(
		$.parseHTML(`<div class="sticky-top">
			<nav class="navbar navbar-expand-md navbar-light bg-light">
				<a class="navbar-brand" href="https://rateyourmusic.com/"><img src="https://8c30d0904e8b39d0d903-000092c797254b10c6f28a1f9486b488.ssl.cf1.rackcdn.com/sonemic-512.png" height="48px"></a>
				<div id="navbar-main" class="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2"><ul class="navbar-nav"></ul></div>
				<div class="navbar-collapse" id="icon-bar" style="transform: translateX(-2.25rem);"></div>
				<div class="navbar-collapse" id="search-bar">
					<input type="text" placeholder="search" id="srch-term">
					<div class="dropdown">
						<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdown-menu-button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">artists</button>
						<ul class="dropdown-menu w-100" aria-labelledby="dropdown-menu-button" id="srch-type-menu"></ul>
					</div>
					<input type="hidden" id="srch-type" value="a">
				</div>
				<button class="btn btn-outline-secondary" id="srch-btn"><i class="fa fa-search"></i></button>
			</nav>
		</div>`)
	);
	if (logged_in) {
		submenu.addClass("sticky-top").css("float", "right");
		if (Cookies.get("submenu_ext") == "nah") {
			submenu.addClass("closed");
		}
		$("body div.sticky-top").append(submenu);

		$("div#icon-bar").append($.parseHTML(`
			<ul class=navbar-nav>
				<li class="nav-item dropdown" id="notifications">
					<a class="nav-link" id="notifications-link" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" yea="yea">
						<i class="fa fa-bell"></i>
					</a>
					<ul class="dropdown-menu" aria=labelledby="notifications-link">
						<li>loading notifications</li>
					</ul>
				</li>
				<li class="nav-item" id="messages">
					<a class="nav-link" id="messages-link" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" yea="yea">
						<i class="fa fa-envelope"></i>
					</a>
					<ul class="dropdown-menu" aria=labelledby="notifications-link">
						<li>im baby</li>
					</ul>
				</li>
			</ul>
		`));

		$(`#notifications-link[yea="yea"]`).click(function() {
			load_notifications(this);
		});
		$(`#messages-link[yea="yea"]`).click(function() {
			load_messages(this);
		});
	}

	$("div#navbar-main ul").append($.parseHTML(`
		<li class="nav-item"><a class="nav-link" href="https://rateyourmusic.com/charts/top/album/all-time">charts</a></li>
		<li class="nav-item"><a class="nav-link" href="https://rateyourmusic.com/lists/">lists</a></li>
		<li class="nav-item"><a class="nav-link" href="https://rateyourmusic.com/community/">community</a></li>
	`));
	if (logged_in) {
		$("div#navbar-main ul").append($.parseHTML(`
			<li class="nav-item"><a class="nav-link" href="https://rateyourmusic.com${username.attr("href")}">${username.text() + ""}</a></li>
			<li class="nav-item"><a class="nav-link" href="https://rateyourmusic.com/subscribe">subscribe</a></li>
			<li class="nav-item"><a class="nav-link" href="https://rateyourmusic.com/account/logout">log out</a></li>
		`));
	} else {
		$("div#navbar-main ul").append($.parseHTML(`
			<li class="nav-item"><a class="nav-link" data-toggle="modal" data-target="#login-modal">log in / sign up</a></li>
			<li class="nav-item"><a class="nav-link" href="https://rateyourmusic.com/subscribe">subscribe</a></li>
		`));
	}

	make_search_bar(bx);
}