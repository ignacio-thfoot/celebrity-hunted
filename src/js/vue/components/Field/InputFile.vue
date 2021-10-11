<template>
    <div class="b--form-group-a">
        <label class="b--form-label-b" :for="'file-' + field_id" v-if="text">{{text}}</label>
        <div class="b--form-upload-b" :class="{'b--form-upload-b--error' : error}">
            <input type="file" :id="'file-' + field_id" class="b--form-upload-b__item"   v-on:change="sendInputValue" ref="myFiles" accept=".pdf,.doc,.docx"/>
        </div>
        <div class="b--spinner-a b--form-group-a__loader" v-if="spinner">
            <span class="b--spinner-a__artwork"></span>
        </div>
        <span v-if="error" class="b--form-error-a">{{message}}</span>
    </div>
</template>
<script>
export default {
    props : [
        'text',
        'field_id',
        'error',
        'message',
        'inputType',
        'spinner'
    ],
    methods: {
        /**
         * Emits inputs model and type
         */
        sendInputValue (event) {
            this.$emit('inputValue', {"value" : this.$refs.myFiles.files, "type" : this.type})
        },
        /**
         * Sets models value
         */
        load () {
            this.type = this.inputType;
        },
        clean (){
            this.$refs.myFiles.value = '';
        }
    },
    created () {
      this.load();
    }
}
</script>