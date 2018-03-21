$(function() {
	///HEADER CAROUSEL
	$('.banner-carousel').owlCarousel({
		loop: true,
		items: 1,
		dots: true,
		nav: true,
		autoplay: true,
		autoplayTimeout: 5000,
		autoplayHoverPause: true,
		smartSpeed: 1000,
		navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>']

	});
///PRODUCTS SECTION CAROUSEL
	$('.product-carousel').owlCarousel({
		items: 1,
		loop: true,
		dots: true,
		autoplay: true,
		autoplayTimeout: 2000,
		autoplayHoverPause: true,
		smartSpeed: 1000,
	});


	$('ul.sf-menu').superfish({
		cssArrows: false
	});

///// CONTACT INPUT TOGGLE
	$('#ckackbox_like').on('change', function () {
		$('.ckackbox_like-wrap').toggleClass('chacked')
	})


////// TOP MENU FIXED
	$(window).scroll(function () {
		if ($(document).scrollTop() > $(window).height() + 50) {
			$('header').css({
				'position': 'fixed',
				'border-bottom': '1px solid #000'
			}).fadeIn('fast');
		} else {
			$('header').css({
				'position': 'relative',
				'border-bottom': 'none'
			}).fadeIn('fast');
		}
	});



	$('.hamburger').on('click', function () {
		var mmAPI = $("#my-menu").data("mmenu");
		mmAPI.open();
	});

	$(".sf-menu").after("<div id='my-menu'>");
	$(".sf-menu").clone().appendTo("#my-menu");
	$("#my-menu").find("*").attr("style", "");
	$("#my-menu").find("ul").removeClass("sf-menu");
	$("#my-menu").mmenu({
		extensions: ['theme-white', 'effect-menu-slide', 'pagedim-black'],
		navbar: {
			title: "Menu"
		},
		"offCanvas": {
			"position": "right"
		}
	});
///// SCROLL TO SECTION
	function scrollTo(target, way) {
			$(target).click(function () {
				$('html, body').animate({
					scrollTop: $(way).position().top - 70
				}, 2000);
				$('.sf-js-enabled>li>a').removeClass('active-mnu');
				$(target).find('.mnu-first').addClass('active-mnu')
			});
	}

		scrollTo('.header-nav-item-home', '#banner');
		scrollTo('.header-nav-item-products', '#products');
		scrollTo('.header-nav-item-about', '#about_us');
		scrollTo('.header-nav-item-contact', '#contact');

	//// CHECK IE
	function checkIE() {
		var ua = window.navigator.userAgent;
	}
	// Get IE or Edge browser version
	var version = detectIE();
	console.log(version);
	
	if (version) {
		$('.prod-bgi')
			.css('background-image', 'url(main/img/products_bannerIE.png)')
			.addClass("ie");
	}

	function detectIE() {
		var ua = window.navigator.userAgent;

		var msie = ua.indexOf('MSIE ');
		if (msie > 0) {
			// IE 10 or older => return version number
			return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
		}

		var trident = ua.indexOf('Trident/');
		if (trident > 0) {
			// IE 11 => return version number
			var rv = ua.indexOf('rv:');
			return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
		}

		var edge = ua.indexOf('Edge/');
		if (edge > 0) {
			// Edge (IE 12+) => return version number
			return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
		}

		// other browser
		return false;
	}
	

	///// ADD ACRIVE TO MENU ITEM
	var sections = $('section'),
		nav = $('nav'),
		nav_height = nav.outerHeight();

	$(window).on('scroll', function () {
		var cur_pos = $(this).scrollTop();
		sections.each(function () {
			var top = $(this).offset().top - 70,
				bottom = top + $(this).outerHeight();
			if (cur_pos >= top && cur_pos <= bottom) {
				nav.find('a').removeClass('active-mnu');
				nav.find('a[href="#' + $(this).attr('id') + '"]').addClass('active-mnu');
			}
		});
	});

	//// PROGRESSS BAR
	function startProgress() {
			setTimeout(function () {
				$('.progress .bar').each(function () {
					var that = $(this);
					var perc = that.attr("data-percentage");
					var current_perc = 0;
					var progress = setInterval(function () {
						if (current_perc >= perc) {
							clearInterval(progress);
						} else {
							current_perc += 1;
							that.css('width', (current_perc) + '%');
							that.parent().prev().html(current_perc + '%')	
							that.attr("data-done", 'true')						
						}
					}, 50);
				});
			}, 300);
		}

		$(window).on('scroll', function() {
				if (($(this).scrollTop() >= $('#about_us').offset().top - 70) && $('.progress .bar').attr('data-done') === 'false') {
					startProgress()
				}
		})
		
	
});
