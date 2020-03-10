$(() => {
	chrome.storage.sync.get(['total', 'limit'], budget => {
		$('#total').text(budget.total);
		$('#limit').text(budget.limit);
	});

	$('#spendAmount').click(() => {
		chrome.storage.sync.get(['total', 'limit'], budget => {
			let newTotal = 0;
			if (budget.total) {
				newTotal = parseInt(budget.total);
			}
			let amount = $('#amount').val();
			if (amount) {
				newTotal += parseInt(amount);
			}
			chrome.storage.sync.set({ total: newTotal }, () => {
				if (amount && newTotal >= budget.limit) {
					// Specifications of the notification that will be displayed
					let notifOptions = {
						type: 'basic',
						iconUrl: 'icon48.png',
						title: 'Limit reached',
						message: "Uh oh! Looks like you've reached your limit"
					};
					// Create a notification using chrome api
					// Takes in two parameters 1. id, 2. notification options object
					chrome.notifications.create('limit', notifOptions);
				}
			});

			$('#total').text(newTotal);
			$('#amount').val('');
		});
	});
});
