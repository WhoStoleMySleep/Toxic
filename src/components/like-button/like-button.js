let likeButton = document.querySelectorAll('.like-button');
let likeButtonLiked = document.querySelectorAll('.like-button__liked');

for(let char in likeButton){
	if(!isNaN(+char)){
		likeButton[char].addEventListener('click', () => {
			let likes = likeButtonLiked[char];
			let likesVal = likes.innerHTML;

			if(likeButton[char].classList.contains('_deactive')){
				likes.innerHTML = +likesVal + 1;
			} else if(!likeButton[char].classList.contains('_deactive')) {
				likes.innerHTML = +likesVal - 1;
			}

			likeButton[char].classList.toggle('_deactive');
		})
	}
}