// Начальная функция

(function(){
	// переменные
	var footerItem = $('.footer__item'),
		about = $('.about'),
		aboutItem = $('.about__item'),
		aboutPart = $('.about__part'),
		footerActive = 'footer__item--active',
		aboutItemActive = 'about__item--active',
		aboutPartAnimate = 'about__part--animate',
		wrapper = $('.wrapper');

	// если главная должна быть зеленая, то 
	if(wrapper.hasClass('wrapper--green')) {
		footerItem.first().addClass(footerActive); // первому элементу списка добавить активный класс
	} else { // иначе
		footerItem.last().addClass(footerActive); // последнему элементу списка
	}

	// если на странице есть информация "О НАС"
	if(about.length) {
		// сразу показать перывый элемент
		aboutItem.first().addClass(aboutItemActive);
		// анимация для адреса
		setTimeout(function(){
			aboutPart.addClass(aboutPartAnimate);
		},500);
		
		// при клике на элементы
		footerItem.click(function() {

			// переменные
			var $this = $(this),
				index = $this.index(),
				reqFooter = footerItem.eq(index),
				reqItem = aboutItem.eq(index);

			// смотрим на какой элемент нажали и в зависимости от этого меняем класс у родителя
			if($this.data('color') == 'green') {
				$this.closest('.wrapper').removeClass('wrapper--blue').addClass('wrapper--green');
				$this.closest('.wrapper').siblings('.wrap').removeClass('wrapper--blue').addClass('wrapper--green');
			} else {
				$this.closest('.wrapper').removeClass('wrapper--green').addClass('wrapper--blue');
				$this.closest('.wrapper').siblings('.wrap').removeClass('wrapper--green').addClass('wrapper--blue');
			}

				// если это уже активный элемент то ничего не делать
				if($this.hasClass(footerActive)) {
					return false;
				} else { // иначе добавить ему активный класс, удалив у другого
					reqFooter.addClass(footerActive).siblings().removeClass(footerActive);
					reqItem.addClass(aboutItemActive).siblings().removeClass(aboutItemActive);
				}
		});
	}
})();

// подгрузка изображений

(function(){
	function preloadImages() {
		for (var i = 0; i < arguments.length; i++) {
			new Image().src = arguments[i];
		}
	}

	preloadImages(
		"app/img/general/main-bg__2.jpg",
 +		"app/img/general/main-bg.jpg"
	);
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
	// переменные
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
		disabledArrow = 'object__arrow--disabled'
		flag = true;

	// при заходе первый активный
	photo.first().addClass(activePhoto);
	item.first().addClass(activeItem);
	dot.first().addClass(activeDot);

	// при нажатии на стрелку
	arrow.click(function() {
		var itemActive = item.filter('.' + activeItem),
			index = itemActive.index();

		index++;
		if(index == item.length) {
			index = 0;
		}

		changeSlide(index);
	});

	// при нажатии на точки
	dot.click(function() {
		var dotActive = dot.filter('.' + activeDot),
			index = $(this).index();

		changeSlide(index);
	});

	// при нажатии на клавиатуру
	$(document).on('keydown', (e) => {
		var itemActive = item.filter('.' + activeItem),
			index = itemActive.index();
		if(e.keyCode == 38) {
			if(index == 0) {
				index = item.length - 1;
			} else {
				index--;
			}
		} else if (e.keyCode == 40){
			if(index == item.length-1) {
				index = 0;
			} else {
				index++;
			}
		}

		changeSlide(index);
	});

	// при движения колесика мыши
	$('body').on('mousewheel', function(event) {

		var itemActive = item.filter('.' + activeItem),
			index = itemActive.index();

		if(event.deltaY > 0) {
			if(index == 0) {
				index = item.length - 1;
			} else {
				index--;
			}
		} else {
			if(index == item.length-1) {
				index = 0;
			} else {
				index++;
			}
		}
		if(flag) {
			changeSlide(index);
			flag = false;
		} else {
			setTimeout(function(){
				flag = true;
			},300);
		}
	});

	// при свайпе
	object.swipe({
		swipeUp:function(event) {
			var itemActive = item.filter('.' + activeItem),
				index = itemActive.index();
			if(index == 0) {
				index = item.length - 1;
			} else {
				index--;
			}
			changeSlide(index);
		},
		swipeDown:function(event) {
			var itemActive = item.filter('.' + activeItem),
				index = itemActive.index();
			if(index == item.length-1) {
				index = 0;
			} else {
				index++;
			}
			changeSlide(index);
		},
		swipeRight:function(event) {
			var itemActive = item.filter('.' + activeItem),
				index = itemActive.index();
			if(index == 0) {
				index = item.length - 1;
			} else {
				index--;
			}
			changeSlide(index);
		},
		swipeLeft:function(event) {
			var itemActive = item.filter('.' + activeItem),
				index = itemActive.index();
			if(index == item.length-1) {
				index = 0;
			} else {
				index++;
			}
			changeSlide(index);
		}
	});

	// функция для смена слайда
	var changeSlide = function(index) {
		var reqItem = item.eq(index),
			reqPhoto = photo.eq(index),
			reqDot = dot.eq(index),
			perc = index * -100,
			percPhoto = perc/photo.length,
			color = reqItem.data('color')

		// if(index == item.length-1) {
		// 	arrow.addClass(disabledArrow);
		// } else {
		// 	arrow.removeClass(disabledArrow)
		// }

		if(color == 'green') {
			reqItem.closest('.wrapper').removeClass('wrapper--blue').addClass('wrapper--green');
			$('.footer__item').first().addClass('footer__item--active').siblings().removeClass('footer__item--active');
		} else {
			reqItem.closest('.wrapper').removeClass('wrapper--green').addClass('wrapper--blue');
			$('.footer__item').last().addClass('footer__item--active').siblings().removeClass('footer__item--active');
		}


		itemParent.css('transform', 'translateX('+perc+'%)');
		photoParent.css('transform', 'translateY('+percPhoto+'%)');
		reqItem.addClass(activeItem).siblings().removeClass(activeItem);
		reqPhoto.addClass(activePhoto).siblings().removeClass(activePhoto);
		reqDot.addClass(activeDot).siblings().removeClass(activeDot);
	}
})();

// валидация формы

(function(){

	$("#phone").mask("+7 (999) 999-99-99");

	var order = $('.order'),
		form = order.find('.order__form'),
		right = order.find('.order__right'),
		input = form.find('.order__input--required'),
		btn = order.find('.order__btn');

		// функция валидация формы
		var validFunc = function () {

			// проверяем каждый input
			input.each(function(i) {

				// проверяем условие, есть ли в поле что-нидь
				if($(this).val() != '') {
					right.addClass('order__right--active');
				} else {
					right.removeClass('order__right--active');
				}

			}); // --> заканчиваем проверять инпуты


			return valid;
		} // --> validFunc is end


		// проверяем каждый инпут
		input.each(function(i) {

			// для каждого инпута при покидании поля
			$(this).blur(function() {

				// проверяем наличие чего-либо
				if($(this).val() != '') {
					$(this).removeClass('order__input--required');
					$(this).siblings('.order__label').addClass('order__label--hide');
					if(!input.hasClass('order__input--required')) {
						right.addClass('order__right--active')
					}
				} else {
					$(this).siblings('.order__label').removeClass('order__label--hide')
					$(this).addClass('order__input--required');
					if(input.hasClass('order__input--required')) {
						right.removeClass('order__right--active')
					}
				}
			});

		});


		// при клике на кнопку отправки
		btn.click(function(e) {
			e.preventDefault();
			validFunc();

			// проверять условие есть ли класс
			if(!(right.hasClass('order__right--active'))) {
				return false;
			} else {
				form.submit();
			}

		});

})();

// Партнёры

(function(){
	// переменные
	var link = $('.menu__link'),
		partners = $('.partners'),
		activePartners = 'partners--active',
		flag = true;

	// при нажатии на ссылку
	link.click(function(e) {
		var href = $(this).attr('href'); // href ссылки

		// если ссылка это партнёры
		if(href == "#partners") {
			e.preventDefault(); // убираем стандарт действия
			// проверяем есть ли блок партнёров
			if(!(partners.hasClass(activePartners)) && flag == true) {
				partners.addClass(activePartners);
				flag = false;
			} else {
				partners.removeClass(activePartners);
				flag = true;
			}
		}
	});

	// при нажатии на клавишу Esc
	$(document).keyup(function(e) {
		if(partners.hasClass(activePartners) && e.which == 27) {
			partners.removeClass(activePartners);
			flag = false;
			setTimeout(function(){
				flag = true;
			},100);
		}
	});

	// при нажатии на область вне элемента
	$(document).mouseup(function(e) {
		if(partners.hasClass(activePartners) && !partners.has(e.target).length) {
			partners.removeClass(activePartners);
			flag = false;
			setTimeout(function(){
				flag = true;
			},100);
		}
	});
})();

$(document).ready(function () {
    svg4everybody({});
});