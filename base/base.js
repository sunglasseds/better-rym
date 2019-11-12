function init(_f) {
	if ($("html").hasClass("captcha")) {
		$("body").css("display", "block", "important");
	} else {
		$("html").html(`
			<head></head>
			<body style="display: block!important"></body>
		`);
		$("head").html(`<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, intial-scale=1, shrink-to-fit=no">
		<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.8/css/all.css">`);
		_f();
	}
}