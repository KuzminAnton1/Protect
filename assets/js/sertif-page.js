window.addEventListener("DOMContentLoaded", () => {
    function sliderPersonal(slidesSel, prevSel, nextSel){
        const slides = document.querySelectorAll(slidesSel),
            prev = document.querySelector(prevSel),
            next = document.querySelector(nextSel);
    
        let slidesRange = [0,1,2];
    
        function showSlides(arrSlides) {
            if(arrSlides[0] < 0){
                slidesRange = [0, 1, 2];
            }
            if(arrSlides[2] > slides.length - 1){
                slidesRange = [slides.length - 3, slides.length - 2, slides.length - 1];
            }
            if(slidesRange[0] > 0){
                prev.classList.add("arrow-next-active");
            }
            if(slidesRange[2] < slides.length - 1){
                next.classList.add("arrow-next-active");
            }
            if(slidesRange[0] <= 0){
                next.classList.add("arrow-next-end");
                prev.classList.remove("arrow-next-active");
            }
            if(slidesRange[2] >= slides.length - 1){
                next.classList.add("arrow-next-end");
                next.classList.remove("arrow-next-active");
            }
    
            slides.forEach(slide => {
                slide.style.display = "none";
                slide.classList.remove("anim-prev_slide-show");
                slide.classList.remove("anim-next_slide-show");
                slide.classList.remove("arrow-hide");
                slide.classList.remove("arrow-hide2");
            })
            arrSlides.forEach(item => {
                slides[item].style.display = 'block';
            })
        }
    
        showSlides(slidesRange);
    
        function nextSlide(index) {
            let arrEnd = [slidesRange[1], slidesRange[2]];
            let newArr = [...arrEnd, arrEnd[1] + index];
            if(newArr[2] > slides.length - 1){
                newArr = [slides.length - 3, slides.length - 2, slides.length - 1];
            }
            slidesRange = [...newArr];
            showSlides(slidesRange);
        }
        function prevSlide(index) {
            let arrEnd = [slidesRange[0], slidesRange[1]];
            let newArr = [arrEnd[0] + index, ...arrEnd];
            if(newArr[0] < 0){
                newArr = [0,1,2];
            }
            slidesRange = [...newArr];
            showSlides(slidesRange);
        }
    
        next.addEventListener('click', () => {
            if (next.classList.contains("arrow-next-active")){
                setTimeout(() => {
                    slides[slidesRange[2]].classList.add("anim-next_slide-show");
                }, 10)
            }
            nextSlide(1);
            slides[slidesRange[1]].classList.add("arrow-hide");
            });
        
        prev.addEventListener('click', () => {
            if (prev.classList.contains("arrow-next-active")){
                setTimeout(() => {
                    slides[slidesRange[0]].classList.add("anim-prev_slide-show");
                }, 10)
            }
            prevSlide(-1);
            slides[slidesRange[1]].classList.add("arrow-hide2");
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

    dotsLength(".sertificate-list__slider__dots", ".sertificate-list__slider__wrap__item", "sertificate-list__slider__dots__item");

    if (window.screen.width < 576){
        document.querySelector(".sertificate-list__slider__dots").classList.remove("sertificate-list__slider__dots__hide");
        sliderMobil(".sertificate-list__slider__wrap__item", ".sertificate-list__slider__dots__item", "anim-next_slide-show", "sertificate-list__slider__dots__item__active");
    }else{
        sliderPersonal(".sertificate-list__slider__wrap__item", ".sertificate-list__slider__prev", ".sertificate-list__slider__next");
    }    
})