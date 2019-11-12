var _username = $("#navlist > li:nth-child(5) > a");
var _logged_in = _username.attr("href").includes("/~");
var _submenu = $("#wrapper > div.submenu_ext");
var _bx = $("#bx").attr("value");
let _reviews = $("#content > div.row > div:nth-child(1) > div.bubble_content").html().split(`<div class="clear"></div> <br><br>`);
let _newreleases = $(`#content table.mbgen tr[id^="newrelease"]`).first().parent().children();

init(() => {
	make_navbar(_logged_in, _username, _submenu, _bx);
	make_login();

	make_header(_logged_in, _reviews, _newreleases);
	make_front_cols(_logged_in);
});
