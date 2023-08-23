window.addEventListener("DOMContentLoaded", () => {
    function modal(triggerSelector, modalSelector, closeSelector){
        const  trigger = document.querySelector(triggerSelector),
            modal = document.querySelector(modalSelector),
            close = document.querySelector(closeSelector),
            scroll = calcScroll();
    
        modal.style.display = 'none';
        
        function calcScroll(){
            let div = document.createElement('div');
    
            div.style.width = '50px';
            div.style.height = '50px';
            div.style.overflowY = 'scroll';
            div.style.visibility = 'hidden';
    
            document.body.appendChild(div);
            let scrollWidth = div.offsetWidth - div.clientWidth;
            div.remove();
    
            return scrollWidth;
        }
    
        trigger.addEventListener("click", (e) => {
            e.preventDefault();
            modal.style.display = 'block';
            modal.classList.add("modal__active");
            document.body.style.overflow = 'hidden';
            document.body.style.marginRight = `${scroll}px`;
        })
    
        close.addEventListener('click', () => {
            modal.style.display = 'none';
            modal.classList.remove("modal__active");
            document.body.style.overflow = '';
            document.body.style.marginRight = ``;
        });
    
        modal.addEventListener('click', (event) => {
            if (event.target === modal){
                modal.style.display = 'none';
                modal.classList.remove("modal__active");
                document.body.style.overflow = '';
                document.body.style.marginRight = ``;
            }
        });
    };

    function serviceMenu(triggerSel, menuSel, closeSel){
        const trigger = document.querySelector(triggerSel),
            menu = document.querySelector(menuSel),
            close = document.querySelector(closeSel);
    
        trigger.addEventListener("click", (e) => {
            if (e.target && (e.target == trigger || e.target.parentNode == trigger)){
                menu.classList.add("services-menu__show");
                menu.classList.remove("services-menu__hide");
            }
        })
    
        close.addEventListener("click", () => {
            menu.classList.add("services-menu__hide");
            menu.classList.add("services-menu__hide");
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

    function sliderProducts(slidesSel, prevSel, nextSel){
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
            slide.classList.remove("arrow-hide");
            slide.classList.remove("arrow-hide2");
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
        slides[slidesRange[0]].classList.add("arrow-hide");
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

    function slider(slidesSel, prevSel, nextSel){
        const slides = document.querySelectorAll(slidesSel),
            prev = document.querySelector(prevSel),
            next = document.querySelector(nextSel);
    
        let index = 0;
    
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

    function postScroll(postSel){
        const post = document.querySelector(postSel);
    
        window.addEventListener("scroll", () => {
            let st = window.scrollY;
            let pos = (window.scrollY / 100) /10;
            if(st > 1740 && st < 2280){
                post.classList.add("our-post__wrap__social__sticky")
                post.style.top = `${pos}px`;
            }else{
                post.classList.remove("our-post__wrap__social__sticky");
            }
         
        })
    }

    function postHeight(triggerSel, blockSel){
        const trigger = document.querySelector(triggerSel),
            block = document.querySelector(blockSel);
    
        trigger.addEventListener("click", () => {
            block.classList.toggle("text-hidden");
            if(block.classList.contains("text-hidden")){
                trigger.textContent = "Показать больше";
            }else{
                trigger.textContent = "Скрыть";
            }
        })
    }

    function questions(blocksSel, closeSel, activeCloseClass){
        const blocks = document.querySelectorAll(blocksSel),
            close = document.querySelectorAll(closeSel);
    
        blocks.forEach((block, i) => {
            block.addEventListener("click", () => {
                close[i].classList.toggle(activeCloseClass);
                let panel = block.nextElementSibling;
                if (panel.style.maxHeight){
                    panel.style.maxHeight = null;
                }else{
                    panel.style.maxHeight = panel.scrollHeight + "px";
                }
            })
        })
    }

    function tabs(headerSel, tabsSel, contentSel, aciveClass, display="block"){
        const header = document.querySelector(headerSel),
            tabs = document.querySelectorAll(tabsSel),
            content = document.querySelectorAll(contentSel);
        
        function hideTabs () {
            content.forEach(item => {
                item.style.display = 'none';
                item.classList.remove("anim-next_slide-show");
            });
            tabs.forEach(item => {
                item.classList.remove(aciveClass);
            });
        }
        function showTabs (index = 0) {
            tabs[index].classList.add(aciveClass);
            content[index].style.display = display;
            content[index].classList.add("anim-next_slide-show");
        }
        hideTabs();
        showTabs();
    
        header.addEventListener('click', (event) => {
            if (event.target.classList.contains(tabsSel.slice(1)) || event.target.parentNode.classList.contains(tabsSel.slice(1))){
                tabs.forEach((item, index) => {
                    if(event.target == item || event.target.parentNode == item){
                        hideTabs();
                        showTabs(index);
                    }
                });
            }
        });
    
    };
    
    modal(".phone__link", ".modal", ".modal__wrap__decor__close-btn");
    serviceMenu(".services__icon", ".services-menu", ".services-menu__close");

    dotsLength(".products__slider__dots", ".products__slider__wrap__item", "products__slider__dots__item");
    dotsLength(".personal__slider__dots", ".personal__slider__wrap__item", "personal__slider__dots__item");
    dotsLength(".comments__slider__dots", ".comments__slider__wrap__item", "comments__slider__dots__item");

    postHeight(".our-post__wrap__article-wrap__post__btn", ".our-post__wrap__article-wrap__post");
    postScroll(".our-post__wrap__social");

    questions(".questions__wrap__item-wrap__item__question__title", ".questions__wrap__item-wrap__item__question__title__plus", "questions__wrap__item-wrap__item__question__title__plus__plus-rotate");
    tabs(".questions__wrap__tabs", ".questions__wrap__tabs__item", ".questions__wrap__item-wrap__item", "questions__wrap__tabs__item__active");

    if (window.screen.width < 576){
        document.querySelector(".comments__slider__dots").classList.remove("comments__slider__dots__hide");
        sliderMobil(".comments__slider__wrap__item", ".comments__slider__dots__item", "anim-next_slide-show", "comments__slider__dots__item__active");
        document.querySelector(".products__slider__dots").classList.remove("products__slider__dots__hide");
        sliderMobil(".products__slider__wrap__item", ".products__slider__dots__item", "anim-next_slide-show", "products__slider__dots__item__active");
        document.querySelector(".personal__slider__dots").classList.remove("personal__slider__dots__hide");
        sliderMobil(".personal__slider__wrap__item", ".personal__slider__dots__item", "anim-next_slide-show", "personal__slider__dots__item__active");
        document.querySelector(".video-reports__slider__dots").classList.remove("video-reports__slider__dots__hide");
        sliderMobil(".video-reports__slider__item", ".video-reports__slider__dots__item", "anim-next_slide-show", "video-reports__slider__dots__item__active");
    }else{
        slider(".comments__slider__wrap__item", ".comments__slider__prev", ".comments__slider__next");
        sliderProducts(".products__slider__wrap__item", ".products__slider__prev", ".products__slider__next");
        sliderPersonal(".personal__slider__wrap__item", ".personal__slider__prev", ".personal__slider__next");
        sliderProducts(".video-reports__slider__item", ".video-reports__slider__prev", ".video-reports__slider__next");
        sliderProducts(".video-reports__foto-slider__item", ".video-reports__foto-slider__prev", ".video-reports__foto-slider__next");
    }

})