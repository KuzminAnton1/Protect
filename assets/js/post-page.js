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
                slide.classList.remove("anim-prev_slide-hide");
                slide.classList.remove("anim-next_slide-hide");
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

    sliderPersonal(".post-slider__wrap__slider__item", ".post-slider__wrap__prev", ".post-slider__wrap__next");

})