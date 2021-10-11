<template>
    <div class="b--cta-a b--cta-a--second" v-scroll-reveal.reset="{delay:200}">
        <div v-html="span"></div>
        <div id="mydiv"></div>
    </div>
</template>
<script>
import postscribe from 'postscribe';
export default {
    props: [
        'span',
        'script'
    ] ,
    methods: {
        /**
         * Sets models value
         */
        loadPostscribe () {
            if(this.script){
                postscribe('#mydiv',  this.script);
            }
        }
    },
    mounted () {
      this.loadPostscribe();
    }
}
</script>