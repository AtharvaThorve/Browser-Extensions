$(() => {
	chrome.storage.sync.get(['total', 'limit'], budget => {
		$('#total').text(budget.total);
		$('#limit').text(budget.limit);
	});

	$('#spendAmount').click(() => {
		chrome.storage.sync.get('total', budget => {
			let newTotal = 0;
			if (budget.total) {
				newTotal = parseInt(budget.total);
			}
			let amount = $('#amount').val();
			if (amount) {
				newTotal += parseInt(amount);
			}
			chrome.storage.sync.set({ total: newTotal });

			$('#total').text(newTotal);
			$('#amount').val('');
		});
	});
});
