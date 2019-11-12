function load_messages() {
	if ($(this).attr("yea") != "yea") return;
	$("#messages-link").attr("yea", Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15));
}