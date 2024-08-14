document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav-item');
    const contentWrapper = document.getElementById('contentWrapper');
    const bubbles = document.querySelectorAll('.bubble');
    const box = document.querySelector('.box');
    const h1 = document.querySelector('.box h1');

    navItems.forEach(item => {
        item.addEventListener('mouseover', function() {
            contentWrapper.classList.add('blurred');
        });

        item.addEventListener('mouseout', function() {
            contentWrapper.classList.remove('blurred');
        });
    });

    // Function to handle scroll events
    function handleScroll() {
        const scrollTop = window.scrollY;

        // Add animation to bubbles based on scroll position
        bubbles.forEach(bubble => {
            if (scrollTop > 100) {
                bubble.classList.add('animate');
            }
        });

        // Shrink the box and fade out the h1 text based on scroll position
        if (scrollTop > 200) {
            box.classList.add('shrink');
        } else {
            box.classList.remove('shrink');
        }
    }

    // Attach scroll event listener
    window.addEventListener('scroll', handleScroll);
});
