<template>
    <div class="b--form-group-a" >
        <label class="b--form-label-b" :for="'input-icon-' + field_id" v-if="text">{{text}}</label>
        <div class="b--form-input-icon-b" :class="{'b--form-input-icon-b--error' : error}">
            <input type="text" class="b--form-input-icon-b__item" :id="'input-icon-' + field_id" v-model="searchModel" v-on:keyup="sendInputIconValue" :placeholder="placeholder"  aria-label="Search Ideas">
            <svg class="b--form-input-icon-b__artwork" viewBox="0 0 24.6 23.2">
                <path d="M9.6,1.4c-4.6,0-8.3,3.7-8.3,8.3c0,4.6,3.7,8.3,8.3,8.3s8.3-3.7,8.3-8.3C17.9,5.1,14.2,1.4,9.6,1.4z M9.6,0
                c5.3,0,9.6,4.3,9.6,9.6c0,2.1-0.6,4-1.7,5.5l6.8,6.8c0.3,0.3,0.3,0.7,0,1c-0.2,0.2-0.6,0.3-0.9,0.1L23.4,23l-6.7-6.7
                c-1.8,1.9-4.3,3-7,3C4.3,19.3,0,15,0,9.6S4.3,0,9.6,0z"/>
            </svg>
        </div>
        <div class="b--spinner-a b--form-group-a__loader" v-if="spinner">
            <span class="b--spinner-a__artwork"></span>
        </div>
        <span v-if="error" class="b--form-error-a">{{message}}</span>
    </div>
</template>
<script>
export default {
    data:()=>{
        return{
            searchModel : '',
        }
    },
    props : [
        'error',
        'message',
        'text',
        'field_id',
        'inputModelEmit',
        'spinner',
        'placeholder'
    ],
    methods: {
        /**
         * Emits inputs model and type
         */
        sendInputIconValue (event) {
            this.$emit('loadOnSearch', {"value" : this.searchModel})
        },
        /**
         * Sets models value
         */
        load () {
            this.searchModel = this.inputModelEmit;
        }
    },
    created () {
      this.load();
    }
}
</script>