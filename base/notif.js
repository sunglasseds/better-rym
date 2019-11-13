function load_notifications(_this) {
	if ($(_this).attr("yea") != "yea") return;

	$("#notifications-link").attr("yea", Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15));

	$.get($("#navbar-main > ul > li:nth-child(4) > a").attr("href"), function(data) {
		let pg = $("<div/>").html(data);
		let notif = pg.find("#allNotifications");

		$("#notifications ul.dropdown-menu").html("");

		notif.find(`tr.notification`).each(function() {
			var uid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

			if ($(this).find(":not(a)").text().includes("reviewed")) {
				let user = $(this).find("a.user").exists() ? $(this).find("a.user") : $(this).find("a.usero");

				$("#notifications ul.dropdown-menu").append(
					$.parseHTML(`
						<li>
							<div class="notification" id="notif_${uid}">
								<span class="notifdate">${$(this).find(`span.smallgray`).text().split("| ")[1]}</span><br>
								<span class="notifmsg"><a href="${user.attr("href")}">~${user.text()}</a> reviewed <a href="${$(this).find(`a.album`).attr("href")}">${$(this).find(`a.album`).text()}</span>
							</div>
						</li>
					`)
				);

				$(`div#notif_${uid}`).click(() => {
					$(this).find("a.tinybutton").click();
					window.href = $(this).find(`a.album`).attr("href");
				});
			} else if ($(this).find(":not(a)").text().includes("reviews")) {
				let user = $(this).find("a.user").exists() ? $(this).find("a.user") : $(this).find("a.usero");

				$("#notifications ul.dropdown-menu").append(
					$("<li/>").append(
						$("<div/>", {
							class: "notification",
							id: `notif_${uid}`
						}).append(
							$("<span/>", {
								class: "notifdate"
							}).text($(this).find(`span.smallgray`).text().split("| ")[1])
						).append(
							$("<br/>")
						).append(
							$("<span/>", {
								class: "notifmsg"
							}).html(`<a href="${user.attr("href")}">~${user.text()}</a> reviewed ${$(this).find(`a.album`).text()}`)
						)
					)
				);
			}

			$("#notifications ul.dropdown-menu").append(
				$("<li/>").html("<hr>")
			);
		});
		
		$("#notifications ul.dropdown-menu hr:last").remove();
	});
}