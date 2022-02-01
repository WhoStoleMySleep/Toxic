let burger = document.getElementById('burger');
let links = document.getElementById('links');
let body = document.body;

burger.addEventListener('click', function() {
   links.classList.toggle('_active');
   body.classList.toggle('_blockSwipe')
})