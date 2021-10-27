import {tns} from './../../../node_modules/tiny-slider/src/tiny-slider';

/**
 * Slider using tiny slider
 * @param {string} sliderClass to initialize the slider
 * @param {boolean} lazyload with lazyload (true or false)
 * @param {boolean} controls prev/next buttons
 * @param {string} controlsContainer The container around the prev/next buttons.
 * @param {boolean} nav nav components (dots)
 * @param {string} gutter Space between slides (in "px")
 * @param {boolean} autoplay Toggles the automatic change of slides.
 * @param {integer} itemsMobile how many items on the view on mobile
 * @param {integer} slideByMobile how many items slide by on mobile
 * @param {integer} itemsTabletp how many items slide by on tabletp (more than 600px less than 993px)
 * @param {integer} slideByTabletp how many items slide by on slideByTabletp (more 600px less than 993px)
 * @param {integer} itemsTabletl how many items slide by on tabletp (more than 993px less than 1201px)
 * @param {integer} slideByTabletl how many items slide by on slideByTabletp (more than 993px less than 1201px)
 * @param {integer} itemsDesktop how many items slide by on tabletp (more than 1201px)
 * @param {integer} slideByDesktop how many items slide by on slideByTabletp (more than 1201px)
 * @param {string} progresItem Class to show the items 1/5
 */
class Slider{
    constructor({
        sliderClass,
        lazyload,
        controls,
        controlsContainer,
        nav,
        gutter,
        autoplay,
        itemsMobile,
        slideByMobile,
        itemsTabletp,
        slideByTabletp,
        itemsTabletl,
        slideByTabletl,
        itemsDesktop,
        slideByDesktop,
        progresItem} = {}){
        this.sliderClass = sliderClass;
        this.lazyload = lazyload;
        this.controls = controls;
        this.controlsContainer = controlsContainer;
        this.nav = nav;
        this.gutter = gutter;
        this.autoplay = autoplay;
        this.itemsMobile = itemsMobile;
        this.slideByMobile = slideByMobile;
        this.itemsTabletp = itemsTabletp;
        this.slideByTabletp = slideByTabletp;
        this.itemsTabletl = itemsTabletl;
        this.slideByTabletl = slideByTabletl;
        this.itemsDesktop = itemsDesktop;
        this.slideByDesktop = slideByDesktop;
        this.progresItem = progresItem;
        return this.init();
    }

    init(){
        return this.slider();
    }

    /**
     * 
     * @returns an array of sliders with the same class (this.sliderClass)
     */
    slider( ) {
        var sliders = document.querySelectorAll(this.sliderClass);
        var gutter = this.gutter ? this.gutter : false;
        this.sliderList = [];
        // loops all sliders of the page with the same class
        for (let index = 0; index < sliders.length; index++) {
            const element = sliders[index];
            // get the Id of the slider where the slider clas is defined
            var elementName = (element.getAttribute('id')) ? element.getAttribute('id') : this.sliderClass + "-" + index;
            var slider = tns({
                container: sliders[index],
                items: this.itemsMobile,
                slideBy: this.slideByMobile,
                autoplay: this.autoplay,
                autoplayButtonOutput: false,
                controls: this.controls,
                controlsContainer: this.controlsContainer,
                nav: this.nav,
                navPosition: "bottom",
                swipeAngle: false,
                mouseDrag: false,
                swipeAngle: false,
                speed: 400,
                mouseDrag: false,
                lazyload : this.lazyload,
                slideItems: true,
                gutter: gutter,
                progresItem: this.progresItem,
                responsive: {
                    601: {
                        items: this.itemsTabletp,
                        slideBy: this.slideByTabletp
                    },
                    993: {
                        items: this.itemsTabletl,
                        slideBy: this.slideByTabletl
                    },
                    1201: {
                        items: this.itemsDesktop,
                        slideBy: this.slideByDesktop
                    }
                  }
            });
            // creates an array with all sliders with ID
            this.sliderList[elementName] = slider;
        }
        return  this.sliderList;
    }

    

}
export default Slider;