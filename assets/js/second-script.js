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
            document.body.style.overflowY = "hidden";
            if (e.target && (e.target == trigger || e.target.parentNode == trigger)){
                menu.classList.add("services-menu__show");
                menu.classList.remove("services-menu__hide");
            }
        })
    
        close.addEventListener("click", () => {
            menu.classList.add("services-menu__hide");
            document.body.style.overflowY = "";
        })
    }
    modal(".phone__link", ".modal", ".modal__wrap__decor__close-btn");
    serviceMenu(".services__icon", ".services-menu", ".services-menu__close");
})