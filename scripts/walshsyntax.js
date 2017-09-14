$(function(){

	$(window).resize(function() {
		if ($(window).width() < 700) {
			$('.contactInfo').css({right: '0'});
		} else {
			$('.contactInfo').css({right: '-500px'});
		}
	});

		$('.contact, .contactInfo').mouseover(function() {
			$('.contactInfo').stop().animate({
				right: 0
			}, 600);
		}).mouseout(
			function() {
			if ($(window).width() > 700) {
				$('.contactInfo').stop().animate({
					right: '-500px'
				}, 600);
			}
		});

		$('.contact').click(function() {
			$('.contactInfo').stop().animate({
				right: 0
			}, 600);
		});


	$('.name').css({opacity:'1'});
	$('.horiLine').css({opacity:'0.5'});
	setTimeout(function(){
		$('#arrowKeys').css({opacity:'1'});
		$('canvas').css({opacity:'1'});
	}, 700);
});
