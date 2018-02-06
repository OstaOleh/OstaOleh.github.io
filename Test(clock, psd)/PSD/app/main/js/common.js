
var dotsNumb = (function() {
	function calcDots() {
		var dots = document.querySelectorAll('.header-carousel .owl-dot');
		document.querySelector('.dot-atall').innerHTML = dots.length;
		for (var i = 0; i < dots.length; i++) {
			if (dots[i].classList.contains('active')) {
				document.querySelector('.dot-current').innerHTML = i+1 ;
			}
			
		}
		
	}

	return  {
		init: function(item, event) {
			document.querySelector(item).addEventListener(event, function(e) {
				calcDots()
			});
		},
		dots: function() {
			calcDots()	
		} 
	}
})()

var crateLabel = (function() {

	function listener() {
		document.querySelector('.contacts--form').addEventListener('click', function(e) {
			var trg = e.target;
			var th = this;
			if (trg.classList.contains('contacts-inp')) {
				removeLabels()
				createLabel(trg, th)
			}
		});
	}
	function createLabel(trg) {
		var label = document.createElement('label')
		label.setAttribute('for', trg.id)
		label.className = 'label'
		label.textContent = trg.name
		var parents = document.querySelectorAll('.inp-wrap');
		parents.forEach(function(parent) {
			if(parent.children[0].id === trg.id){
				parent.insertBefore(label, trg)
			}
		})
		
	}
	function removeLabels() {
		var inp = document.querySelectorAll('.inp-wrap');
		inp.forEach(function(item) {
			if (item.children[0].classList.contains('label')) {
				item.children[0].remove();
			}
		})
	}
	return {
		init: function() {
			listener();
		}
	}
})();

$(function() {
	$('.header-carousel').owlCarousel({
		items: 1,
		loop: true,
		nav: true,
		dots: true,
		smartSpeed: 1000,
		navContainer: '.header-slide--nav--items-arrows',
		navText: ['<i class="demo-icon test-left"></i>', '<i class="demo-icon test-right"></i>']
	})



	dotsNumb.init('.header-carousel', 'mouseover')
	dotsNumb.init('.header-slide--nav', 'click')
	dotsNumb.dots();
	crateLabel.init();

	$('.hamburger').on('click', function() {
		$(this).toggleClass('active')
		$('.header--nav__wrap').toggleClass('active')
	})


	
	$('.header--nav--search').on('click', function(e) {
		
		if ($(e.target).is('i')) {
			$(this).find('input').toggleClass('active')
		}

	})


	
	
	

});
