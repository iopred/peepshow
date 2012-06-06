chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	windowData = {
		tabId: request.tabId,
		width: request.width,
		height: request.height,
		focused: true,
		type: "popup"
	};
	
	chrome.windows.create(windowData, function(window) {
		sendResponse();
	});
});

chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.executeScript(tab.id, {code: "peepshowTabId = " + tab.id + ";"}, function() {});
	chrome.tabs.executeScript(tab.id, {file: "jquery-1.7.1.min.js"}, function() {});
	chrome.tabs.executeScript(tab.id, {file: "inspector.js"}, function() {});
});
