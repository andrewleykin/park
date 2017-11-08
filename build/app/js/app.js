// Начальная функция

(function(){
	var footerItem = $('.footer__item'),
		aboutItem = $('.about__item'),
		aboutPart = $('.about__part'),
		footerActive = 'footer__item--active',
		aboutItemActive = 'about__item--active',
		aboutPartAnimate = 'about__part--animate';

	footerItem.first().addClass(footerActive);
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
		} else {
			$this.closest('.wrapper').removeClass('wrapper--green').addClass('wrapper--blue');
		}

			if($this.hasClass(footerActive)) {
				return false;
			} else {
				reqFooter.addClass(footerActive).siblings().removeClass(footerActive);
				reqItem.addClass(aboutItemActive).siblings().removeClass(aboutItemActive);
			}
	});
})();


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
	$.preloadImages("../img/general/main-bg__2.jpg");
})();
$(document).ready(function () {
    svg4everybody({});
});
// Библиотека wow.js для анимации

(function () {
	new WOW().init();
})();