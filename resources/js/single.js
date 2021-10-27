import './../scss/single.scss';

import Person from './Modules/Person.js';
new Person();

console.log('SINGLE');
console.log('WEBPACK');

// DYNAMIC IMPORT
let ShowConsoleLog;
Array.prototype.forEach.call(document.querySelectorAll('.js--click-DYN'), function (el) {
    el.addEventListener("click", (e) => {
        e.preventDefault();
        if (typeof ShowConsoleLog == "undefined") {
            import(/* webpackChunkName: "ShowConsoleLogDYN" */ './Modules/Click/ShowConsoleLog').then(x => {
                // console.log(x);
                setTimeout(() => new x.default(), 20)
            }).catch(() => console.log("There was a problem."))
        } else {
            ShowConsoleLog;
        }
    })
});

import Vue from 'vue';
import Home from './Modules/Pages/Home.vue';
new Vue({
    el: '#home',
    render: h => h(Home),
}); 

console.log('pepe2');

if (module.hot) module.hot.accept()
