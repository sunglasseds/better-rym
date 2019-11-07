console.log("ok");
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
							im big review
						</div>
						<div id="frenreviews" class="frontcol">
							wow im lov this album
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
