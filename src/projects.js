let projects = []; // Global array for project data
let currentIndex = 0; // Index of the current project
let projectIntervalId;

let abortController = new AbortController();

const animations = ['camera-move-1', 'camera-move-2', 'camera-move-3'];

function assignRandomAnimation(img) {
    const randomIndex = Math.floor(Math.random() * animations.length);
    const animationName = animations[randomIndex];
    // console.log(animationName);
    img.style.animation = `${animationName} 5s ease-in-out alternate infinite`;
}

async function loadProjects() {
    const response = await fetch('/static/projects.json');
    projects = await response.json();
}

async function displayProject() {
    const signal = abortController.signal;
    const info = document.getElementById('project-desc');
    const vidElem = document.getElementById("project-vid");
    const imgElem = document.getElementById("project-img");
    
    // console.log("hello");
    const project = projects[currentIndex];
    if (!project) return; // Safety check
    // console.log("going in");
    try {

        const response = await fetch(`/static/projects/${project.folder}/info.html`);
        const content = await response.text();
        info.innerHTML = content;

        for (const file of project.files) {
            if (signal.aborted) throw new Error("Aborted")
            // console.log(file);
            if (file.endsWith("mp4")) {
                vidElem.style.opacity = 0;
                imgElem.style.opacity = 0;
                await new Promise(resolve => {
                    imgElem.ontransitionend = () => {
                        resolve();
                    };
                    vidElem.ontransitionend = () => {
                        resolve();
                    };
                });
                imgElem.classList.add("hidden");
                vidElem.classList.remove("hidden");
                vidElem.style.opacity = 1;
                vidElem.src = `/static/projects/${project.folder}/${file}`;
                // console.log(vidElem.src);
                await new Promise((resolve, reject) => {
                    signal.addEventListener("abort", reject);
                    vidElem.onended = () => {
                        resolve();
                    };
                }).catch(() => console.log("Video playback aborted"));
            } else {
                vidElem.style.opacity = 0;
                imgElem.style.opacity = 0;
                await new Promise(resolve => {
                    imgElem.ontransitionend = () => {
                        resolve();
                    };
                    vidElem.ontransitionend = () => {
                        resolve();
                    };
                });
                vidElem.classList.add("hidden");
                imgElem.classList.remove("hidden");
                imgElem.style.opacity = 1;
                imgElem.src = `/static/projects/${project.folder}/${file}`;
                assignRandomAnimation(imgElem);
                await new Promise((resolve, reject) => {
                    signal.addEventListener("abort", reject);
                    setTimeout(resolve, 5000);
                }).catch(() => console.log("Image display aborted"));
            }
        }
        if (!signal.aborted) {
            currentIndex = (currentIndex + 1) % projects.length;
        }
    } catch (error) {
        if (error.message === "Aborted") {
            console.log("Display project was aborted");
        } else {
            console.error("An error occurred:", error);
        }
    }
}

function handleSwipe(left) {
    if(abortController.signal.aborted) return;
    abortController.abort();
    if (left) {
        currentIndex = (currentIndex + 1) % projects.length;
    } else {
        if (currentIndex == 0) {
            currentIndex = projects.length - 1;
        } else {
            currentIndex = (currentIndex - 1) % projects.length;
        }
    }
    abortController = new AbortController();
}

function setupSwipeDetection() {
    let touchStartX = 0;

    document.addEventListener('touchstart', e => {
        touchStartX = e.touches[0].clientX;
    });

    document.addEventListener('touchend', e => {
        const touchEndX = e.changedTouches[0].clientX;

        // Detect swipe right
        if (touchEndX - touchStartX > 50) {
            handleSwipe(false);
            // console.log("swipe");
        } else if (touchEndX - touchStartX < -50) {
            handleSwipe(true);
        }
    });

    document.addEventListener('mousedown', e => {
        // console.log(e);
        // detect left click
        if (e.buttons == 1) {
            touchStartX = e.clientX;
        }
    });

    document.addEventListener('mouseup', e => {
        // const touchEndX = e.changedTouches[0].clientX;
        // console.log(e);
        if (e.buttons == 0) {
            const touchEndX = e.clientX;
            // // Detect swipe right
            if (touchEndX - touchStartX > 50) {
                handleSwipe(false);
                // console.log("right");
            } else if (touchEndX - touchStartX < -50) {
                handleSwipe(true);
                // console.log("left");
            }
        }

    });
}

async function init() {
    await loadProjects(); // Load project data
    setupSwipeDetection(); // Enable swipe detection
    while (true) {
        await displayProject();
    }
}

init(); // Initialize the app

