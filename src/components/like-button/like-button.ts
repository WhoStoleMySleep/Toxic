const likeButton = document.querySelectorAll('.like-button');
const likeButtonLiked = document.querySelectorAll('.like-button__liked');

if(likeButton !== null && likeButtonLiked !== null){
	for (let index = 0; index < likeButton.length; index += 1) {
		likeButton[index].addEventListener('click', () => {
			const likes = likeButtonLiked[index];
			const likesVal = likes.innerHTML;
	
			if(likeButton[index].classList.contains('_deactive')){
				likes.innerHTML = (+likesVal + 1).toString();
			} else if(!likeButton[index].classList.contains('_deactive')) {
				likes.innerHTML = (+likesVal - 1).toString();
			}
	
			likeButton[index].classList.toggle('_deactive');
		})
	}
}