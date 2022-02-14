;(function($) {
	"use strict";
	$.fn.dropdown = function(options) {
		const settings = $.extend( {
			type: 1,
			max: 	Infinity,
			plusСontent: '+',
			numsStart: 0,
			minusСontent: '-',
			controlsCls: {
				wrapper: 'dropdown__calc-wrapper',
				plus: 'dropdown__calc-inc',
				number: 'dropdown__calc-num',
				minus: 'dropdown__calc-dec',
			},
		}, options)

		this.each(function () {
			const $this = $(this);
      const $selection = $this.find('input.dropdown-selection').last();
      const $menu = $this.find('div.dropdown-menu');
      const $option = $menu.find('div.dropdown-menu-option');
      const $items = $menu.find('p.dropdown-item');

      const containForBool = {
      	lessOneMoreTwoType: settings.type <= 1 || settings.type > 2,
      	equalsTwoType: settings.type == 2,
      }

      const allItems = []
      let totalItems = 0
      let totalSumm = 0

      function headerUpdate() {
      	let selectionDefault = $selection.data('default')
      	let personName = $selection.data('person')

      	if(containForBool.lessOneMoreTwoType) {
      		if(totalSumm > 0) {
      			$selection.val(totalSumm + ' ' + personName)
      		} else {
      			$selection.val('')
      		}
      	}
      	if(containForBool.equalsTwoType) {
      		if(totalSumm > 0) {
      			let arr = []

      			for(let char of allItems) {
      				let key = Object.keys(char)

      				if(char[key] > 0){
	      				arr.push(`${char[key]} ${key}`)
      				}
      			}

      			$selection.val(arr.join(', '))
      		} else {
      			$selection.val('')
      		}
      	}
      }

      function createDropdown() {
      	let selectionDefault = $selection.data('default')

      	totalItems = $option.length

      	$selection.attr('placeholder', selectionDefault)

      	$selection.on('click', function() {
      		$menu.toggleClass('_active')
      	})
      }

      function controllers() {
      	let calcWrapper
      	let calcPlus
      	let calcNum
      	let calcDec

      	function add() {
      		calcWrapper = $('<div>', {
	      		class: settings.controlsCls.wrapper
	      	}).appendTo($option)

	      	calcPlus = $('<div>', {
	      		class: settings.controlsCls.plus
	      	}).html(settings.plusСontent)
	      		.appendTo(calcWrapper)

	      	calcNum = $('<div>', {
	      		class: settings.controlsCls.number
	      	}).html(settings.numsStart)
	      		.appendTo(calcWrapper)

	      	calcDec = $('<div>', {
	      		class: settings.controlsCls.minus
	      	}).html(settings.minusСontent)
	      		.appendTo(calcWrapper)

	      	if(containForBool.lessOneMoreTwoType) {
						for(let i = 0; i < totalItems; i++) {
							allItems.push(+settings.numsStart)
						}
	      	}
	      	if(containForBool.equalsTwoType) {
	      		for(let i = 0; i < totalItems; i++) {
	      			let value = $items[i].innerHTML

							allItems.push({[value]: +settings.numsStart})
						}
	      	}
      	}

      	function use() {
      		for(let i = 0; i < totalItems; i++) {

						calcWrapper[i].addEventListener('click', function(e) {
							let target = e.target

							let classPlus = target.className == settings.controlsCls.plus
							let classMinus = target.className == settings.controlsCls.minus
							let max
							let min
							let maxPlus
							let maxMinus

							if(containForBool.lessOneMoreTwoType) {
								max = allItems[i] < settings.max
								min = allItems[i] > 0
								maxPlus = max && classPlus
								maxMinus = min && classMinus

								if(maxPlus) {
									calcNum[i].innerHTML = allItems[i] += 1
									totalSumm += 1
									headerUpdate()
								}
								if(maxMinus) {
									calcNum[i].innerHTML = allItems[i] -= 1
									totalSumm -= 1
									headerUpdate()
								}
							}
							if(containForBool.equalsTwoType) {
								let key = Object.keys(allItems[i])

								max = allItems[i][key] < settings.max
								min = allItems[i][key] > 0
								maxPlus = max && classPlus
								maxMinus = min && classMinus

								if(maxPlus) {
									calcNum[i].innerHTML = allItems[i][key] += 1
									totalSumm += 1
									headerUpdate()
								}
								if(maxMinus) {
									calcNum[i].innerHTML = allItems[i][key] -= 1
									totalSumm -= 1
									headerUpdate()
								}
							}
						})

					}
      	}

      	add()
      	use()
      }

      // вызовы
      createDropdown()
      controllers()
		})

		return this
	};
}(jQuery));








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