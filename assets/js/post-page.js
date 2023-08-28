window.addEventListener("DOMContentLoaded", () => {

    $(document).ready(function(){
        let sliderPosts = $(".post-slider__wrap__slider");
        sliderPosts.on('changed.owl.carousel', function (e) {
            if(e.relatedTarget.current() > 0){
                $(".post-slider__wrap__prev").removeClass('disabled-arrow'); 
                $(".post-slider__wrap__prev").addClass('active-arrow');
            }
            if(e.relatedTarget.current() == 0){
                $(".post-slider__wrap__prev").addClass('disabled-arrow'); 
            }
            if((e.relatedTarget.current() + e.page.size) - e.item.count == 0){
                $(".post-slider__wrap__next").addClass('disabled-arrow');
                $(".post-slider__wrap__prev").removeClass('disabled-arrow'); 
                $(".post-slider__wrap__prev").addClass('active-arrow');
            }
            if((e.relatedTarget.current() + e.page.size) - e.item.count < 0){
                $(".post-slider__wrap__next").addClass('active-arrow');
                $(".post-slider__wrap__next").removeClass('disabled-arrow');
            }
        })

        sliderPosts.owlCarousel({
            
            dotsContainer: ".post-slider__wrap__dots",
            responsive: {
                dots: false,
                0:{
                    items: 1,
                    dots: true
                },
                567:{
                    items: 1,
                    dots: false
                },
                992:{
                    items: 2,
                    margin: 0,
                    dots: false
                },
                1140:{
                    items: 3,
                    margin: 20,
                    dots: false
                }
            },
        });
        $('.post-slider__wrap__next').click(function() {
            sliderPosts.trigger('next.owl.carousel');
        })
        $('.post-slider__wrap__prev').click(function() {
            sliderPosts.trigger('prev.owl.carousel');
        })
      });
})