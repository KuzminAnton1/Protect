window.addEventListener("DOMContentLoaded", () => {

    $(document).ready(function(){
        let sliderSert = $(".sertificate-list__slider__wrap");
        sliderSert.on('changed.owl.carousel', function (e) {
            if(e.relatedTarget.current() > 0){
                $(".sertificate-list__slider__prev").removeClass('disabled-arrow'); 
                $(".sertificate-list__slider__prev").addClass('active-arrow');
            }
            if(e.relatedTarget.current() == 0){
                $(".sertificate-list__slider__prev").addClass('disabled-arrow'); 
            }
            if((e.relatedTarget.current() + e.page.size) - e.item.count == 0){
                $(".sertificate-list__slider__next").addClass('disabled-arrow');
                $(".sertificate-list__slider__prev").removeClass('disabled-arrow'); 
                $(".sertificate-list__slider__prev").addClass('active-arrow');
            }
            if((e.relatedTarget.current() + e.page.size) - e.item.count < 0){
                $(".sertificate-list__slider__next").addClass('active-arrow');
                $(".sertificate-list__slider__next").removeClass('disabled-arrow');
            }
        })

        sliderSert.owlCarousel({
            dotsContainer: ".sertificate-list__slider__dots",
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
                },
                1140:{
                    items: 3,
                    dots: false,
                    margin: 20
                }
            },
        });
        $('.sertificate-list__slider__next').click(function() {
            sliderSert.trigger('next.owl.carousel');
        })
        $('.sertificate-list__slider__prev').click(function() {
            sliderSert.trigger('prev.owl.carousel');
        })
      });

})