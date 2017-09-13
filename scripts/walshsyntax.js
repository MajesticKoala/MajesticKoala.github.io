$(function(){

	$('.contact, .contactInfo').mouseover(function() {
		$('.contactInfo').stop().animate({
			right: 0
		}, 600);
	}).mouseout(function() {
		$('.contactInfo').stop().animate({
			right: '-500px'
		}, 600);
	});

		$('.name').css({opacity:'1'});
		$('.horiLine').css({opacity:'0.5'});
		setTimeout(function(){
			$('#arrowKeys').css({opacity:'1'});
			$('canvas').css({opacity:'1'});
		}, 700);


});
