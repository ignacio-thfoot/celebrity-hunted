<template>
    <button class="b--btn-a" :class="{'' : color == 'primary','b--btn-a--second' : color == 'secondary'}" v-on:click="sendClickEvent">{{text}}
        <div class="b--btn-a__loader" v-if="spinner">
            <div class="b--spinner-a">
                <span class="b--spinner-a__artwork"></span>
            </div>
        </div>
    </button>    
</template>
<script>
export default {
    props : [
        'text',
        'iteraction',
        'color',
        'spinner'
    ],
    methods: {
        /**
         * Emits inputs model and type
         */
        sendClickEvent (event) {
            if(this.iteraction){
                this.$emit('loadMorePosts');
            }
        },
    }
}
</script>