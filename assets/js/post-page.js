window.addEventListener("DOMContentLoaded", () => {

    const prev = document.querySelector(".post-slider__wrap__prev"),
    next = document.querySelector(".post-slider__wrap__next");

    prev.classList.add("arrow-disabled");

    const postSlider = new Swiper('.post-slider__wrap__slider', {
        slidesPerView: 3,
        direction: 'horizontal',
        loop: false,
        cssMode: true,
    
        navigation: {
        nextEl: '.post-slider__wrap__next',
        prevEl: '.post-slider__wrap__prev',
        },
        pagination:{
            el: '.post-slider__wrap__dots',
            clickable: true
        },
        breakpoints: {
            352: {
                slidesPerView: 1,
            },
            992: {
                slidesPerView: 2,
            },
            1140:{
                slidesPerView: 3
            }
        }
    });
    postSlider.on('progress', function () {
        postSliderCB(this);

    });
    function postSliderCB(data){
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
})