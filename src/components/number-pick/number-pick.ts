import '../date-dropdown/date-dropdown'
import '../dropdown/dropdown.js';

try {
	($(document) as any).ready(() => {
		($('.dropdown') as any).dropdown({
			type: 1,
			buttons: {
				clearEnable: true,
			},
			clearBtn: true,
			submitBtn: true
		});
	});
} catch (err) {
	console.log('number-pick.js,dropdown:' + err)
}