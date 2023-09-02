window.addEventListener("DOMContentLoaded", () => {

    const prev = document.querySelector(".sertificate-list__slider__prev"),
        next = document.querySelector(".sertificate-list__slider__next");

    prev.classList.add("arrow-disabled");

    const sertificateSl = new Swiper('.sertificate-list__slider__wrap', {
        slidesPerView: 3,
        direction: 'horizontal',
        loop: false,
        simulateTouch: true,
        touchRatio: 1,
        touchAngle: 45,
        grabCursor: true,
      
        navigation: {
          nextEl: '.sertificate-list__slider__next',
          prevEl: '.sertificate-list__slider__prev',
        },
        pagination:{
            el: '.sertificate-list__slider__dots',
            clickable: true
        },
        breakpoints: {
            352: {
                slidesPerView: 1,
            },
            992: {
                slidesPerView: 2,
            },
            1140: {
                slidesPerView: 3
            }
        }
    });
    sertificateSl.on('progress', function () {
        sertificateSlCB(this);
    
      });
    function sertificateSlCB(data){
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