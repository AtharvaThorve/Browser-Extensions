// Since content scripts cannot use most of the chrome apis it is going to send a message to event page
// to highlight a specific page and also to perform many other activities.
chrome.runtime.sendMessage({ todo: 'showPageAction' });

// Listen to the message sent by popup.js file about what color should be set to.
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.todo == 'changeColor') {
		let addColor = '#' + request.clickedColor;
		let changeFontSize = request.selectedFontSize + 'px';
		$('*').css({'color': addColor, 'font-size': changeFontSize});
	}
});
