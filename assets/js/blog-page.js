window.addEventListener("DOMContentLoaded", () => {
    function tabs(headerSel, tabsSel, contentSel, aciveClass, display="grid"){
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

    function pageList(postsSel, blockNumSel){
        const posts = document.querySelectorAll(postsSel),
            blockNum = document.querySelector(blockNumSel);

        let num = [1];
        let quantity = 9;
        let cnt = 1;

        while (quantity < posts.length){
            if (posts.length >= quantity){
                cnt += 1;
                num.push(cnt);
            }
            quantity += 9;
        }

        num.forEach(item => {
            const link = document.createElement("a");
            link.textContent = `${item}`;
            link.classList.add("posts-list__quant__item");
            blockNum.appendChild(link);
        })

    };

    function numAddActive(blocksSel, numsSel){
        const blocks = document.querySelectorAll(blocksSel),
            nums = document.querySelectorAll(numsSel);

        function addClass(i = 0){
            nums.forEach(num => {
                num.classList.remove("active-num");
            })

            nums[i].classList.add("active-num");
        }

        addClass();
    }


    tabs(".posts-list__tabs", ".posts-list__tabs__item", ".posts-list__post-wrap__posts-page", "posts-list__tabs__item__active");

    pageList(".posts-list__post-wrap__posts-page__item", ".posts-list__quant");

    numAddActive(".posts-list__post-wrap__posts-page", ".posts-list__quant__item");

})