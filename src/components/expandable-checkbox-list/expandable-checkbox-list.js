const expandableCheckboxlist = document.querySelector('#expandable-checkbox-list');
let target = document.querySelector('#target')
const targetSpan = document.querySelector('#target span')

target.onclick = () => {
	expandableCheckboxlist.classList.toggle('_active')
	targetSpan.classList.toggle('_active')
}