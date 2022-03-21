export default function scrollToElem(target, offset = 0) {
    const elementPosition = target.offsetTop,
        offsetPosition = elementPosition - offset,
        isIE11 = Boolean(window.MSInputMethodContext) && Boolean(document.documentMode);

    if(isIE11) {
        window.scrollTo(0, elementPosition);
    } else {
        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    }
}
