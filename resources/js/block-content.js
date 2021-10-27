import { tns } from './../../node_modules/tiny-slider/src/tiny-slider';
import './../scss/framework/components/slider/tiny-slider.scss';

const tnsCarousel = document.querySelectorAll('.block-slider');
tnsCarousel.forEach(slider => {
    const tnsSlider = tns({
        container: slider,
        items: 1,
        slideBy: 1,
        autoplay: true
    });
});
