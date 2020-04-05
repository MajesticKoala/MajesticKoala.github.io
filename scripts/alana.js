(function () {
	var input = '',
	correct = '2503';
  
	var dots = document.getElementsByClassName('dot'),
	numbers = document.getElementsByClassName('number');
	var pin = document.getElementById('pin');
	dots = Array.from(dots);
	numbers = Array.from(numbers);
  
	var numbersBox = document.getElementsByClassName('numbers')[0];
	var imageClue = document.getElementsByClassName('imageClue')[0];

	$(numbersBox).on('click', '.number', function (evt) {
	  var number = $(this);
  
	  number.addClass('grow');
	  input += number.index();
	  $(dots[input.length - 1]).addClass('active');
  
	  if (input.length >= 4) {
		  console.log(input);
		if (input !== correct) {
		  dots.forEach(dot => $(dot).addClass('wrong'));
		  $(document.body).addClass('wrong');
		} else
		{
		  dots.forEach(dot => $(dot).addClass('correct'));
		  $(document.body).addClass('correct');

		  $(imageClue).addClass('visible');

		}
		setTimeout(function () {
		  dots.forEach(dot => dot.className = 'dot');
		  input = '';
		}, 900);
		setTimeout(function () {
		  document.body.className = '';
		}, 1000);
	  }
	  setTimeout(function () {
		number.className = 'number';
	  }, 1000);
	});
  })();