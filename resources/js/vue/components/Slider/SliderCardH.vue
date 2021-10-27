<template>
    <tiny-slider v-if="itemList" ref="tinySlider" v-bind="tinySliderOptions" class="my-slider b--slider-b">
        <div v-for="(item,i) in itemList" :key="i">
            <div class="b--card-h" v-lazy:background-image="item.image">
                <div class="b--card-h__item-left">
                    <h3 class="b--card-h__item-left__title">{{item.title}}</h3>
                    <p class="b--card-h__item-left__subtitle">{{item.subtitle}}</p>
                </div>
                <div class="b--card-h__item-right">
                    <a :href="item.cta_button.url" v-if="item.cta_button" class="b--card-h__item-right__btn">{{item.cta_button.title}}</a>
                </div>
            </div>
        </div>
    </tiny-slider>
</template>

<script>
import VueTinySlider from 'vue-tiny-slider';

export default {
    props : [
        'itemList'
    ],
    data() {
        return {  
            tinySliderOptions: {
                slideItems: true,
                container: true,
                items: 1,
                slideBy: 1,
                mouseDrag: false,
                swipeAngle: false,
                controls: false,
                nav: true,
                rewind : true,
                lazyload :true,
                navPosition: "bottom",
                autoplay: true,
                autoplayButtonOutput: false,
                speed: 800,
                autoplayTimeout : 2000,
                responsive: {
                    1200: {
                        speed: 3000,
                        autoplayTimeout : 5000,
                    }
                }
                // speed: 3000,
            }
        }
    },
    components: { 
        'tiny-slider': VueTinySlider
    }
}
</script>

