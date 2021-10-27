<template>
    <div class="b--form-group-a" >
        <label class="b--form-label-b" :for="'textarea-' + field_id" v-if="text">{{text}}</label>
        <div class="b--form-textarea-b" :class="{'b--form-textarea-b--error' : error}">
            <textarea name="" class="b--form-textarea-b__item" :id="'textarea-' + field_id" v-model="textareaModel"  v-on:keyup="sendTextareaValue"></textarea>
        </div>
        <span v-if="error" class="b--form-error-a">{{message}}</span>
    </div>
</template>
<script>
export default {
    props : [
        'error',
        'message',
        'text',
        'field_id',
        'inputType',
        'inputModelEmit'
    ],
    data:()=>{
        return{
            textareaModel : '',
        }
    },
    methods: {
        /**
         * Emits inputs model and type
         */
        sendTextareaValue (event) {
            this.$emit('inputValue', {"value" : this.textareaModel,"type" : this.type})
        },
        /**
         * Sets models value
         */
        load () {
            this.textareaModel = this.inputModelEmit;
            this.type = this.inputType;
        },
        clean () {
            this.textareaModel = '';
        }
    },
    created () {
      this.load();
    }
}
</script>