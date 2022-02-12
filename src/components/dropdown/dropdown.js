;(function($, window, document, undefined) {
	"use strict";
	
	$.fn.dropdown = function(options) {

		var config = $.extend({}, {
			options: {
			  max:10,
				separateSummation: false,
				buttons: {
					clear: true,
					submit: true,
				}
			}
		}, options);

		function main(e) {
			
		}	

		this.each(function() { main($(this)); });
		return this;
	};
})(jQuery);









/*
	Dropdown:

		header:
			1)нажатие на шапку вызывает появление калькулятора,
					(добавлекние/удаление класса)

			2)редактирование при изменении общего колличества,
					(2 гостя > 3 гостя)
				либо показывать количество отдельных элементов,
					(2 спальни, 2 душа)

			3)вытавление того что должно быть по умолчанию через 'data-default',
					(Сколько гостей)

		calc:
			1)добавление калькулятора
				(+0-)
				изменение значения при нажатии на кнопки и header(2)

			2)возможность включения и отключения отдельных кнопок
				(по умолчанию: true) 

		Реализация:


*/