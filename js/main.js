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

	//button functionality
	$orders.delegate('.editOrder', 'click', function() {
		var $li = $(this).closest('li');
		$li.find('input.name').val( $li.find('span.name').html() );
		$li.find('input.drink').val( $li.find('span.drink').html() );
		$li.addClass('edit');
		console.log($li.attr('data-id'));
	});

	$orders.delegate('.cancelEdit', 'click', function() {
		$(this).closest('li').removeClass('edit');
	});

	$orders.delegate('.saveEdit', 'click', function() {
		var $li = $(this).closest('li');
		var order = {
			name: $li.find('input.name').val(),
			drink: $li.find('input.drink').val()
		};

		$.ajax({
			type: 'PUT',
			url: 'http://rest.learncode.academy/api/eugene/coffee/' + $li.attr('data-id'),
			data: order,
			success: function(newOrder) {
				$li.find('span.name').html(order.name);
				$li.find('span.drink').html(order.drink);
				$li.removeClass('edit');
			},
			error: function() {
				alert('error updating order');
				alert('error updating order');
			}
		});

	});

});