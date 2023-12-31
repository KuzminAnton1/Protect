window.addEventListener("DOMContentLoaded", () => {
    function modal(triggerSelector, modalSelector, closeSelector){
        const  trigger = document.querySelector(triggerSelector),
            modal = document.querySelector(modalSelector),
            close = document.querySelector(closeSelector),
            scroll = calcScroll();
            
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
            modal.classList.remove("visible-hide");
            modal.classList.add("modal__active");
            document.body.style.overflow = 'hidden';
            document.body.style.marginRight = `${scroll}px`;
        })
    
        close.addEventListener('click', () => {
            modal.classList.add("visible-hide");
            modal.classList.remove("modal__active");
            document.body.style.overflow = '';
            document.body.style.marginRight = ``;
        });
    
        modal.addEventListener('click', (event) => {
            if (event.target === modal){
                modal.classList.add("visible-hide");
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
    
            function hideBlock(index){
                blocks.forEach((block, i) => {
                    if (i != index){
                        let panel = block.nextElementSibling;
                        panel.style.maxHeight = null;
                    }
                })
                close.forEach((item,i) => {
                    if (i != index){
                        item.classList.remove(activeCloseClass);
                    }
                })
            }
        
            function showBlock(block, i){
                close[i].classList.toggle(activeCloseClass);
                let panelActive = block.nextElementSibling;
                if (panelActive.style.maxHeight){
                    panelActive.style.maxHeight = null;
                }else{
                    panelActive.style.maxHeight = panelActive.scrollHeight + "px";
                }
            }
        
            blocks.forEach((block, i) => {
                block.addEventListener("click", () => {
                    hideBlock(i)
                    showBlock(block, i);
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

    function telMask(){
        const telInputs = document.querySelectorAll('[type="tel"]')
    
        var maskOptions = {
          mask: '+{7} 000 000-00-00',
        }
      
        telInputs.forEach((input) => {
          const imask = IMask(input, maskOptions)
      
          // https://github.com/uNmAnNeR/imaskjs/issues/152#issuecomment-462054778
          input.addEventListener(
            'focus',
            function () {
              imask.updateOptions({ lazy: false })
            },
            true
          )
          input.addEventListener(
            'blur',
            function () {
              imask.updateOptions({ lazy: true })
            },
            true
          )
        })
    };
    
    
    modal(".phone__link", ".modal", ".modal__wrap__decor__close-btn");
    modal(".main__btn", ".modal", ".modal__wrap__decor__close-btn");

    telMask();
    
    serviceMenu(".services", ".services-menu", ".services-menu__close");

    postHeight(".our-post__wrap__article-wrap__post__btn", ".our-post__wrap__article-wrap__post");
    postScroll(".our-post__wrap__social");

    questions(".questions__wrap__item-wrap__item__question__title", ".questions__wrap__item-wrap__item__question__title__plus", "questions__wrap__item-wrap__item__question__title__plus__plus-rotate");
    tabs(".questions__wrap__tabs", ".questions__wrap__tabs__item", ".questions__wrap__item-wrap__item", "questions__wrap__tabs__item__active");

    const prevProductSl = document.querySelector(".products-service__slider__prev"),
        nextproductSl = document.querySelector(".products-service__slider__next");

    prevProductSl.classList.add("arrow-disabled");

    const servicePageProducts = new Swiper('.products-service__slider__wrap', {
        slidesPerView: 2,
        direction: 'horizontal',
        loop: false,
        simulateTouch: true,
        touchRatio: 1,
        touchAngle: 45,
        grabCursor: true,
        speed: 1200,
    
        navigation: {
        nextEl: '.products-service__slider__next',
        prevEl: '.products-service__slider__prev',
        },
        pagination:{
            el: '.products-service__slider__dots',
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
                slidesPerView: 2,
                spaceBetween: 20
            }
        }
    });
    servicePageProducts.on('progress', function () {
        servicePageProductsCB(this);

    });
    function servicePageProductsCB(data){
        console.log(data.progress)
        if(data.progress > 0){
            prevProductSl.classList.add("arrow-active");
            prevProductSl.classList.remove("arrow-disabled");
            nextproductSl.classList.remove("arrow-disabled");
            nextproductSl.classList.add("arrow-active");
        }
        if(data.progress == 0){
            prevProductSl.classList.add("arrow-disabled");
            prevProductSl.classList.remove("arrow-active");
        }
        if(data.progress == 1){
            nextproductSl.classList.add("arrow-disabled");
            nextproductSl.classList.remove("arrow-active");
        }
    }

    const prevVideoSl = document.querySelector(".video-reports-service__slider__prev"),
        nextVideoSl = document.querySelector(".video-reports-service__slider__next");

    prevVideoSl.classList.add("arrow-disabled");

    const servicePageVideo = new Swiper('.video-reports-service__slider__wrap', {
        slidesPerView: 2,
        direction: 'horizontal',
        loop: false,
        simulateTouch: true,
        touchRatio: 1,
        touchAngle: 45,
        grabCursor: true,
        speed: 1200,

        navigation: {
        nextEl: '.video-reports-service__slider__next',
        prevEl: '.video-reports-service__slider__prev',
        },
        pagination:{
            el: '.video-reports-service__slider__dots',
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
                slidesPerView: 2,
                spaceBetween: 20
            }
        }
    });
    servicePageVideo.on('progress', function () {
        servicePageVideoCB(this);

    });
    function servicePageVideoCB(data){
        if(data.progress > 0){
            prevVideoSl.classList.add("arrow-active");
            nextVideoSl.classList.remove("arrow-disabled");
            nextVideoSl.classList.add("arrow-active");
        }
        if(data.progress == 0){
            prevVideoSl.classList.add("arrow-disabled");
            prevVideoSl.classList.remove("arrow-active");
        }
        if(data.progress == 1){
            nextVideoSl.classList.add("arrow-disabled");
            nextVideoSl.classList.remove("arrow-active");
        }
    }


    const prevFotoSl = document.querySelector(".video-reports__foto-slider__prev"),
        nextFotoSl = document.querySelector(".video-reports__foto-slider__next");

    prevFotoSl.classList.add("arrow-disabled");

    const servicePageFoto = new Swiper('.video-reports__foto-slider__wrap', {
        slidesPerView: 2,
        direction: 'horizontal',
        loop: false,
        simulateTouch: true,
        touchRatio: 1,
        touchAngle: 45,
        grabCursor: true,
        speed: 1200,

        navigation: {
        nextEl: '.video-reports__foto-slider__next',
        prevEl: '.video-reports__foto-slider__prev',
        },
        breakpoints: {
            567: {
                slidesPerView: 1,
            },
            992: {
                slidesPerView: 2,
            },
            1140:{
                slidesPerView: 2,
                spaceBetween: 20
            }
        }
    });
    servicePageFoto.on('progress', function () {
        servicePageFotoCB(this);

    });
    function servicePageFotoCB(data){
        if(data.progress > 0){
            prevFotoSl.classList.add("arrow-active");
            nextFotoSl.classList.remove("arrow-disabled");
            nextFotoSl.classList.add("arrow-active");
        }
        if(data.progress == 0){
            prevFotoSl.classList.add("arrow-disabled");
            prevFotoSl.classList.remove("arrow-active");
        }
        if(data.progress == 1){
            nextFotoSl.classList.add("arrow-disabled");
            nextFotoSl.classList.remove("arrow-active");
        }
    }

    const prevCommentServiceSl = document.querySelector(".comments__content__slider__prev"),
        nextCommentServiceSl = document.querySelector(".comments__content__slider__next");

    prevCommentServiceSl.classList.add("arrow-disabled");

    const serviceCommentSl = new Swiper('.comments__content__slider__wrap', {
        direction: 'horizontal',
        loop: false,
        simulateTouch: true,
        touchRatio: 1,
        touchAngle: 45,
        grabCursor: true,
        speed: 1200,

        navigation: {
        nextEl: '.comments__content__slider__next',
        prevEl: '.comments__content__slider__prev',
        },
        pagination:{
            el: '.comments__content__slider__dots',
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
                slidesPerView: 3,
                spaceBetween: 20
            }
        },
    });
    serviceCommentSl.on('isEnd', function () {
        serviceCommentSlCB(this);
    });
    function serviceCommentSlCB(data){
        if(data.progress > 0){
            prevCommentServiceSl.classList.add("arrow-active");
            nextCommentServiceSl.classList.remove("arrow-disabled");
            nextCommentServiceSl.classList.add("arrow-active");
        }
        if(data.progress == 0){
            prevCommentServiceSl.classList.add("arrow-disabled");
            prevCommentServiceSl.classList.remove("arrow-active");
        }
        if(data.progress == 1){
            nextCommentServiceSl.classList.add("arrow-disabled");
            nextCommentServiceSl.classList.remove("arrow-active");
        }
    }


    const prevPersonalSl = document.querySelector(".personal__slider__prev"),
        nextPersonalSl = document.querySelector(".personal__slider__next");

    prevPersonalSl.classList.add("arrow-disabled");

    const servicePersonal = new Swiper('.personal__slider__wrap', {
        slidesPerView: 2,
        direction: 'horizontal',
        loop: false,
        simulateTouch: true,
        touchRatio: 1,
        touchAngle: 45,
        grabCursor: true,
        speed: 1200,

        navigation: {
        nextEl: '.personal__slider__next',
        prevEl: '.personal__slider__prev',
        },
        breakpoints: {
            567: {
                slidesPerView: 1,
            },
            992: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            1140:{
                slidesPerView: 3,
                spaceBetween: 20
            }
        }
    });
    servicePersonal.on('progress', function () {
        servicePersonalCB(this);

    });
    function servicePersonalCB(data){
        if(data.progress > 0){
            prevPersonalSl.classList.add("arrow-active");
            nextPersonalSl.classList.remove("arrow-disabled");
            nextPersonalSl.classList.add("arrow-active");
        }
        if(data.progress == 0){
            prevPersonalSl.classList.add("arrow-disabled");
            prevPersonalSl.classList.remove("arrow-active");
        }
        if(data.progress == 1){
            nextPersonalSl.classList.add("arrow-disabled");
            nextPersonalSl.classList.remove("arrow-active");
        }
    }

    Fancybox.bind("[data-fancybox]", {
        fullscreen: true
    });
})