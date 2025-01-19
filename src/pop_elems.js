var animationQueue = []
// Function to process the animations in the queue
async function processQueue() {
    while (animationQueue.length > 0) {
        const element = animationQueue[0]; // Get the first element in the queue

        // Play animation: add 'pop-in' class
        element.classList.add('pop-in');

        // Wait for 80% of the animation duration
        await waitForAnimation(0.8);

        // Remove the element from the queue after animation
        animationQueue.shift();

        // If queue is not empty, process the next element
    }
}

// Utility function to wait for a specific percentage of the animation
function waitForAnimation(progress) {
    return new Promise((resolve) => {
        const animationDuration = 300; // Example duration, adjust as necessary (in ms)
        const waitTime = animationDuration * progress;

        setTimeout(resolve, waitTime);
    });
}

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // add element to the queue
                animationQueue.push(entry.target);
                // If queue was empty, start processing the animations
                if (animationQueue.length === 1) {
                    processQueue();
                }
            }
        });
    },
    { threshold: 0.8 }
);
// entry.target.classList.add('pop-in');
document.querySelectorAll('.box').forEach((el) => {
    observer.observe(el);
    const index = el.getAttribute('data-index');
    // el.style.animationDelay = `${index * 300}ms`;
});