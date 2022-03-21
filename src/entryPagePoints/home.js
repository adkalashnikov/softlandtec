import '@/assets/sass/entryPage/home.scss';
import initTSlider from 'js/components/testimonials-slider';
import scrollToElem from 'js/components/scrollToElem';

document.addEventListener('DOMContentLoaded', () => {
    // lazy load video background
    let lazyVideos = [].slice.call(document.querySelectorAll("video.js-video-bg"));

    if ("IntersectionObserver" in window) {
        let lazyVideoObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(video) {
                if (video.isIntersecting) {
                    for (let source in video.target.children) {
                        let videoSource = video.target.children[source];
                        if (typeof videoSource.tagName === "string" && videoSource.tagName === "SOURCE") {
                            videoSource.src = videoSource.dataset.src;
                        }
                    }

                    video.target.load();
                    video.target.classList.remove("lazy");
                    lazyVideoObserver.unobserve(video.target);
                }
            });
        });

        lazyVideos.forEach(function(lazyVideo) {
            lazyVideoObserver.observe(lazyVideo);
        });
    }
    // /lazy load video background

    // show more text in about us cards
    const moreContentTriggers = [].slice.call(document.querySelectorAll('.js-show-more-text'));

    if(moreContentTriggers) {
        moreContentTriggers.forEach((trigger) => {
            trigger.addEventListener('click', (e) => {
                const hiddenContent = e.target.parentNode.querySelector('.s-ab__item-more-text');
                dl.log(hiddenContent);
                hiddenContent.classList.toggle('hide');

                if (e.target.innerHTML === "Show More") {
                    e.target.innerHTML = "Show Less";
                } else {
                    e.target.innerHTML = "Show More";
                }
            });
        });
    }
    // /show more text in about us cards

    // testimonials-slider
    initTSlider();

    // scroll to contact us section
    const contactLinks = document.querySelectorAll('a[href^="#c-us"]');

    if(contactLinks) {
        [ ...contactLinks ].forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                let currentTarget = e.currentTarget,
                    hash = currentTarget.getAttribute('href'),
                    target = document.getElementById(hash.substring(1));

                if(!target) return;

                if(document.body.classList.contains('show-nav')) {
                    document.body.classList.remove('show-nav')
                }

                scrollToElem(target, 150);
            });
        });
    }
    // /scroll to contact us section
});
