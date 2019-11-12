function make_search_bar(bx) {
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
}