const likeButton = document.querySelectorAll('.like-button');
const likeButtonLiked = document.querySelectorAll('.like-button__liked');

if (likeButton && likeButtonLiked) {
  const onClickLikeButton = (index: number) => {
    const likes = likeButtonLiked[index];
    const likesVal = likes.innerHTML;

    if (likeButton[index].classList.contains('_deactive')) {
      likes.innerHTML = (+likesVal + 1).toString();
    } else {
      likes.innerHTML = (+likesVal - 1).toString();
    }

    likeButton[index].classList.toggle('_deactive');
  };

  for (let index = 0; index < likeButton.length; index += 1) {
    likeButton[index].addEventListener('click', () => onClickLikeButton(index));
  }
}
