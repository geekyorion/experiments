const nav = document.querySelector('nav');
const toggleButton = document.querySelector('.toggle-button');

toggleButton.addEventListener('click', (e) => {
    toggleButton.classList.toggle('active');
    nav.classList.toggle('expand');
});
