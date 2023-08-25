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
                    slides[slidesRange[1]].classList.add("arrow-hide");
                }, 10)
            }
            nextSlide(1);
            });
        
        prev.addEventListener('click', () => {
            if (prev.classList.contains("arrow-next-active")){
                setTimeout(() => {
                    slides[slidesRange[0]].classList.add("anim-prev_slide-show");
                    slides[slidesRange[1]].classList.add("arrow-hide2");
                }, 10)
            }
            prevSlide(-1);
        });
    }

    function slider(slidesSel, prevSel, nextSel){
        const slides = document.querySelectorAll(slidesSel),
            prev = document.querySelector(prevSel),
            next = document.querySelector(nextSel);
    
        let index = 0;
    
        prev.style.filter = "opacity(0.5)";
        if(slides.length <= 1){
            next.style.filter = "opacity(0.5)";
        }
    
        function showSlide(i = 0){
            if (i < 0){
                index = 0;
            }
            if (i > slides.length - 1){
                index = slides.length - 1;
            }
    
            slides.forEach(slide => {
                slide.style.display = "none";
                slide.classList.remove("anim-prev_slide-show");
                slide.classList.remove("anim-next_slide-show");
                slide.classList.remove("anim-prev_slide-hide");
                slide.classList.remove("anim-next_slide-hide");
            })
    
            slides[index].style.display = "block";
        }
    
        showSlide();
    
        function nextSlide(i){
            index += i;
            if (index > 0){
                prev.style.filter = "opacity(1)";
            }
            if (index < slides.length - 1){
                next.style.filter = "opacity(1)";
            }
            if (index == slides.length - 1){
                next.style.filter = "opacity(0.5)";
            }
            if (index == 0){
                prev.style.filter = "opacity(0.5)";
            }
            if (index > 0 && index < slides.length - 1){
                prev.style.filter = "opacity(1)";
                next.style.filter = "opacity(1)";
            }
            showSlide(index);
        }
        next.addEventListener("click", () => {
            slides[index].classList.add("anim-prev_slide-hide");
            const timerNext = setTimeout(() => {
                nextSlide(1);
                slides[index].classList.add("anim-next_slide-show");
            },500)
            if(index == slides.length - 1){
                slides[index].classList.remove("anim-prev_slide-hide");
                clearTimeout(timerNext)
            }
        })
        prev.addEventListener("click", () => {
            slides[index].classList.add("anim-next_slide-hide");
            const timerPrev = setTimeout(() => {
                nextSlide(-1);
                slides[index].classList.add("anim-prev_slide-show");
            },500)
            if(index == 0){
                slides[index].classList.remove("anim-next_slide-hide");
                clearTimeout(timerPrev)
            }
        })
    }

    if(window.screen.width > 992){
        sliderPersonal(".post-slider__wrap__slider__item", ".post-slider__wrap__prev", ".post-slider__wrap__next");
    } 

    if(window.screen.width < 992 && window.screen.width > 567){
        slider(".post-slider__wrap__slider__item", ".post-slider__wrap__prev", ".post-slider__wrap__next");
    }
})