const contextMenuItem = {
	id: 'spendMoney', // Unique id for the context menu item
	title: 'Spend Money', // The title that will appear on right click
	contexts: ['selection'] // This specifies that it should open only when something is selected
};

// A function to check if text is a integer or not.
const isInt = value => {
	return (
		!isNaN(value) &&
		parseInt(Number(value)) == value &&
		!isNaN(parseInt(value, 10))
	);
};

chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener(clickData => {
	// menu item id gets the id of the clicked menu id and selection text gets the text that was selected
	if (clickData.menuItemId == 'spendMoney' && clickData.selectionText) {
		if (isInt(clickData.selectionText)) {
			chrome.storage.sync.get(['total', 'limit'], budget => {
				let newTotal = 0;
				if (budget.total) {
					newTotal = parseInt(budget.total);
				}

				newTotal += parseInt(clickData.selectionText);

				chrome.storage.sync.set({ total: newTotal }, () => {
					if (newTotal >= budget.limit) {
						const notifOptions = {
							type: 'basic',
							iconUrl: 'icon48.png',
							title: 'Limit reached!',
							message:
								"Uh oh, look's like you've reached your alloted limit."
						};
						chrome.notifications.create('limitNotif', notifOptions);
					}
				});
			});
		}
	}
});

// To add a badge to the extension that will display the total value stored.
chrome.storage.onChanged.addListener((changes, storageName) => {
	// Whenever value in storage changes this will be executed
	chrome.browserAction.setBadgeText({
		text: changes.total.newValue.toString()
	});
});
