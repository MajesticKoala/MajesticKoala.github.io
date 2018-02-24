$(function(){

	$('.pageTop').height($(window).height());

	$(document).on('scroll', function() {
		$('.pageTop').css({'transform': 'translate3d(0px, ' + (($(window).scrollTop() * 50 / 100)) + 'px, 0px)'});
	});

	$('.mainContent').css({'margin-top': $(window).height()});

	$(window).resize(function() {
		$('.mainContent').css({'margin-top': $(window).height()});
		if ($(window).width() < 700) {
			$('.contactInfo').css({right: '0'});
		} else {
			$('.contactInfo').css({right: '-500px'});
		}
	});

		$('#contact, .contactInfo').mouseover(function() {
			$('.contactInfo').stop().animate({
				right: 0
			}, 600);
		}).mouseout(
			function() {
			if ($(window).width() > 700) {
				if (!$('#contact').hasClass("clicked")) {
					$('.contactInfo').stop().animate({
						right: '-500px'
					}, 600);
				}
			}
		});

		$('#contact').click(function() {
			if ($('#contact').hasClass("clicked")) {
				$('#contact').removeClass("clicked");
			} else {
				$('.contactInfo').stop().animate({
					right: 0
				}, 600);
				$('#contact').addClass("clicked");
			}
		});

		$('#pongLink').click(function() {window.location.href = "pong.html"});
		$('#terminalLink').click(function() {window.location.href = "terminal.html"});
		$('#gitLink').click(function() {window.location.href = "https://github.com/MajesticKoala"});


	$('.name').css({opacity:'1'});
	$('.horiLine').css({opacity:'0.5'});
	setTimeout(function(){
		$('#arrowKeys').css({opacity:'1'});
		$('canvas').css({opacity:'1'});
	}, 700);

});
