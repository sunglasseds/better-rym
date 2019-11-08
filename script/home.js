let reviews = $("#content > div.row > div:nth-child(1) > div.bubble_content").html().split(`<div class="clear"></div> <br><br>`);
var username = $("#navlist > li:nth-child(5) > a");
var logged_in = username.attr("href").includes("/~");
var submenu = $("#wrapper > div.submenu_ext");
var bx = $("#bx").attr("value");

$("html").html(`<head>
</head>
<body style="display: block!important">
</body>`);
$("head").html(`<meta charset="utf-8">
<meta name="viewport" content="width=device-width, intial-scale=1, shrink-to-fit=no">
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.8/css/all.css">`);

function make_navbar(links) {
	items = $("<ul/>", {class: "navbar-nav mr-auto"});
	$.each(links, (ind, elem) => {
		items.append($($.parseHTML(`<li class="nav-item"><a class="nav-link" href="${elem}">${ind}</a></li>`)));
	});
	if (logged_in) {
		items.append(
			$($.parseHTML(`<li class="nav-item"><a class="nav-link">...</a></li>`)).click(() => {
				if (!Cookies.get("submenu_ext") || Cookies.get("submenu_ext") == "nah") {
					Cookies.set("submenu_ext", "yea", {expires: Number.MAX_SAFE_INTEGER});
					$(".submenu_ext").removeClass("closed");
				} else if (Cookies.get("submenu_ext") == "yea") {
					Cookies.set("submenu_ext", "nah", {expires: Number.MAX_SAFE_INTEGER});
					$(".submenu_ext").addClass("closed");
				}
			})
		);
	}
	return items;
}

$("body").append(
	$.parseHTML(`<div class="sticky-top">
		<nav class="navbar navbar-expand-md navbar-light bg-light">
			<a class="navbar-brand" href="https://rateyourmusic.com/"><img src="https://8c30d0904e8b39d0d903-000092c797254b10c6f28a1f9486b488.ssl.cf1.rackcdn.com/sonemic-512.png" height="48px"></a>
			<div id="navbar-main" class="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2"></div>
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
}

$("div#navbar-main").append(make_navbar({
	"charts": "https://rateyourmusic.com/charts/top/album/all-time",
	"lists": "https://rateyourmusic.com/lists/",
	"community": "https://rateyourmusic.com/community/",
	[username.text() + ""]: `https://rateyourmusic.com${username.attr("href")}`,
	"subscribe": "https://rateyourmusic.com/subscribe/",
	[logged_in ? "log out" : ""]: "https://rateyourmusic.com/account/logout"
}));

let dropdown_items = {
	"music": false,
	"artists": "a",
	"all releases": "l",
	"v/a releases": "y",
	"label": "b",
	"catalog no.": "j",
	"classical work": "r",
	"review": "v",
	"genre": "g",
	"film": false,
	"film title": "F",
	"film cast/crew": "A",
	"video games": false,
	"game person": "N",
	"site": false,
	"user": "u",
	"boards": "p",
	"list": "s"
};

Object.keys(dropdown_items).map((key, ind) => {
	if (dropdown_items[key]) {
		$("body nav.navbar div.dropdown ul.dropdown-menu").append($($.parseHTML(`<li><a class="dropdown-item search-option">${key}</a></li>`)).children("a").click(() => {
			$("button#dropdown-menu-button").html(key);
			$("input#srch-type").val(dropdown_items[key]);
		}));
	} else {
		$("body nav.navbar div.dropdown ul.dropdown-menu").append($($.parseHTML(`<li><a class="dropdown-item search-header">${key}</a></li>`)));
	}
});

$("body nav.navbar button#srch-btn").click(() => {
	window.location.href = `https://rateyourmusic.com/search?bx=${bx}&searchtype=${$("input#srch-type").val()}&searchterm=${$("input#srch-term").val()}`;
});

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
						<span>yes, this site was designed by monkeys. no, godspeed you! black emperor is not good</span>
						<br><br>
						<button type="button" class="btn btn-light"><a href="https://rateyourmusic.com/account/login">create an account</a></button>
					</div>
				</div>
			</div>
		</div>
	`)
).append(`
	<div class="container" id="content">
		<div class="row">
			<div class="col-8">
				<div class="container" id="reviews">
					<div class="colheader">
						<button type="button" class="colbtn btn btn-secondary active" id="showfeatreview">featured reviews</button>
						<button type="button" class="colbtn btn btn-secondary" id="showfrenreview">recent friend reviews</button>
					</div>
					<div class="colbody">
						<div id="featreviews" class="frontcol active">
						</div>
						<div id="frenreviews" class="frontcol">
						</div>
					</div>
				</div>
			</div>
			<div class="col-4">
				<div class="container" id="releases">
					<div class="colheader">
						<button type="button" class="colbtn btn btn-secondary active" id="shownewreleases">new releases</button>
						<button type="button" class="colbtn btn btn-secondary" id="showrecommended">recommended</button>
					</div>
					<div class="colbody">
						<div id="newreleases" class="frontcol active">
						</div>
						<div id="recommended" class="frontcol">
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
`);

$("button#showfeatreview").click(() => {
	$("button#showfeatreview").addClass("active");
	$("button#showfrenreview").removeClass("active");
	$("div#featreviews").addClass("active");
	$("div#frenreviews").removeClass("active");
});
$("button#showfrenreview").click(() => {
	$("button#showfrenreview").addClass("active");
	$("button#showfeatreview").removeClass("active");
	$("div#frenreviews").addClass("active");
	$("div#featreviews").removeClass("active");
});

$("button#shownewreleases").click(() => {
	$("button#shownewreleases").addClass("active");
	$("#showrecommended").removeClass("active");
	$("div#newreleases").addClass("active");
	$("div#recommended").removeClass("active");
});
$("button#showrecommended").click(() => {
	$("button#showrecommended").addClass("active");
	$("#shownewreleases").removeClass("active");
	$("div#recommended").addClass("active");
	$("div#newreleases").removeClass("active");
});

$.each(reviews, (ind, e) => {
	let elem = $("<div/>").append($.parseHTML(e));
	let review = $("<div/>", {
		class: "frontreview"
	});
	let review_id = elem.find(`div[id^="review"]`).attr("id").split("review")[1];

	review.append($.parseHTML(`
		<div class="frontreviewhead">
			<div class="jumbotron col-md-6">
				<a href="${elem.find("span.card_link em a.card_link_bg").attr("href")}">
					<img src="${elem.find("div.or_card_frame a img").attr("src")}">
				</a>
			</div>
			<div class="jumbotron col-md-6" id="frontreview_${review_id}">
				<a href="${elem.find("span.card_link em a.card_link_bg")}">${elem.find("span.card_link em a.card_link_bg").text()} ${elem.find("span.card_link span.card_small").text()}</a><br>
				<a href="${elem.find("span.card_link a:eq(1)").attr("href")}">${elem.find("span.card_link a:eq(1)").text()}</a><br>
				<a href="${elem.find("table.mbgen td span a").attr("href")}">${elem.find("table.mbgen td span a").text()}</a><br>
				<img src="${elem.find("table.mbgen td img").attr("src")}">
			</div>
		</div>
		<div class="frontreviewbody">
			${elem.find("div[id^=review]").first().html()}
		</div>
		<div style="background-color: #fff; height: 2rem;"></div>
	`));
	// // album art
	// elem.find("div.or_card_frame a img").attr("href");
	// // album link
	// elem.find("span.card_link em a.card_link_bg").attr("href");
	// // album name
	// elem.find("span.card_link em a.card_link_bg").text();
	// // artist link
	// elem.find("span.card_link a").attr("href");
	// // artist name
	// elem.find("span.card_link a").text();
	// // release year
	// elem.find("span.card_link span.card_small").text();
	//
	// // review
	// elem.find("div").first().text();
	// // rating image url
	// elem.find("table.mbgen td img").attr("src");
	// // reviewer
	// elem.find("table.mbgen td span a").text();
	$("div#featreviews").append(review);
});
