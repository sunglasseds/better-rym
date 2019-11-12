chrome.webRequest.onBeforeSendHeaders.addListener((details) => {
	var headers = details.requestHeaders || [];
	headers.push({
		"name": "Cache-Control",
		"value": "no-cache"
	});
	return {requestHeaders: headers};
}, {urls: ["*://rateyourmusic.com/*"]}, []);