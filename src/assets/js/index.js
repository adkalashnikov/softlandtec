import AOS from 'aos';
import showNav from 'js/components/main-nav';

//Sticky header
document.addEventListener('scroll', () => {
    const header = document.querySelector('.js-h-sticky');
    if(!header) return;
    let sticky = header.offsetTop;

    if(window.pageYOffset > sticky) {
        header.classList.add('is-sticky');
    } else {
        header.classList.remove('is-sticky');
    }
});
// /Sticky header

window.addEventListener('load', () => {
    showNav();

    // init animation lib
    setTimeout(() => {
        AOS.init({
            once: true,
            duration: 500,
            disable() {
                return window.innerWidth < 992;
            }
        });
    }, 0);
});
