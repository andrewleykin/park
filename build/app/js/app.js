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
	var scene = $('#scene').get(0);
	var parallaxInstance = new Parallax(scene);
})();
$(document).ready(function () {
    svg4everybody({});
});
// Библиотека wow.js для анимации

(function () {
	console.log('hello');
})();