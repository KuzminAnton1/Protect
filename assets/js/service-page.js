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
    serviceMenu(".services", ".services-menu", ".services-menu__close");

    postHeight(".our-post__wrap__article-wrap__post__btn", ".our-post__wrap__article-wrap__post");
    postScroll(".our-post__wrap__social");

    questions(".questions__wrap__item-wrap__item__question__title", ".questions__wrap__item-wrap__item__question__title__plus", "questions__wrap__item-wrap__item__question__title__plus__plus-rotate");
    tabs(".questions__wrap__tabs", ".questions__wrap__tabs__item", ".questions__wrap__item-wrap__item", "questions__wrap__tabs__item__active");

    $(document).ready(function(){
        let sliderProducts = $(".products__slider__wrap");
        sliderProducts.on('changed.owl.carousel', function (e) {
            if(e.relatedTarget.current() > 0){
                $(".products__slider__prev").removeClass('disabled-arrow'); 
                $(".products__slider__prev").addClass('active-arrow');
            }
            if(e.relatedTarget.current() == 0){
                $(".products__slider__prev").addClass('disabled-arrow'); 
            }
            if((e.item.count - (e.relatedTarget.current() + e.page.size) >= 0)){
                $(".products__slider__next").removeClass('disabled-arrow');
                $(".products__slider__next").addClass('active-arrow');
            }
            if((e.relatedTarget.current() + e.page.size) == e.item.count){
                $(".products__slider__next").removeClass('active-arrow');
                $(".products__slider__next").addClass('disabled-arrow');
            }
        })

        sliderProducts.owlCarousel({
            dotsContainer: ".products__slider__dots",
            responsive: {
                0:{
                    items: 1,
                    dots: true,
                },
                567:{
                    items: 1,
                    dots: false
                },
                992:{
                    items: 2,
                    dots: false
                }
            },
        });
        $('.products__slider__next').click(function() {
            sliderProducts.trigger('next.owl.carousel');
        })
        $('.products__slider__prev').click(function() {
            sliderProducts.trigger('prev.owl.carousel');
        })
      });

      // personal

      $(document).ready(function(){
        let sliderPersonal = $(".personal__slider__wrap");
        sliderPersonal.on('changed.owl.carousel', function (e) {
            if(e.relatedTarget.current() > 0){
                $(".personal__slider__prev").removeClass('disabled-arrow'); 
                $(".personal__slider__prev").addClass('active-arrow');
            }
            if(e.relatedTarget.current() == 0){
                $(".personal__slider__prev").addClass('disabled-arrow'); 
            }
            if((e.item.count - (e.relatedTarget.current() + e.page.size) >= 0)){
                $(".personal__slider__next").removeClass('disabled-arrow');
                $(".personal__slider__next").addClass('active-arrow');
            }
            if((e.relatedTarget.current() + e.page.size) == e.item.count){
                $(".personal__slider__next").removeClass('active-arrow');
                $(".personal__slider__next").addClass('disabled-arrow');
            }
        })

        sliderPersonal.owlCarousel({
            responsive: {
                0:{
                    items: 1,
                    dots: false,
                },
                567:{
                    items: 1,
                    dots: false
                },
                768:{
                    items: 2,
                    dots: false
                },
                1140:{
                    items: 3,
                    dots: false
                }
            },
        });
        $('.personal__slider__next').click(function() {
            sliderPersonal.trigger('next.owl.carousel');
        })
        $('.personal__slider__prev').click(function() {
            sliderPersonal.trigger('prev.owl.carousel');
        })
      });

        // video slider

        $(document).ready(function(){
            let sliderVideo = $(".video-reports__slider__wrap");
            sliderVideo.on('changed.owl.carousel', function (e) {
                console.log(e.relatedTarget.current())
                console.log(e.page.size) 
                console.log(e.item.count)
                if(e.relatedTarget.current() > 0){
                    $(".video-reports__slider__prev").removeClass('disabled-arrow'); 
                    $(".video-reports__slider__prev").addClass('active-arrow');
                }
                if(e.relatedTarget.current() == 0){
                    $(".video-reports__slider__prev").addClass('disabled-arrow'); 
                }
                if(e.item.count - (e.relatedTarget.current() + e.page.size) >= 0){
                    $(".video-reports__slider__next").addClass('active-arrow');
                    $(".video-reports__slider__next").removeClass('disabled-arrow');
                }
                if((e.relatedTarget.current() + e.page.size) == (e.item.count - e.page.size)){
                    $(".video-reports__slider__next").removeClass('active-arrow');
                    $(".video-reports__slider__next").addClass('disabled-arrow');
                }
            })
        
            sliderVideo.owlCarousel({
                dotsContainer: ".video-reports__slider__dots",
                responsive: {
                    0:{
                        items: 1,
                        dots: true,
                    },
                    567:{
                        items: 1,
                        dots: false
                    },
                    992:{
                        margin: 40,
                        dots: false,
                        autoWidth: true
                    }
                },
            });
            $('.video-reports__slider__next').click(function() {
                sliderVideo.trigger('next.owl.carousel');
            })
            $('.video-reports__slider__prev').click(function() {
                sliderVideo.trigger('prev.owl.carousel');
            })
        });

        // foto slider

        $(document).ready(function(){
            let sliderVideo = $(".video-reports__foto-slider__wrap");
            sliderVideo.on('changed.owl.carousel', function (e) {
                if(e.relatedTarget.current() > 0){
                    $(".video-reports__foto-slider__prev").removeClass('disabled-arrow'); 
                    $(".video-reports__foto-slider__prev").addClass('active-arrow');
                }
                if(e.relatedTarget.current() == 0){
                    $(".video-reports__foto-slider__prev").addClass('disabled-arrow'); 
                }
                if((e.relatedTarget.current() + e.page.size) - e.item.count == 0){
                    $(".video-reports__foto-slider__next").addClass('disabled-arrow');
                    $(".video-reports__foto-slider__prev").removeClass('disabled-arrow'); 
                    $(".video-reports__foto-slider__prev").addClass('active-arrow');
                }
                if((e.relatedTarget.current() + e.page.size) - e.item.count != 0){
                    $(".video-reports__foto-slider__next").addClass('active-arrow');
                    $(".video-reports__foto-slider__next").removeClass('disabled-arrow');
                }
            })
                
            sliderVideo.owlCarousel({
                responsive: {
                    0:{
                        items: 1,
                        dots: false,
                    },
                    567:{
                        items: 1,
                        dots: false
                    },
                    992:{
                        margin: 40,
                        dots: false,
                        autoWidth: true
                    }
                },
            });
            $('.video-reports__foto-slider__next').click(function() {
                sliderVideo.trigger('next.owl.carousel');
            })
            $('.video-reports__foto-slider__prev').click(function() {
                sliderVideo.trigger('prev.owl.carousel');
            })
        });

        // comments slider

        $(document).ready(function(){
            let sliderComments = $(".comments__slider__wrap");
                        
        sliderComments.owlCarousel({
            dotsContainer: ".comments__slider__dots",
            loop: true,
            responsive: {
                0:{
                    items: 1,
                    dots: true,
                },
                567:{
                    items: 1.2,
                    dots: false
                },
                768:{
                    items: 1.4,
                    dots: false,
                },
                1140:{
                    items: 2.1,
                    dots: false,
                },
                1360:{
                    items: 2.5,
                    dots: false,
                    autoWidth: true,
                    margin: 20
                }
            },
        });
        $('.comments__slider__next').click(function() {
            sliderComments.trigger('next.owl.carousel');
        })
        $('.comments__slider__prev').click(function() {
            sliderComments.trigger('prev.owl.carousel');
        })
    });
})