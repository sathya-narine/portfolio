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
    let currentIndex = 0;
    let scrollTimeout; // To manage scrolling delays
    let visibleBlocksCount = 3; // Default to 3 blocks for larger screens

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

    function updateVisibleBlocksCount() {
        if (window.innerWidth <= 576) {
            visibleBlocksCount = 1;
        } else if (window.innerWidth <= 768) {
            visibleBlocksCount = 2;
        } else {
            visibleBlocksCount = 3;
        }
    }

    function updateExperienceBlocks() {
        updateVisibleBlocksCount(); // Update visible blocks count based on screen width

        experienceBlocks.forEach((block, index) => {
            block.style.display = 'none';
            block.classList.remove('left', 'center', 'right');
        });

        for (let i = 0; i < visibleBlocksCount; i++) {
            const blockIndex = (currentIndex + i) % experienceBlocks.length;
            experienceBlocks[blockIndex].style.display = 'flex';

            if (i === 0) {
                experienceBlocks[blockIndex].classList.add('left');
            } else if (i === visibleBlocksCount - 1) {
                experienceBlocks[blockIndex].classList.add('right');
            } else {
                experienceBlocks[blockIndex].classList.add('center');
            }
        }

        // Update button states
        const leftBtn = document.querySelector('.left-slider-btn');
        const rightBtn = document.querySelector('.right-slider-btn');
        
        if (currentIndex <= 0) {
            leftBtn.classList.add('disabled');
        } else {
            leftBtn.classList.remove('disabled');
        }

        if (currentIndex >= experienceBlocks.length - visibleBlocksCount) {
            rightBtn.classList.add('disabled');
        } else {
            rightBtn.classList.remove('disabled');
        }
    }

    function slideLeft() {
        if (currentIndex > 0) {
            currentIndex--;
        }
        updateExperienceBlocks();
    }

    function slideRight() {
        if (currentIndex < experienceBlocks.length - visibleBlocksCount) {
            currentIndex++;
        }
        updateExperienceBlocks();
    }

    document.querySelector('.left-slider-btn').addEventListener('click', slideLeft);
    document.querySelector('.right-slider-btn').addEventListener('click', slideRight);

    // Adjust slider visibility on resize
    window.addEventListener('resize', updateExperienceBlocks);

    // Initial update
    updateExperienceBlocks();
});
