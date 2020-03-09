$(() => {

	chrome.storage.sync.get('limit', budget => {
		$('#limit').val(budget.limit)
	})

	$('#saveLimit').click(() => {
		let limit = +$('#limit').val();
		if (limit) {
			chrome.storage.sync.set({ limit: limit }, () => {
				$('#limit').val('');
				close();
			});
		}
	});
	$('#resetTotal').click(() => {
		chrome.storage.sync.set({ total: 0 });
	});
});
