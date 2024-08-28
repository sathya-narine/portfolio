document.addEventListener('DOMContentLoaded', function () {
    const navItems = document.querySelectorAll('.nav-item');
    const contentWrapper = document.getElementById('contentWrapper');
    const bubbles = document.querySelectorAll('.bubble');
    const box = document.querySelector('.box');
    const quote = document.querySelector('.quote');
    const aboutSection = document.getElementById('about');
    const experienceSection = document.getElementById('experience');
    const neverGiveUpSection = document.getElementById('never-give-up');
    const experienceBlocks = document.querySelectorAll('.experience-block');
    const projectRows = document.querySelectorAll('.project-row');
    let currentIndex = 0;
    let currentProjectIndex = -1; // Initially no project is displayed
    let scrollTimeout; // To manage scrolling delays

    navItems.forEach(item => {
        item.addEventListener('mouseover', function () {
            contentWrapper.classList.add('blurred');
        });

        item.addEventListener('mouseout', function () {
            contentWrapper.classList.remove('blurred');
        });
    });

    function handleScroll() {
        const scrollTop = window.scrollY;

        bubbles.forEach(bubble => {
            if (scrollTop > 100) {
                bubble.classList.add('animate');
            }
        });

        if (scrollTop > 200) {
            box.classList.add('shrink');
            quote.classList.add('animate');
        } else {
            box.classList.remove('shrink');
            quote.classList.remove('animate');
        }

        if (scrollTop > (aboutSection.offsetTop - window.innerHeight)) {
            aboutSection.classList.add('visible');
        } else {
            aboutSection.classList.remove('visible');
        }

        if (scrollTop > (experienceSection.offsetTop - window.innerHeight / 1.5)) {
            experienceSection.querySelector('h2').classList.add('visible');
        } else {
            experienceSection.querySelector('h2').classList.remove('visible');
        }

        const neverGiveUpOffset = neverGiveUpSection.offsetTop;
        const neverGiveUpHeight = neverGiveUpSection.offsetHeight;

        if (scrollTop > (neverGiveUpOffset - window.innerHeight / 1.5) &&
            scrollTop < (neverGiveUpOffset + neverGiveUpHeight)) {

            const offset = scrollTop - neverGiveUpOffset + window.innerHeight / 1.5;
            const step = neverGiveUpHeight / 3;

            const textElements = neverGiveUpSection.querySelectorAll('.text');
            textElements.forEach((text, index) => {
                if (offset > step * index) {
                    text.classList.add('visible');
                } else {
                    text.classList.remove('visible');
                }
            });

            $('body').removeClass(function (index, css) {
                return (css.match(/(^|\s)color-\S+/g) || []).join(' ');
            });
            $('body').addClass('color-black');
        }

        
        // jQuery scroll handling logic for project section
        const $window = $(window);
        const $body = $('body');
        const $panel = $('.project');

        const scroll = $window.scrollTop() + ($window.height() / 3);

        $panel.each(function () {
            const $this = $(this);

            if ($this.position().top <= scroll && $this.position().top + $this.height() > scroll) {
                $body.removeClass(function (index, css) {
                    return (css.match(/(^|\s)color-\S+/g) || []).join(' ');
                });

                $body.addClass('color-' + $(this).data('color'));
            }
        });
    }

    window.addEventListener('scroll', handleScroll);

    function updateExperienceBlocks() {
        experienceBlocks.forEach((block, index) => {
            block.style.display = 'none';
            block.classList.remove('left', 'center', 'right');
        });

        experienceBlocks[currentIndex].style.display = 'flex';
        experienceBlocks[(currentIndex + 1) % experienceBlocks.length].style.display = 'flex';
        experienceBlocks[(currentIndex + 2) % experienceBlocks.length].style.display = 'flex';

        experienceBlocks[currentIndex].classList.add('left');
        experienceBlocks[(currentIndex + 1) % experienceBlocks.length].classList.add('center');
        experienceBlocks[(currentIndex + 2) % experienceBlocks.length].classList.add('right');
    }

    updateExperienceBlocks();

    function slideLeft() {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            return;
        }
        updateExperienceBlocks();
    }

    function slideRight() {
        if (currentIndex < experienceBlocks.length - 3) {
            currentIndex++;
        } else {
            return;
        }
        updateExperienceBlocks();
    }

    document.querySelector('.left-slider-btn').addEventListener('click', slideLeft);
    document.querySelector('.right-slider-btn').addEventListener('click', slideRight);
});
