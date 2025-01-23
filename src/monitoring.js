document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.getElementById('image-carousel');
    const images = carousel.querySelectorAll('img');
    let currentIndex = 0;
    let timeoutId;
    let intervalId;

    function showNextImage() {
        // Fade out current image
        images[currentIndex].classList.replace('opacity-100', 'opacity-0');
        
        // Update index
        currentIndex = (currentIndex + 1) % images.length;
        
        // Fade in next image
        images[currentIndex].classList.replace('opacity-0', 'opacity-100');
    }

    function startTimer() {
        timeoutId = setTimeout(() => {
            showNextImage();
            intervalId = setInterval(showNextImage, 5000);
        }, 5000);
    }

    function resetTimer() {
        clearTimeout(timeoutId);
        clearInterval(intervalId);
        startTimer();
    }

    // Initial timer
    startTimer();

    // Click/touch handler
    carousel.addEventListener('click', () => {
        showNextImage();
        resetTimer();
    });

    // Pause on hover (optional)
    carousel.addEventListener('mouseenter', () => {
        clearTimeout(timeoutId);
        clearInterval(intervalId);
    });
    
    carousel.addEventListener('mouseleave', resetTimer);
});