$(() => {
	let color = $('#fontColor').val();
	$('#fontColor').on('change paste keyup', () => {
		color = $('#fontColor').val();
	});
	let fontSize = $('#myRange').val();
	$('#demo').html(fontSize);
	$('#myRange').on('input change', () => {
		fontSize = $('#myRange').val();
		$('#demo').html(fontSize);
	});
	$('#btnChange').click(() => {
		chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
			chrome.tabs.sendMessage(tabs[0].id, {
				todo: 'changeColor',
				clickedColor: color,
				selectedFontSize: fontSize
			});
		});
	});
});
