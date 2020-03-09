$(() => {
	$('#name').keyup(() => {
		$('#greet').text('Hello ' + $('#name').val());
	});
});
