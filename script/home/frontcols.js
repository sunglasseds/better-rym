function make_front_cols(logged_in, reviews, newreleases) {
	$("body").append(`
		<div class="container" id="content">
			<div class="row">
				<div class="col-8">
					<div class="container" id="reviews">
						<div class="colheader">
							<button type="button" class="colbtn btn btn-secondary active" id="showfeatreview">featured reviews</button>
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

	if (logged_in) {
		$("button#showfrenreview").click(() => {
			$("button#showfeatreview").removeClass("active");
			$("button#showfrenreview").addClass("active");
			$("div#featreviews").removeClass("active");
			$("div#frenreviews").addClass("active");
		});
		$("button#showfeatreview").click(() => {
			$("button#showfeatreview").addClass("active");
			$("button#showfrenreview").removeClass("active");
			$("div#featreviews").addClass("active");
			$("div#frenreviews").removeClass("active");
		});
		$("button#shownewreleases").click(() => {
			$("button#shownewreleases").addClass("active");
			$("button#showrecommended").removeClass("active");
			$("div#newreleases").addClass("active");
			$("div#recommended").removeClass("active");
		});
		$("button#showrecommended").click(() => {
			$("button#showrecommended").addClass("active");
			$("button#shownewreleases").removeClass("active");
			$("div#recommended").addClass("active");
			$("div#newreleases").removeClass("active");
		});
	}

	$.each(reviews, (ind, e) => {
		let elem = $("<div/>").append($.parseHTML(e));
		let review = $("<div/>", {
			class: "frontreview"
		});
		let albmurl = elem.find("span.card_link em a.card_link_bg").attr("href");
		if (albmurl) {
			$("div#featreviews").html($("div#featreviews").html()+front_review(
				elem.find("span.card_link em a.card_link_bg").text(),
				albmurl,
				elem.find("span.card_link a:eq(1)").text(),
				elem.find("span.card_link a:eq(1)").attr("href"),
				elem.find("div.or_card_frame a img").attr("src"),
				elem.find("span.card_link span.card_small").text(),
				"",
				elem.find("table.mbgen td img").attr("src"),
				elem.find("table.mbgen td span a:eq(0)").text(),
				elem.find("table.mbgen td span a:eq(0)").attr("href"),
				elem.find("div[id^=review]").first().html()
			).html());
		}
	});

	newreleases.each((ind, elem) => {
		$("div#newreleases").append($("<div/>", {class: "newrelease"}).html(elem));
		$("div#newreleases").append($("<div/>", {class: "sep"}));
	});
}