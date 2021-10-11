//CSS
import './../scss/entries/home.scss';

// polifill
import './polifill/Polyfill';

//Vue
import Vue from 'vue'; //inits Vue

import HomeVue from './vue/Home.vue'; //html for the Search functionality

import Collapse from './../js/ds/Collapse';
import CollapseB from './../js/ds/CollapseB';
import Accordion from './../js/ds/Accordion';
import Tab from './../js/ds/Tab';
import Modal from './../js/ds/Modal';
import Slider from './../js/ds/Slider';
import Blazy from 'blazy';
// import Navbar from './utilities/navbar';

class Home {
    constructor(){
        this.init();
    }

    init(){
        new Collapse();
        new CollapseB();
        new Accordion();
        new Tab();
        new Modal();
        new Blazy({ 
            selector: '.b--lazy-a',
            successClass: 'b--lazy-a--fade-in',
        });

        /**
         * Initializes all sliders with b--slider-a__content class
            * returns an array of sliders
            * each slider availabe by its id
            * For example if the slider id , id="test", 
            * this.sliders.test has all these functionalities available
            * this.slider.test.version()
            * this.slider.test.getInfo()
            * this.slider.test.goTo()
            * this.slider.test.play()
            * this.slider.test.paue()
            * this.slider.test.refresh()
            * this.slider.test.destroy()
            * this.slider.test.rebuild()
        */
        this.sliders = new Slider({
            sliderClass : '.b--slider-a__content',
            itemsMobile : 1,
            slideByMobile : 1,
            lazyload : true,
            controls : true,
            controlsContainer : '.b--slider-a__controls',
            nav : true,
            itemsTabletp : 1,
            slideByTabletp : 1,
            itemsTabletl : 1,
            slideByTabletl : 1,
            itemsDesktop : 1,
            slideByDesktop : 1,
            gutter : 0,
            autoplay : true,
            progresItem :'.js--progress-item'
        }); 

        new Vue({
            el: '#home',
            render: h => h(HomeVue),
        });
    }   

}
export default Home;
new Home();