const svgLogo = document.getElementById('svg-logo');
const svgName = document.getElementById('svg-name');

const targetLogo = document.getElementById('svg-fixed-logo');
const targetName = document.getElementById('svg-fixed-name');

const initPosLogo = svgLogo.getBoundingClientRect();
const endPosLogo = targetLogo.getBoundingClientRect();

const initPosName = svgName.getBoundingClientRect();
const endPosName = targetName.getBoundingClientRect();

const targetScroll = window.innerHeight / 2;
var statusCenter = false;

function interpolateRect(startRect, endRect, progress) {
    const interpolate = (start, end) => start + (end - start) * progress;
    return {
        top: interpolate(startRect.top, endRect.top),
        left: interpolate(startRect.left, endRect.left),
        width: interpolate(startRect.width, endRect.width),
        height: interpolate(startRect.height, endRect.height),
    };
}

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    console.log(scrollY, statusCenter)
    if (!statusCenter) {
        if (scrollY / targetScroll <= 1.1) {
            // Calculate interpolation between start and end
            const progress = Math.min(scrollY / targetScroll, 1.0);

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
        } else {
            targetLogo.style.opacity = 1;
            targetName.style.opacity = 1;
            document.getElementById("sticky-logo").style.display = "none";
            document.getElementById("st-bar-header").style.backgroundColor = "rgb(27, 27, 30)";
            statusCenter = true;
        }
    } else {
        if (scrollY / targetScroll < 1.1 && document.getElementById("sticky-logo").style.display == "none") {
            document.getElementById("sticky-logo").style.display = "block";
            document.getElementById("st-bar-header").style.backgroundColor = "rgb(27, 27, 30, 0.5)";
            targetLogo.style.opacity = 0;
            targetName.style.opacity = 0;
            statusCenter = false;
        }
    }
});