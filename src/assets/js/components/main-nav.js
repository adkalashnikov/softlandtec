export default function showNav() {
    if(!document.querySelector('.js-nav-trigger')) return;

    const navTriggers = document.querySelectorAll('.js-nav-trigger'),
        closeTrigger = document.querySelector('.js-nav-close'),
        body = document.querySelector('body');

    navTriggers.forEach((trigger) => {
        trigger.addEventListener('click', () => {
            body.classList.add('show-nav');
        });
    });

    closeTrigger.addEventListener('click', () => {
        body.classList.remove('show-nav');
    });
}
