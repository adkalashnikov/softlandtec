export default function modal(trigger) {
    const body = document.querySelector('body'),
        modal = document.querySelector('.js-modal'),
        closeBtn = document.querySelector('.js-close-modal');

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

    // close modal btn
    closeBtn.addEventListener('click', () => {
        if(document.querySelector('body.show-modal')) {
            modal.classList.remove('active');
            body.classList.remove('show-modal');

            // add custom event to modal
            modal.dispatchEvent(new CustomEvent('modalClosed', { bubbles: true }));
        }
    });
}
