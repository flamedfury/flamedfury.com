const navToggle = document.querySelector('.primary-nav__toggle');
const navLinks = document.querySelectorAll('.primary-nav__link')

navToggle.addEventListener('click', () => {
  document.body.classList.toggle('primary-nav__open');
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    document.body.classList.remove('primary-nav__open');
  })
})
