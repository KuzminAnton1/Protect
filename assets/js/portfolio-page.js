window.addEventListener("DOMContentLoaded", () => {

    const prev = document.querySelector(".portfolio-works__slider__prev"),
    next = document.querySelector(".portfolio-works__slider__next");

    prev.classList.add("arrow-disabled");

    const ourWorksSl = new Swiper('.portfolio-works__slider__wrap', {
        slidesPerView: 2,
        direction: 'horizontal',
        loop: false,
        simulateTouch: true,
        touchRatio: 1,
        touchAngle: 45,
        grabCursor: true,
    
        navigation: {
        nextEl: '.portfolio-works__slider__next',
        prevEl: '.portfolio-works__slider__prev',
        },
        pagination:{
            el: '.portfolio-works__slider__dots',
            clickable: true
        },
        breakpoints: {
            352: {
                slidesPerView: 1,
            },
            992: {
                slidesPerView: 2,
            }
        }
    });
    ourWorksSl.on('progress', function () {
        ourWorksSlCB(this);

    });
    function ourWorksSlCB(data){
        if(data.activeIndex > 0){
            prev.classList.add("arrow-active");
            next.classList.remove("arrow-disabled");
            next.classList.add("arrow-active");
        }
        if(data.activeIndex == 0){
            prev.classList.add("arrow-disabled");
            prev.classList.remove("arrow-active");
        }
        if(data.progress == 1){
            next.classList.add("arrow-disabled");
            next.classList.remove("arrow-active");
        }
    }

    Fancybox.bind("[data-fancybox]", {
        fullscreen: true
    });
})