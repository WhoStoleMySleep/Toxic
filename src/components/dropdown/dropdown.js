"use strict";
(function($) {
	// функция вызова jQuery-плагина
	$.fn.dropdown = function(options) {

		var config = $.extend({}, {
		  type: 0,
		  max:10,
		}, options);
		
		function main(e) {
			let type = config.type;
			let max;
			if(config.max > 0){
				max = config.max;
			}

			if(type === 0 || type === 1){
				if(type === 0){
					e.html(`
						<div class="dropdown">
							<h3 class="dropdown__title">Гости</h3>
							<div class="dropdown__dropdown">
							    <div class="dropdown__start"><input class="dropdown__text" type="text" name="dropdown" value="Сколько гостей" readonly="readonly" />
							        <p class="dropdown__expand">expand_more</p>
							    </div>
							    <div class="dropdown__select">
							        <div class="select__one">
							            <h3 class="select__name">Взрослые</h3>
							            <div class="select__select-group">
							                <p class="select__decrement" id="decrementOne">-</p>
							                <h3 class="select__coll" id="collOne">0</h3>
							                <p class="select__increment" id="incrementOne">+</p>
							            </div>
							        </div>
							        <div class="select__two">
							            <h3 class="select__name">Дети</h3>
							            <div class="select__select-group">
							                <p class="select__decrement" id="decrementTwo">-</p>
							                <h3 class="select__coll" id="collTwo">0</h3>
							                <p class="select__increment" id="incrementTwo">+</p>
							            </div>
							        </div>
							        <div class="select__three">
							            <h3 class="select__name">Младенцы</h3>
							            <div class="select__select-group">
							                <p class="select__decrement" id="decrementThree">-</p>
							                <h3 class="select__coll" id="collThree">0</h3>
							                <p class="select__increment" id="incrementThree">+</p>
							            </div>
							        </div>
							        <div class="select__button">
							            <div class="select__button-clear" id="selectClear">очистить</div>
							            <div class="select__button-submit" id="selectSubmit">применить</div>
							        </div>
							    </div>
							</div>
						</div>
					`)
				} else if(type === 1){
					e.html(`
						<div class="dropdown">
							<h3 class="dropdown__title">Удобства номера</h3>
							<div class="dropdown__dropdown">
							    <div class="dropdown__start"><input class="dropdown__text" type="text" name="dropdown" value="Какие удобства" readonly="readonly" />
							        <p class="dropdown__expand">expand_more</p>
							    </div>
							    <div class="dropdown__select">
							        <div class="select__one">
							            <h3 class="select__name">Спальни</h3>
							            <div class="select__select-group">
							                <p class="select__decrement" id="decrementOne">-</p>
							                <h3 class="select__coll" id="collOne">0</h3>
							                <p class="select__increment" id="incrementOne">+</p>
							            </div>
							        </div>
							        <div class="select__two">
							            <h3 class="select__name">Кровати</h3>
							            <div class="select__select-group">
							                <p class="select__decrement" id="decrementTwo">-</p>
							                <h3 class="select__coll" id="collTwo">0</h3>
							                <p class="select__increment" id="incrementTwo">+</p>
							            </div>
							        </div>
							        <div class="select__three">
							            <h3 class="select__name">Ванные комнаты</h3>
							            <div class="select__select-group">
							                <p class="select__decrement" id="decrementThree">-</p>
							                <h3 class="select__coll" id="collThree">0</h3>
							                <p class="select__increment" id="incrementThree">+</p>
							            </div>
							        </div>
							        <div class="select__button">
							            <div class="select__button-clear" id="selectClear">очистить</div>
							            <div class="select__button-submit" id="selectSubmit">применить</div>
							        </div>
							    </div>
							</div>
						</div>
					`)
				}

				(function dropdownEvents() {
					let dropdown = $(`.${e.attr('class')} .dropdown__dropdown`)
					let dropdownStart = $(`.${e.attr('class')} .dropdown__start`)
					let dropdownText = $(`.${e.attr('class')} .dropdown__text`)
					let dropdownSelect = $(`.${e.attr('class')} .dropdown__select`)
					let selectIncrement = $(`.${e.attr('class')} .select__increment`)
					let selectIncrementVal = [0,0,0]
					let summ;
					let selectDecrement = $(`.${e.attr('class')} .select__decrement`)
					let selectColl = $(`.${e.attr('class')} .select__coll`)
					let selectButtonClear = $(`.${e.attr('class')} .select__button-clear`)
					let selectButtonSubmit = $(`.${e.attr('class')} .select__button-submit`)
					
					dropdownStart.on('click', () => {
						dropdown.toggleClass('_active')
					})

					dropdown.on('click', (e) => {
						summ = 0;
						for(let arr of selectIncrementVal){
							summ += +arr
						}

						for(let i = 0; i !== 3; i++ ){
							selectColl[i].innerHTML = selectIncrementVal[i]
						}

						function incrementRecursStyle(i) {
							if(i >= 0){
								if(summ === max){
									selectIncrement[i].style.opacity = 0.38
									selectIncrement[i].style.cursor = 'default'
								} else {
									selectIncrement[i].style.opacity = 1
									selectIncrement[i].style.cursor = 'pointer'
								}
								incrementRecursStyle(i - 1)
							}
						}incrementRecursStyle(2)

						function decrementRecursStyle(i) {
							if(i >= 0){
								if(selectIncrementVal[i] !== 0){
									selectDecrement[i].style.opacity = 1
									selectDecrement[i].style.cursor = 'pointer'
								} else {
									selectDecrement[i].style.opacity = 0.38
									selectDecrement[i].style.cursor = 'default'
								}
								decrementRecursStyle(i - 1);
							}
						}decrementRecursStyle(2)

						if(summ > 0){
							selectButtonClear.css({'opacity':'1','cursor':'pointer'})
							selectButtonSubmit.css({'opacity':'1','cursor':'pointer'})

							if(type === 0){
								dropdownText.val(summ + ' гостей')
							} else if(type === 1){
								let [bedroom,bed,bathrooms] = selectIncrementVal
								let result = []

								if(bedroom > 0){
									result.push(`${bedroom} спальни`)
								}
								if(bed > 0){
									result.push(`${bed} кровати`)
								}
								if(bathrooms > 0){
									result.push(`${bathrooms} ванны`)
								}
								result = result.join(', ')
								
								dropdownText.val(result)
							}

							if(!selectButtonClear.hasClass('enabled')) {
								selectButtonClear.on('click', () => {
									selectIncrementVal = [0,0,0]
									dropdown.toggleClass('_active')
								})
								selectButtonSubmit.on('click', () => {
									dropdown.toggleClass('_active')
								})
								selectButtonClear.addClass('enabled')
							}
						} else {
							selectButtonClear.css({'opacity':'0.5','cursor':'default'})
							selectButtonSubmit.css({'opacity':'0.5','cursor':'default'})

							if(type === 0){
								dropdownText.val('Сколько гостей')
							} else if(type === 1) {
								dropdownText.val('Какие удобства')
							}

							if(selectButtonClear.hasClass('enabled')){
								selectButtonClear.off('click')
								selectButtonSubmit.off('click')
								selectButtonClear.removeClass('enabled')
							}
						}
					})
					selectIncrement.on('click', (e) => {
						let targetId = e.target.id

						if(summ !== max){
							if(targetId === 'incrementOne'){
								selectIncrementVal[0] += 1
							}
							if(targetId === 'incrementTwo'){
								selectIncrementVal[1] += 1
							}
							if(targetId === 'incrementThree'){
								selectIncrementVal[2] += 1
							}
						}	
					})

					selectDecrement.on('click', (e) => {
						let targetId = e.target.id

						if(targetId === 'decrementOne' && selectIncrementVal[0] !== 0){
							selectIncrementVal[0] -= 1
						}
						if(targetId === 'decrementTwo' && selectIncrementVal[1] !== 0){
							selectIncrementVal[1] -= 1
						}
						if(targetId === 'decrementThree' && selectIncrementVal[2] !== 0){
							selectIncrementVal[2] -= 1
						}
					})

				})()


			} else {
				dropdown.html('<h1>&ltDropdown&gt Err: Setting \'type\', may be - 1 or 2</h1>')
			}
		}
		this.each(function() { main($(this)); });
		return this;
	};
})(jQuery);