$(function (){

	var $orders = $('#orders');
	var $name = $('#name');
	var $drink = $('#drink');

	var orderTemplate = $('#order-template').html();

	function addOrder(order) {
		$orders.append(Mustache.render(orderTemplate, order));
	}

	$.ajax({
		type: 'GET',
		url: 'http://rest.learncode.academy/api/eugene/coffee',
		success: function(orders) {
			$.each(orders, function(i, order) {
				addOrder(order);
			})
		},
		error: function() {
			alert('error loading orders');
		}
	});

	$('#add-order').on('click', function() {

		var order = {
			name: $name.val(),
			drink: $drink.val()
		};

		$.ajax({
			type: 'POST',
			url: 'http://rest.learncode.academy/api/eugene/coffee',
			data: order,
			success: function(newOrder) {
				addOrder(newOrder);
			},
			error: function() {
				alert('error saving order');
			}
		});
	});

	$orders.delegate('.remove', 'click', function() {

		var $li = $(this).closest('li');

		$.ajax({
			type: 'DELETE',
			url: 'http://rest.learncode.academy/api/eugene/coffee/' + $(this).attr('data-id'),
			success: function() {
				$li.fadeOut(300, function() {
					$(this).remove();
				})
			}
		});

	});

	$orders.delegate('.editOrder', 'click', function() {

		var $li = $(this).closest('li');
		$li.find('input.name').val( $li.find('span.name').html() );
		$li.find('input.drink').val( $li.find('span.drink').html() );

	});

});