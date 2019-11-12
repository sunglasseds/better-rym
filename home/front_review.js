function front_review (album_name, album_link, artist_name, artist_link, album_art, release_year, genres, rating_img, reviewer, reviewer_link, body) return $("<div/>").html($.parseHTML(`
	<div class="frontreviewhead">
		<div class="row">
			<div class="col-md-6 reviewheadart">
				<a href="${album_link}">
					<img src="${album_art}">
				</a>
			</div>
			<div class="col-md-6 frontreviewinfo"><div class="bottom-aligner" style="width: 0;"></div><a style="font-weight: 700;" href="${album_link}">${album_name}</a> <em style="font-size: 0.625rem;">${release_year}</em><br><a href="${artist_link}">${artist_name}</a><br>${genres}<br><a style="font-weight: 700; text-decoration: underline;" href="${reviewer_link}">${reviewer}</a><br><img src="${rating_img}"></div>
		</div>
	</div>
	<div class="frontreviewbody">
		${body}
	</div>
	<div style="background-color: #fff; height: 2rem;"></div>
`));
