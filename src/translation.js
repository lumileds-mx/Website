const svgLogo = document.getElementById('svg-logo');
const svgName = document.getElementById('svg-name');

const targetLogo = document.getElementById('svg-fixed-logo');
const targetName = document.getElementById('svg-fixed-name');

// const initPosLogo = svgLogo.getBoundingClientRect();
const vw = window.innerWidth;
const vh = window.innerHeight;
let initPosLogo = {
    top: 0.5 * vh - 0.21 * vw,
    left: 0.4 * vw,
    width: 0.2 * vw,
    height: 0.3 * vw
}
let endPosLogo = targetLogo.getBoundingClientRect();

// const initPosName = svgName.getBoundingClientRect();
let initPosName = {
    top: 0.5 * vh + 0.11 * vw,
    left: 0.25 * vw,
    width: 0.5 * vw,
    height: 0.1 * vw
}
let endPosName = targetName.getBoundingClientRect();

const targetScroll = window.innerHeight / 2;
let statusCenter = false;
let progress = 0.0;

function interpolateRect(startRect, endRect, progress) {
    const interpolate = (start, end) => start + (end - start) * progress;
    return {
        top: interpolate(startRect.top, endRect.top),
        left: interpolate(startRect.left, endRect.left),
        width: interpolate(startRect.width, endRect.width),
        height: interpolate(startRect.height, endRect.height),
    };
}

function setTransformations() {
    const rectLogo = interpolateRect(initPosLogo, endPosLogo, progress);
    const rectName = interpolateRect(initPosName, endPosName, progress);

    svgLogo.style.top = `${rectLogo.top}px`;
    svgLogo.style.left = `${rectLogo.left}px`;
    svgLogo.style.width = `${rectLogo.width}px`;
    svgLogo.style.height = `${rectLogo.height}px`;

    svgName.style.top = `${rectName.top}px`;
    svgName.style.left = `${rectName.left}px`;
    svgName.style.width = `${rectName.width}px`;
    svgName.style.height = `${rectName.height}px`;
}

function distanceLeft() {
    const posLogo = svgLogo.getBoundingClientRect();
    const diff_top = posLogo.top - endPosLogo.top;
    const diff_left = posLogo.left - endPosLogo.left;
    const diff_width = posLogo.width - endPosLogo.width;
    const diff_height = posLogo.height - endPosLogo.height;
    return Math.abs(diff_top) + Math.abs(diff_left) + Math.abs(diff_width) + Math.abs(diff_height);
}

window.addEventListener('resize', () => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    initPosLogo.top = 0.5 * vh - 0.21 * vw;
    initPosLogo.left = 0.4 * vw;
    initPosLogo.width = 0.2 * vw;
    initPosLogo.height = 0.3 * vw;

    initPosName.top = 0.5 * vh + 0.11 * vw;
    initPosName.left = 0.25 * vw;
    initPosName.width = 0.5 * vw;
    initPosName.height = 0.1 * vw;

    endPosLogo = targetLogo.getBoundingClientRect();
    endPosName = targetName.getBoundingClientRect();

    setTransformations();
});

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    // console.log(scrollY);
    if (!statusCenter) {
        if (distanceLeft() < 5 || scrollY > 2*targetScroll) {
            targetLogo.style.opacity = 1;
            targetName.style.opacity = 1;
            document.getElementById("sticky-logo").style.display = "none";
            document.getElementById("st-bar-header").style.backgroundColor = "rgb(249, 186, 45)";
            statusCenter = true;
        } else {
            progress = Math.min(scrollY / targetScroll, 1.0);
            setTransformations();
        }
    } else {
        if (scrollY / targetScroll < 1.1 && document.getElementById("sticky-logo").style.display == "none") {
            document.getElementById("sticky-logo").style.display = "block";
            document.getElementById("st-bar-header").style.backgroundColor = "rgb(27, 27, 30, 0.5)";
            targetLogo.style.opacity = 0;
            targetName.style.opacity = 0;
            statusCenter = false;
            progress = 0.97;
            setTransformations();
        }
    }
});