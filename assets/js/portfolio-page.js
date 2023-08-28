window.addEventListener("DOMContentLoaded", () => {

    $(document).ready(function(){
        let sliderWorks = $(".portfolio-works__slider__wrap");
        sliderWorks.on('changed.owl.carousel', function (e) {
            console.log(e.relatedTarget.current())
            console.log(e.item.count)
            console.log(e.page.size)

            if(e.relatedTarget.current() > 0){
                $(".portfolio-works__slider__prev").removeClass('disabled-arrow'); 
                $(".portfolio-works__slider__prev").addClass('active-arrow');
            }
            if(e.relatedTarget.current() == 0){
                $(".portfolio-works__slider__prev").addClass('disabled-arrow'); 
            }
            if((e.relatedTarget.current() + e.page.size) - e.item.count == 0){
                $(".portfolio-works__slider__next").removeClass('active-arrow');
                $(".portfolio-works__slider__next").addClass('disabled-arrow');
                $(".portfolio-works__slider__prev").removeClass('disabled-arrow'); 
                $(".portfolio-works__slider__prev").addClass('active-arrow');
            }
            if((e.relatedTarget.current() + e.page.size) - e.item.count < 0){
                $(".portfolio-works__slider__next").addClass('active-arrow');
                $(".portfolio-works__slider__next").removeClass('disabled-arrow');
            }
        })

        sliderWorks.owlCarousel({
            
            dotsContainer: ".portfolio-works__slider__dots",
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
                    items: 2,
                    margin: 20,
                    dots: false
                }
            },
        });
        $('.portfolio-works__slider__next').click(function() {
            sliderWorks.trigger('next.owl.carousel');
        })
        $('.portfolio-works__slider__prev').click(function() {
            sliderWorks.trigger('prev.owl.carousel');
        })
      });
})