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
			clearBtn: false,
			submitBtn: false,
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
      		$this.toggleClass('_active')
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

	      	calcDec = $('<div>', {
	      		class: settings.controlsCls.minus
	      	}).html(settings.minusСontent)
	      		.appendTo(calcWrapper)

	      	calcNum = $('<div>', {
	      		class: settings.controlsCls.number
	      	}).html(settings.numsStart)
	      		.appendTo(calcWrapper)

	      	calcPlus = $('<div>', {
	      		class: settings.controlsCls.plus
	      	}).html(settings.plusСontent)
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

	      	for(let i = 0; i < totalItems; i++){
						if(!(allItems[i] > 0)) {
							calcPlus[i].classList.add('_active')
							calcDec[i].classList.remove('_active')
						}
		      	if(!(allItems[i] < settings.max)) {
							calcDec[i].classList.add('_active')
							calcPlus[i].classList.remove('_active')
						}
	      	}
      	}

      	function use() {
      		for(let i = 0; i < totalItems; i++) {

						calcWrapper[i].addEventListener('click', function(e) {
							let target = e.target

							let classPlus = target.className.split(' ')[0] == settings.controlsCls.plus
							let classMinus = target.className.split(' ')[0] == settings.controlsCls.minus
							let max
							let min
							let maxPlus
							let maxMinus

							if(containForBool.lessOneMoreTwoType) {
								min = allItems[i] > 0
								max = allItems[i] < settings.max
								maxMinus = min && classMinus
								maxPlus = max && classPlus

								if(maxMinus) {
									allItems[i] = +calcNum[i].innerHTML - 1

									calcNum[i].innerHTML = allItems[i]

									totalSumm = 0
									for(let char of allItems) {
										totalSumm += +char
									}

									headerUpdate()

									calcPlus.addClass('_active')
								}
								if(maxPlus) {
									allItems[i] = +calcNum[i].innerHTML + 1

									calcNum[i].innerHTML = allItems[i]

									totalSumm = 0
									for(let char of allItems) {
										totalSumm += +char
									}

									headerUpdate()

									calcDec[i].classList.add('_active')
									$this.find('.dropdown__btn-clear').removeClass('_disable')
									$this.find('.dropdown__btn-submit').removeClass('_disable')
								}

								if(!(allItems[i] > 0)) {
									calcDec[i].classList.remove('_active')
								}
								if(!(totalSumm > 0)) {
									$this.find('.dropdown__btn-clear').addClass('_disable')
									$this.find('.dropdown__btn-submit').addClass('_disable')
								}
								if(!(allItems[i] < settings.max)) {
									calcPlus[i].classList.remove('_active')
								}
							}
							if(containForBool.equalsTwoType) {
								let key = Object.keys(allItems[i])

								min = allItems[i][key] > 0
								max = allItems[i][key] < settings.max
								maxMinus = min && classMinus
								maxPlus = max && classPlus

								if(maxMinus) {
									calcNum[i].innerHTML = allItems[i][key] -= 1
									totalSumm -= 1
									headerUpdate()

									calcPlus.addClass('_active')
								}
								if(maxPlus) {
									calcNum[i].innerHTML = allItems[i][key] += 1
									totalSumm += 1
									headerUpdate()

									calcDec[i].classList.add('_active')
									$this.find('.dropdown__btn-clear').removeClass('_disable')
									$this.find('.dropdown__btn-submit').removeClass('_disable')
								}

								if(!(allItems[i] > 0)) {
									calcDec[i].classList.remove('_active')
								}
								if(!(totalSumm > 0)) {
									$this.find('.dropdown__btn-clear').addClass('_disable')
									$this.find('.dropdown__btn-submit').addClass('_disable')
								}
								if(!(allItems[i][key] < settings.max)) {
									calcPlus[i].classList.remove('_active')
								}
							}
						})
					}
      	}

      	add()
      	use()
      }

      function buttons(){
      	let btnWrapper
      	let btnClear
				let btnSubmit

        function add() {
        	btnWrapper = $('<div>', {
						class: 'dropdown__btn-wrapper',
					}).appendTo($menu)

        	if(settings.clearBtn){
						btnClear = $('<button>', {
							type: 'button',
							class: 'dropdown__btn-clear'
						}).html('очистить')
							.appendTo(btnWrapper)
        	}
        	if(settings.submitBtn) {
						btnSubmit = $('<button>', {
							type: 'button',
							class: 'dropdown__btn-submit'
						}).html('применить')
							.appendTo(btnWrapper)
        	}

        	if(!settings.numsStart) {
        		btnClear.addClass('_disable')
        		btnSubmit.addClass('_disable')
        	}
        }

        function use() {
        	let total = ''

        	if(settings.clearBtn) {
	        	btnClear.on('click', function() {
	        		total = totalSumm > 0

	        		if(total) {
		        		let length = allItems.length

								$this.find('.' + settings.controlsCls.number).html('0')
								$selection.val('')

								for(let i = 0; i < length; i++) {
									allItems[i] = 0
								}

								totalSumm = 0

								$this.find('.' + settings.controlsCls.minus).removeClass('_active')
								btnClear.addClass('_disable')
								btnSubmit.addClass('_disable')

								console.log('work')
	        		}
						})
        	}
        	if(settings.submitBtn) {
	        	btnSubmit.on('click', function() {
	        		total = totalSumm > 0

	        		if(total) {
								$this.toggleClass('_active')
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
      buttons()
		})

		return this
	};
}(jQuery));