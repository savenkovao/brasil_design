$(function() {
// brgr menu
	var $brgrMenu = $('#brgr-menu');
	var $headerLineNav = $('.header-line-nav');
	var count = 0;

	$brgrMenu.on('click', activate);

	function activate() {
		count++;
		if (count%2 == 0) {
			$headerLineNav .removeClass('active');
			$brgrMenu.removeClass('active');
			count = 0;
		} else {
			$headerLineNav .addClass('active');
			$brgrMenu.addClass('active');
		}
	}

// page scroll animation

	$("#header-menu").on("click","a", function (event) {
		
		var id = $(this).attr('href');
		
		if ( id.match(/#\w/g) ){
			event.preventDefault();
			var top = $(id).offset().top;
		}

		$('body,html').animate({scrollTop: top}, 1500);
	});


// footer year change
	var $yearStr = $('#footer-txt__year');
	var year = new Date().getFullYear();
	$yearStr.html(year);

// stories block slider

	var $slider = $('#stories-slider');
	var $slInner = $('#stories-slider__inner');
	var $slides = $('.stories-slider-item');
	var $firstSlide = $('.stories-slider-item').first();
	var $arrLeft = $('#stories-slider__arr-l');
	var $arrRight = $('#stories-slider__arr-r');
	var slItemsNumber = $slInner.children().length;
	var slItemMargin = 0;

	$.each($slides, function(index, value){
		if (index % 2 == 0) {
			$(this).addClass('green');
		} else if (index % 2 == 1) {
			$(this).addClass('yellow');
		}
		
	});

	$arrLeft.click(browse);
	$arrRight.click(browse);
	$(window).resize(browse);

	function browse() {
		var sliderWidth = $slider.width();
		var direct = $(this).attr('data-direct');
		var browseCount = slItemsNumber - 1;

		if ($( window ).width() > 768) {
			if (Math.floor(slItemsNumber/2) == 1) {
				browseCount = Math.floor(slItemsNumber/2);
			} else {
				browseCount = Math.floor(slItemsNumber/2) - 1;
			}
		}


		if (direct == 'left') {				
			if(slItemMargin < 0){
				slItemMargin += sliderWidth;
				$firstSlide.css({marginLeft: slItemMargin + 'px'});
			}
		} else if ( direct == 'right'){
			slItemMargin -= sliderWidth;
			if (slItemMargin <= 0 && slItemMargin >= -browseCount * sliderWidth){
				$firstSlide.css({marginLeft: slItemMargin + 'px'});
			}
		}	else {
			slItemMargin = -browseCount * sliderWidth;
			$firstSlide.css({marginLeft: slItemMargin + 'px'});
		}


		if (slItemMargin <= -browseCount * sliderWidth){
			slItemMargin = -browseCount * sliderWidth;
		}
	}
});