<template>
    <div class="f--row" v-if="members">
        <div class="b--slider-b b--slider-b--second">
            <tiny-slider ref="tinySlider" v-bind="tinySliderOptions" class="my-slider">
                <div class="b--card-c" v-for="(member,i) in members" :key="'image' + i">
                    <div class="b--card-c__img-wrapper">
                        <img class="b--card-c__img-wrapper__img tns-lazy-img" :data-src="member.image" alt="Image">
                    </div>
                    <h2 class="b--card-c__title">{{member.display_name}}</h2>
                    <h3 class="b--card-c__subtitle">{{member.job_position}}</h3>
                </div>
            </tiny-slider>
        </div>
    </div>
</template>

<script>
import VueTinySlider from 'vue-tiny-slider';

export default {
    data() {
        return {  
            tinySliderOptions: {
                container: true,
                items: 1,
                slideBy: "page",
                rewind : false,
                swipeAngle: false,
                rewind : false,
                lazyload :true,
                controls: false,
                nav: true,
                navPosition: "bottom",
                autoplay: true,
                mouseDrag : true,
                autoplayButtonOutput: false,                                                        
                speed: 1000,
                autoplayTimeout : 3000
            }
        }
    },
    props : [
        'members'
    ],
    components: { 
        'tiny-slider': VueTinySlider
    },
    created() {
        console.log(this.team_members);
    }
}
</script>

