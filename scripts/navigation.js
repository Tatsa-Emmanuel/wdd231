const menuBtn = document.querySelector('#menu-btn');
const primaryNav = document.querySelector('#primary-nav');

menuBtn.addEventListener('click', () => {
    primaryNav.classList.toggle('open');
    menuBtn.textContent = primaryNav.classList.contains('open') ? '✕' : '☰';
});