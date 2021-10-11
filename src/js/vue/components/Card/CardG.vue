<template>
    <div class="b--card-g" v-scroll-reveal.reset="{ delay: 200 }">
        <div class="f--row">
            <div class="f--col-5 f--col-tabletl-6 f--col-tabletp-10 f--col-mobile-12">
                <h2 class="b--card-g__title">{{title}}</h2>
            </div>
            <div class="f--col-7 f--col-tabletl-6 f--col-tabletp-10 f--col-mobile-12">
                <p class="b--card-g__subtitle">{{content}}</p>
                <div class="b--card-g__content">
                    <app-pill v-for="(pill, p) in [city]" :key="p" :text="pill" card="g"/>
                </div>
                <a :href="link" class="b--card-g__link">{{job_position}}</a>
            </div>
        </div>
    </div>
</template>
<script>
import Pill from './../Pill/Pill.vue';
export default {
    props : [
        'title',
        'content',
        'job_position',
        'link',
        'city'
    ],
    components:{
        'app-pill': Pill
    },
}
</script>