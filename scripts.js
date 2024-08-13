document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav-item');
    const contentWrapper = document.getElementById('contentWrapper');

    navItems.forEach(item => {
        item.addEventListener('mouseover', function() {
            contentWrapper.classList.add('blurred');
        });

        item.addEventListener('mouseout', function() {
            contentWrapper.classList.remove('blurred');
        });
    });
});
