// required bootstrap shit
var username = $("#navlist > li:nth-child(5) > a");
var logged_in = username.attr("href").includes("/~");
var bx = $("#bx").attr("value");

$("head").html("");
$("body").html("");

$("body").css("cssText", "display: inherit!important;");
$("head").append($("<link/>", {
	href: "https://use.fontawesome.com/releases/v5.0.8/css/all.css",
	rel: "stylesheet"
})).append($("<meta/>", {
	charset: "utf-8"
})).append($("<meta/>", {
	name: "viewport",
	content: "width=device-width, inital-scale=1, shrink-to-fit=no"
}));

function make_navbar(links) {
	items = $("<ul/>", {class: "navbar-nav mr-auto"});
	$.each(links, (ind, elem) => {
		items.append($($.parseHTML(`<li class="nav-item"><a class="nav-link" href="${elem}">${ind}</a></li>`)));
	});
	if (logged_in) {
		items.append(
			$($.parseHTML(`<li class="nav-item"><a class="nav-link">...</a></li>`)).click(() => {
				// toggle extra bar
			})
		);
	}
	return items;
}

$("body").append(
	$.parseHTML(`<nav class="navbar navbar-expand-md sticky-top navbar-light bg-light">
		<a class="navbar-brand" href="https://rateyourmusic.com/"><img src="https://8c30d0904e8b39d0d903-000092c797254b10c6f28a1f9486b488.ssl.cf1.rackcdn.com/sonemic-512.png" height="48px"></a>
		<div id="navbar-main" class="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2"></div>
		<div class="navbar-collapse" id="search-bar">
			<input type="text" placeholder="search" id="srch-term">
			<div class="dropdown">
				<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdown-menu-button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">artists</button>
				<div class="dropdown-menu" aria-labelledby="dropdown-menu-button" id="srch-type-menu"></div>
			</div>
			<input type="hidden" id="srch-type" value="a">
		</div>
		<button class="btn btn-outline-secondary" id="srch-btn"><i class="fa fa-search"></i></button>
	</nav>`)
);

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
		$("body nav.navbar div.dropdown div.dropdown-menu").append($($.parseHTML(`<a class="dropdown-item search-option" style="max-width: 9.5rem;">${key}</a>`)).click(() => {
			$("button#dropdown-menu-button").html(key);
			$("input#srch-type").val(dropdown_items[key]);
		}));
	} else {
		$("body nav.navbar div.dropdown div.dropdown-menu").append($($.parseHTML(`<a class="dropdown-item search-header" style="max-width: 9.5rem;">${key}</a>`)));
	}
});

$("body nav.navbar button#srch-btn").click(() => {
	window.location.href = `https://rateyourmusic.com/search?bx=${bx}&searchtype=${$(this).parent().children("input#srch-type").val()}&searchterm=${$(this).parent().children("input#srch-term").val()}`;
});
