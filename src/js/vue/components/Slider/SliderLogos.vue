<template>
    <div class="b--slider-a" v-if="images">
        <tiny-slider ref="tinySlider" v-bind="tinySliderOptions" class="my-slider">
            <div v-for="(image,i) in images" :key="'image' + i">
                <div class="b--slider-a__item">
                    <img class="b--media-b tns-lazy-img" :data-src="image.image" alt="">
                </div>
            </div>
        </tiny-slider>
    </div>
</template>

<script>
import VueTinySlider from 'vue-tiny-slider';

export default {
    data() {
        return {  
            tinySliderOptions: {
                container: true,
                items: 2,
                slideBy: "page",
                rewind : false,
                swipeAngle: false,
                rewind : false,
                lazyload :true,
                controls: false,
                nav: false,
                autoplay: true,
                mouseDrag : true,
                autoplayButtonOutput: false,
                speed: 1000,
                autoplayTimeout : 3000,
                responsive: {
                    600: {
                        items: 3,
                        speed: 1000,
                        autoplayTimeout : 3000,
                    },
                    992: {
                        items: 4,
                    },
                    1024: {
                        items: 5,
                    },
                    1200: {
                        items: 6,
                        speed: 3000,
                        autoplayTimeout : 5000,
                    }
                }
            }
        }
    },
    props : [
        'images'
    ],
    components: { 
        'tiny-slider': VueTinySlider
    }
}
</script>

