function RYMSession() {
	this.userid = 0;
	this.username = "";
	this.token = "";
	this.init = function(e, t, n) {
		this.userid=e;
		this.username=t;
		this.token=n
	};
	this.logout = function() {
		this.userid = 0;
		this.username = "";
		this.token = ""
	};
	this.isLoggedIn = function() {
		return this.userid != 0
	}
}

function RYMRequest() {
	this.sendRequest = function(e, t, n, r, i, s) {
		if (i == null){
			i=false
		}
		if (s == null){
			s = "/httprequest"
		}
		t.rym_ajax_req = 1;
		t.request_token = rym.session.token;
		return jQuery.ajax({
			url: s,
			type: e,
			data: t,
			success: n,
			dataType: r,
			cache: i
		});
	};
	this.get = function(e, t, n, r, i, s) {
		t.action = e;
		this.sendRequest("GET", t, n, r, i, s)
	};
	this.post = function(e, t, n, r, i, s){
		t.action = e;
		this.sendRequest("POST", t, n, r, i, s)
	}
}

function RYM() {
	this.session = new RYMSession;
	this.request = new RYMRequest;
	this.doModalError = function(e, t, n){
		alert(t + ": " + e)};
		this.doSpinner = function(e, t){
			t = t == null ? "s" : t;
			if (t == "s" || t == "m" || t == "l"){
				t = '<img src="/images/spinner_' + t + '.gif">'
			}
			$("#" + e).html(t);
		};
		this.search = function(e, t, n, r, i){
			if (r == null) {
				r = "searchresults";
			}
			this.doSpinner(r, '<div style="height:400px;text-align:center;padding-top:200px;"><img src="/images/spinner_m.gif><br><em>Searching...</em></div>');
			this.request.post("Search", {
				searchterm:e,
				type:t,
				page:n
			}, function(e) {
				$("#"+r).html(e)
			}, "html")
		}
	}
	rym = new RYM;
	$(function() {
		$("body").ajaxError(function(e, t, n, r){
			switch(t.status) {
			case 404:
				rym.doModalError("File not found.","404 Error: ");
				break;
			case 500:
				rym.doModalError(t.responseText, "Error: ");
				break;
				default: rym.doModalError("An unknown error occured.","Error: ")
			}
		})
	});
}