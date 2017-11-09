// Начальная функция

(function(){
	var footerItem = $('.footer__item'),
		about = $('.about'),
		aboutItem = $('.about__item'),
		aboutPart = $('.about__part'),
		footerActive = 'footer__item--active',
		aboutItemActive = 'about__item--active',
		aboutPartAnimate = 'about__part--animate',
		wrapper = $('.wrapper');


	if(wrapper.hasClass('wrapper--green')) {
		footerItem.first().addClass(footerActive);
	} else {
		footerItem.last().addClass(footerActive);
	}


	if(about.length) {
		aboutItem.first().addClass(aboutItemActive);
		setTimeout(function(){
			aboutPart.addClass(aboutPartAnimate);
		},500);
		
		footerItem.click(function() {

			var $this = $(this),
				index = $this.index(),
				reqFooter = footerItem.eq(index),
				reqItem = aboutItem.eq(index);

			if($this.data('color') == 'green') {
				$this.closest('.wrapper').removeClass('wrapper--blue').addClass('wrapper--green');
				$this.closest('.wrapper').siblings('.wrap').removeClass('wrapper--blue').addClass('wrapper--green');
			} else {
				$this.closest('.wrapper').removeClass('wrapper--green').addClass('wrapper--blue');
				$this.closest('.wrapper').siblings('.wrap').removeClass('wrapper--green').addClass('wrapper--blue');
			}

				if($this.hasClass(footerActive)) {
					return false;
				} else {
					reqFooter.addClass(footerActive).siblings().removeClass(footerActive);
					reqItem.addClass(aboutItemActive).siblings().removeClass(aboutItemActive);
				}
		});
	}
})();

// подгрузка изображений

(function(){
	//создаем JQuery функцию, которая будет подгружать изображения в буфер
	jQuery.preloadImages = function()
		{
			for(var i = 0; i < arguments.length; i++)
		{
			jQuery("<img>").attr("src", arguments[ i ]);
		}
	};
	//указываем путь к изображению, которое нужно подгрузить
	$.preloadImages("/app/img/general/main-bg__2.jpg");
})();

// параллакс

(function(){
	var scene = $('#scene');

	if (scene.length) {
		var scene = $('#scene').get(0);
		var parallaxInstance = new Parallax(scene);
	}
})();

// слайдер

(function(){
	var object = $('.object'),
		photo = object.find('.object__photo'),
		item = object.find('.object__item'),
		dot = object.find('.object__dot'),
		activePhoto = 'object__photo--active',
		activeItem = 'object__item--active',
		activeDot = 'object__dot--active',
		photoParent = object.find('.object__content--pic'),
		itemParent = object.find('.object__content'),
		arrow = $('.object__arrow'),
		direction;

	photo.first().addClass(activePhoto);
	item.first().addClass(activeItem);
	dot.first().addClass(activeDot);

	arrow.click(function() {
		var itemActive = item.filter('.' + activeItem),
			index = itemActive.index();

		index++;
		if(index == item.length) {
			index = item.length - 1;
		}
		changeSlide(index);
	});

	dot.click(function() {
		var dotActive = dot.filter('.' + activeDot),
			index = $(this).index();

		changeSlide(index);
	});

	$(document).on('keydown', (e) => {
		var itemActive = item.filter('.' + activeItem),
			index = itemActive.index();
		if(e.keyCode == 38) {
			if(index == 0) {
				index = 0
			} else {
				index--;
			}
		} else if (e.keyCode == 40){
			if(index == item.length-1) {
				index = item.length - 1;
			} else {
				index++;
			}
		}
		changeSlide(index);
	});
	var changeSlide = function(index) {
		var reqItem = item.eq(index),
			reqPhoto = photo.eq(index),
			reqDot = dot.eq(index),
			perc = index * -100,
			percPhoto = perc/photo.length;


		itemParent.css('transform', 'translateX('+perc+'%)');
		photoParent.css('transform', 'translateY('+percPhoto+'%)');
		reqItem.addClass(activeItem).siblings().removeClass(activeItem);
		reqPhoto.addClass(activePhoto).siblings().removeClass(activePhoto);
		reqDot.addClass(activeDot).siblings().removeClass(activeDot);
	}
})();