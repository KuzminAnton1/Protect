window.addEventListener("DOMContentLoaded", () => {

    const prev = document.querySelector(".post-slider__wrap__prev"),
    next = document.querySelector(".post-slider__wrap__next");

    prev.classList.add("arrow-disabled");

    const postSlider = new Swiper('.post-slider__wrap__slider', {
        // Optional parameters,
        slidesPerView: 3,
        direction: 'horizontal',
        loop: false,
        cssMode: true,
    
        // Navigation arrows
        navigation: {
        nextEl: '.post-slider__wrap__next',
        prevEl: '.post-slider__wrap__prev',
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
    // data.passedParams.slidesPerView - кол-во слайдов
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

    function dotsLength(dotsWrapSel, slidesSel, blockClass){
        const dotsWrap = document.querySelector(dotsWrapSel),
            slides = document.querySelectorAll(slidesSel);

        if (slides.length > dotsWrap.querySelectorAll("div").length){
            let length = dotsWrap.querySelectorAll("div").length;
            while(length < slides.length){
                const div = document.createElement("div");
                div.classList.add(blockClass);
                div.style.marginLeft = "8px";
                dotsWrap.appendChild(div);
                length++;
            }
        }
    }

    function sliderMobil(slidesSel, dotsSel, slideActiveClass, dotActivClass){
        const slides = document.querySelectorAll(slidesSel),
            dots = document.querySelectorAll(dotsSel);

            function showSlide(i = 0){
        
                slides.forEach(slide => {
                    slide.style.display = "none";
                    slide.classList.remove("swiper-slide")
                    slide.classList.remove(slideActiveClass);
                })
        
                dots.forEach(dot => {
                    dot.classList.remove(dotActivClass);
                })
        
                slides[i].style.display = "block";
                slides[i].classList.add(slideActiveClass);
                dots[i].classList.add(dotActivClass);
            }
        
            showSlide(0);
        
            dots.forEach((dot, i) => {
                dot.addEventListener("click", () => {
                    showSlide(i);
                })
            })
    }

    if (window.screen.width <= 576){
        dotsLength(".post-slider__wrap__dots",".post-slider__wrap__slider__item", "post-slider__wrap__dots__item");
        sliderMobil(".post-slider__wrap__slider__item", ".post-slider__wrap__dots__item", "show-anim", "dot-active");
    }
})