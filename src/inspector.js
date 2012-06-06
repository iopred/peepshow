if (box) {
	unloadInspector();
} else {
	var lastElement;
	var box = $("<div class='peepshowInspector' />").css({
		display: "none",
		position: "absolute", 
		zIndex: 65000,
		"background-image": "url('" + chrome.extension.getURL("inspector.png") + "')"
	}).appendTo("body");

	$("body").mousemove(function(e){
		if (!box) {
			return;
		}
		var offset, el = e.target;
		if (el === document.body) {
			box.hide(); 
			return;
		} else if (el.className === "peepshowInspector") {
			box.hide();
			el = document.elementFromPoint(e.clientX, e.clientY);
		}
		el = $(el);
		offset = el.offset();
		box.css({
			width: el.outerWidth(), 
			height: el.outerHeight(), 
			left: offset.left, 
			top: offset.top 
		});
		box.show();
		lastElement = el;
	});

	$("body").click(function(e){
		if (!box) {
			return;
		}
		e.preventDefault();
		// Work on these values a little eh?
		var addWidth = 20;
		var addHeight = 60;
		if (navigator.platform.indexOf("Mac") != -1) {
			addWidth = 15;
			addHeight = 15;
		} else if (navigator.platform.indexOf("Win") != -1) {
			addWidth = 50;
			addHeight = 100;
		}
		chrome.extension.sendRequest({tabId: peepshowTabId, width: lastElement.width() + addWidth, height: lastElement.height() + addHeight}, function(){
			var offset = lastElement.offset();
			window.scroll(offset.left, offset.top);
		});
		unloadInspector();
	});

	function unloadInspector() {
		$("body").unbind("mousemove");
		$("body").unbind("click");
		box.remove();
		box = null;
	}
}
