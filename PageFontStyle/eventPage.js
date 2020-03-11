// This function checks all the tabs for the given condition and in the callback function passes array of tabs
chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
	// This will activate extension on tab which was first opened on startup of chrome if persistent is true
	// If false then extension needs to be reloaded
	chrome.pageAction.show(tabs[0].id); 
});
