export default function initTSlider() {
    if(!document.querySelector('.js-ts-slider')) return;

    let slides = document.querySelectorAll(".s-ts__slide");
    let slidesQty = slides[0].parentElement.children.length;
    let container = document.querySelector(".js-ts-slider");
    let prevTrigger = document.querySelector(".js-ts-slider-prev");
    let nextTrigger = document.querySelector(".js-ts-slider-next");
    let speed = 500;
    let idx = 0;
    let sliderDirection = 'next';
    let sliderWasInteract = false;
    let clickable = true;

    function resetAnimation() {
        this.style.WebkitAnimation = "";
        this.style.animation = "";
    }

    function setAnimation(slide) {
        slide.style.WebkitAnimation = `move ${speed}ms`;
        slide.style.animation = `move ${speed}ms`;
        slide.addEventListener("webkitAnimationEnd", resetAnimation);
        slide.id = `slide_${slidesQty}`;
    }

    function moveThis(e) {
        if (clickable && e.target.classList.contains("s-ts__slide")) {
            clickable = false;

            if(sliderDirection == 'prev') {
                sliderDirection = 'next';

                if(idx != slidesQty) {
                    idx++;
                }
            }

            if (idx == slidesQty) idx = 0;

            let siblingNext = slides[idx].nextElementSibling;
            let siblingPrev = slides[idx].previousElementSibling;
            let prev = slidesQty - 1;
            let next = 1;

            setAnimation(slides[idx]);

            while (siblingNext) {
                siblingNext.id = `slide_${next}`;
                siblingNext = siblingNext.nextElementSibling;
                next++;
            }

            while (siblingPrev) {
                siblingPrev.id = `slide_${prev}`;
                siblingPrev = siblingPrev.previousElementSibling;
                prev--;
            }

            idx++;
            setTimeout(() => (clickable = true), speed);
        }
    }

    function moveThisNext() {
        if (clickable) {
            clickable = false;

            if(sliderDirection == 'prev') {
                sliderDirection = 'next';

                if(idx != slidesQty) {
                    idx++;
                }
            }

            if (idx == slidesQty) idx = 0;

            let siblingNext = slides[idx].nextElementSibling;
            let siblingPrev = slides[idx].previousElementSibling;
            let prev = slidesQty - 1;
            let next = 1;

            setAnimation(slides[idx]);

            while (siblingNext) {
                siblingNext.id = `slide_${next}`;
                siblingNext = siblingNext.nextElementSibling;
                next++;
            }

            while (siblingPrev) {
                siblingPrev.id = `slide_${prev}`;
                siblingPrev = siblingPrev.previousElementSibling;
                prev--;
            }

            idx++;
            setTimeout(() => (clickable = true), speed);
        }
    }

    function moveThisBack() {
        if (clickable) {
            clickable = false;

            if(sliderDirection == 'next') {
                sliderDirection = 'prev';

                if(idx != 0) {
                    idx--;
                }
            }

            if (idx == 0) idx = slidesQty;

            let siblingNext = slides[idx - 1].nextElementSibling;
            let siblingPrev = slides[idx - 1].previousElementSibling;
            let prev = slidesQty - 1;
            let next = 1;

            setAnimation(slides[idx -1]);

            while (siblingNext) {
                siblingNext.id = `slide_${next}`;
                siblingNext = siblingNext.nextElementSibling;
                next++;
            }

            while (siblingPrev) {
                siblingPrev.id = `slide_${prev}`;
                siblingPrev = siblingPrev.previousElementSibling;
                prev--;
            }

            idx--;
            setTimeout(() => (clickable = true), speed);
        }
    }

    container.addEventListener('click', (e) => {
        sliderWasInteract = true;
        moveThis(e);
    });
    nextTrigger.addEventListener('click', () => {
        sliderWasInteract = true;
        moveThisNext();
    });
    prevTrigger.addEventListener('click', () => {
        sliderWasInteract = true;
        moveThisBack();
    });

    const sliderInterval =  setInterval(sliderSetInterval, 3000);

    function sliderSetInterval() {
        if(!sliderWasInteract) {
            moveThisNext();
        } else {
            clearInterval(sliderInterval);
        }
    }
}
