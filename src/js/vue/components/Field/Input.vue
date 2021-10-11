<template>
    <div class="b--form-group-a" >
        <label class="b--form-label-b" :for="'text-' + field_id" v-if="text">{{text}}</label>
        <div class="b--form-input-b" :class="{'b--form-input-b--error' : error}">
            <input type="text" :id="'text-' + field_id" class="b--form-input-b__item" v-model="inputModel"  v-on:keyup="sendInputValue">
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
            inputModel : '',
            type : ''
        }
    },
    props : [
        'text',
        'field_id',
        'error',
        'message',
        'inputType',
        'inputModelEmit',
        'spinner',
    ],
    methods: {
        /**
         * Emits inputs model and type
         */
        sendInputValue (event) {
            this.$emit('inputValue', {"value" : this.inputModel, "type" : this.type})
        },
        /**
         * Sets models value
         */
        load () {
            this.inputModel = this.inputModelEmit;
            this.type = this.inputType;
        },
        clean (){
            this.inputModel = '';
        }
    },
    created () {
      this.load();
    }
}
</script>