export default function modal(trigger) {
    const body = document.querySelector('body'),
        modal = document.querySelector('.js-modal');

    trigger.addEventListener('click', (e) => {
        e.preventDefault();

        if(body.classList.contains('show-nav')) {
            body.classList.remove('show-nav');
        }

        modal.classList.add('active');
        body.classList.add('show-modal');
    });

    // close modal on esc btn
    document.addEventListener('keydown', (e) => {
        if(document.querySelector('body.show-modal') && e.keyCode === 27) {
            modal.classList.remove('active');
            body.classList.remove('show-modal');
        }
    });
}