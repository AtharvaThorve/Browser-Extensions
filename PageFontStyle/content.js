// Since content scripts cannot use most of the chrome apis it is going to send a message to event page
// to highlight a specific page and also to perform many other activities.
chrome.runtime.sendMessage({ todo: 'showPageAction' });
