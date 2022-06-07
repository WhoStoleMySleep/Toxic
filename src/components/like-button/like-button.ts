const likeButton = document.querySelectorAll('.like-button');
const likeButtonLiked = document.querySelectorAll('.like-button__liked');

if (likeButton && likeButtonLiked) {
  const likeButtonFunc = (index: number, likes: HTMLElement, likesVal: string) => {
    const onClickLikeButton = () => {
      if (likeButton[index].classList.contains('_deactive')) {
        likes.innerHTML = `${+likesVal + 1}`;
      } else {
        likes.innerHTML = likesVal;
      }

      likeButton[index].classList.toggle('_deactive');
    };

    onClickLikeButton();
  };

  for (let index = 0; index < likeButton.length; index += 1) {
    const likes = likeButtonLiked[index] as HTMLElement;
    const likesVal = likes.innerHTML;

    likeButton[index].addEventListener('click', () => likeButtonFunc(index, likes, likesVal));
  }
}
