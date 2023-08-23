window.addEventListener("DOMContentLoaded", () => {
    function slider(slidesSel, prevSel, nextSel){
        const slides = document.querySelectorAll(slidesSel),
            prev = document.querySelector(prevSel),
            next = document.querySelector(nextSel);

        let slidesRange = [0,1];

    function showSlides(arrSlides) {

        if(arrSlides[0] < 0){
            slidesRange = [0, 1];
        }
        if(arrSlides[1] > slides.length - 1){
            slidesRange = [slides.length - 2, slides.length - 1];
        }
        if(slidesRange[0] > 0){
            prev.classList.add("arrow-next-active");
        }
        if(slidesRange[1] < slides.length - 1){
            next.classList.add("arrow-next-active");
        }
        if(slidesRange[0] <= 0){
            next.classList.add("arrow-next-end");
            prev.classList.remove("arrow-next-active");
        }
        if(slidesRange[1] >= slides.length - 1){
            next.classList.add("arrow-next-end");
            next.classList.remove("arrow-next-active");
        }

        slides.forEach(slide => {
            slide.style.display = "none";
            slide.classList.remove("anim-prev_slide-show");
            slide.classList.remove("anim-next_slide-show");
        })
        slidesRange.forEach(item => {
            slides[item].style.display = 'block';
        })
    }

    showSlides(slidesRange);

    function nextSlide(index) {
        let newArr = [slidesRange[1], slidesRange[1] + index];
        slidesRange = [...newArr];
        showSlides(slidesRange);
    }
    function prevSlide(index) {
        let newArr = [slidesRange[0] + index, slidesRange[0]];
        slidesRange = [...newArr];
        showSlides(newArr);
    }

    next.addEventListener('click', () => {
        if (next.classList.contains("arrow-next-active")){
            setTimeout(() => {
                slides[slidesRange[1]].classList.add("anim-next_slide-show");
            }, 10)
        }
        nextSlide(1);
    });

    prev.addEventListener('click', () => {
        if (prev.classList.contains("arrow-next-active")){
            setTimeout(() => {
                slides[slidesRange[0]].classList.add("anim-prev_slide-show");
            }, 10)
        }
        prevSlide(-1);
    });
    
    }

    function sliderMobil(slidesSel, dotsSel,slideActiveClass, dotActivClass){
        const slides = document.querySelectorAll(slidesSel),
            dots = document.querySelectorAll(dotsSel);
    
            function showSlide(i = 0){
        
                slides.forEach(slide => {
                    slide.style.display = "none";
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

    dotsLength(".portfolio-works__slider__dots", ".portfolio-works__slider__item", "portfolio-works__slider__dots__item");

    if (window.screen.width < 576){
        document.querySelector(".portfolio-works__slider__dots").classList.remove("portfolio-works__slider__dots__hide");
        sliderMobil(".portfolio-works__slider__item", ".portfolio-works__slider__dots__item", "anim-next_slide-show", "portfolio-works__slider__dots__item__active");
    }else{
        slider(".portfolio-works__slider__item", ".portfolio-works__slider__prev", ".portfolio-works__slider__next");
    }  
})