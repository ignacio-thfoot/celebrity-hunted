<template>
    <div id="home">
       <!-- HERO -->
       <section class="b--section-f v-scroll-reveal">
            <div class="f--container">
                <div class="f--row">
                    <div class="f--col-8 f--offset-2 f--col-tabletp-10 f--offset-tabletp-1 f--col-mobile-12 f--offset-mobile-0 text--center">
                        <h2 class="f--font-b b--bt-c f--color-b"></h2>
                    </div>
                </div>
            </div>
            <div class="f--container--fluid">
                <div class="f--row f--row--remove-gutter">
                    <div class="f--col-4 f--col-tabletl-6 f--col-mobile-12">
                    </div> 
                </div>
            </div> 
        </section>
    </div>
</template>
<script>
// Plugins
import axios from 'axios';

//import {GeneralMixin} from './mixin/mixin.js';
// import Observer from 'vue-intersection-observer'

export default {
    data:()=>{
        return{
            loaded : false,
            finish: false,
            posts:[],
            homepage : [],
            services : [],
            allservices : {},
            allParentservices : {},
            webgl : false,
            currentSlider : false,
            digitalStrategyInfo: false,
            brandStudioInfo: false,
            premiumContentInfo: false,
            experienceDesignInfo: false,
            homeWorks : [],
            timestamp: "",
        }
    },
    methods : {
        getPageInfo() {
            axios.get(base_wp_api.root_url + '/wp-json/wp/v2/pages/' + base_wp_api.current_page_ID )
            .then( ( response ) => {
                const Homepage = response.data;
                this.homepage = Homepage;
                console.log(response.data);
            })
            .catch( ( error ) => { console.error(error) })
        },
        getTimestamp: function () {
            return Date.now();
        },
    },
    mounted() {
        this.getPageInfo();
        this.timestamp = this.getTimestamp();

    }
}

</script>