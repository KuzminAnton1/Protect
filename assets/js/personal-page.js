window.addEventListener("DOMContentLoaded", () => {
    function modal(triggersSelector, modalSelector, closeSelector){
        const  triggers = document.querySelectorAll(triggersSelector),
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
    
        triggers.forEach(trigger => {
            trigger.addEventListener("click", (e) => {
                e.preventDefault();
                modal.classList.remove("visible-hide");
                modal.classList.add("modal__active");
                document.body.style.overflow = 'hidden';
                document.body.style.marginRight = `${scroll}px`;
            })
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

    modal(".personal-list__wrap__item__btn", ".modal", ".modal__wrap__decor__close-btn");
})