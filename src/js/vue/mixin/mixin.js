import { gsap,TimelineMax } from 'gsap';
import { CSSRulePlugin } from "gsap/CSSRulePlugin";
gsap.registerPlugin(CSSRulePlugin);

import axios from 'axios';
import postscribe from 'postscribe';

export const GeneralMixin = {
    data() {
        return {
            careers_url : base_wp_api.root_url + '/careers/',
        }

    },
    methods:{
        TweenPreloaderOut(){
            var tlOut = new TimelineMax({delay:1})
            tlOut.to( 
                document.getElementById('b--preloader-a__artwork'), 
                1, 
                {autoAlpha: 0, ease: 'power3.in'})
            tlOut.to( 
                document.getElementById('b--preloader-a'), 
                .6, 
                {x:'100%'},"-=.1")    
        },
    }
}