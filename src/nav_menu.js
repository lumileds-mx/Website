const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("mobile-menu");
const menuItems = document.querySelectorAll('#mobile-menu li a');


hamburger.addEventListener("click", () => {
    hamburger.classList.toggle('active');
    if (navMenu.classList.contains('show')) {
        navMenu.classList.remove('show');
        navMenu.classList.add('hide_my');

        setTimeout(() => {
            navMenu.classList.toggle("hidden");
        }, 500)
    } else {
        navMenu.classList.toggle("hidden");
        navMenu.classList.remove('hide_my');
        navMenu.classList.add('show');
    }
});

menuItems.forEach(item => {
    item.addEventListener('click', () => {
        navMenu.classList.toggle('hidden');
        navMenu.classList.remove('show');
        navMenu.classList.add('hide_my');
        hamburger.classList.remove('active');
    });
});
